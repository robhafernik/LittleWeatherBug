/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for proper jshinting

/**
 * This code implements a "LittleWeatherBug", a small, enclosed display
 * that can be mounted on the wall to show the current temperature,
 * weather conditions, and forecast hi/lo, alternating with the current 
 * time and date.  It is written in Javascript, to run in node.js, and
 * this file set contains the Intel Edison XDK IoT Edition development 
 * environment support files.
 * 
 * This uses the Intel Edison Board: https://www.sparkfun.com/products/13276
 * It also uses a white on black serial LCD: https://www.sparkfun.com/products/9395
 * 
 * This code is based on an example from the SparkFun Inventor's Kit for the
 * Intel Edison board.  The original code is here:
 * https://github.com/sparkfun/Inventors_Kit_For_Edison_Experiments
 * 
 * SparkFun is a GREAT source for hobby electronics: http://sparkfun.com
 *
 * Rather than Yahoo Weather, this code uses weather data from 
 * OpenWeatherMap: http://openweathermap.org
 *
 * Written by Rob Hafernik, rob@hafernik.com	
 * 
 * Released into the public domain, do with it as you will.  It is not,
 * however, warranted to be correct in any way.
 */ 

// We'll need johnny-five, the Edison wrapper, http and the mraa serial driver
var five = require('johnny-five');
var Edison = require('edison-io');
var http = require('http');
var mraa = require('mraa');

// some globals
var validWeather = false; // true if we have valid weather back from the service to display
var temp = 0;             // current temperature string
var conditions = null     // weather conditions string
var hifc = 0;             // high from forecast
var lofc = 0;	          // low from forecast
var tstamp = new Date(0); // time we last got weather data
var maxAge = 1200000;     // max age of weather data, in ms (=20 minutes)
var weatherLoop = true;   // if true, show weather, else show time and date
var uart = null;          // uart object

var cityId = "4671654";   // ID of Austin, TX at openweathermap.org
var APIID = "xxxxxxxxxxxxxxxxxxxxxxx";   // API Key from openweathermap.org (go there and get your own)

// Create a new Johnny-Five board object that we will use to talk to the LCD
var board = new five.Board({
    io: new Edison()
});

// Called when Johnny-Five is done initializing:
board.on('ready', function() {

    // create new uart object, 9600, 8-0-1
    uart = new mraa.Uart(0);
    uart.setBaudRate(9600);
    uart.setMode(8, mraa.UART_PARITY_NONE, 1);
    uart.setFlowcontrol(false, false);

    // update display every four seconds
    setInterval( function() {
        mainLoop();
    }, 4000);
});

function mainLoop() {
    
    // If our old weather data is older than maxAge, call for new weather data
    var now = new Date();
    var span = now.getTime() - tstamp.getTime();
    if(span > maxAge) {
        console.log("Getting data...");
        loadConditionsFromURL();
        loadForecastFromURL();
        tstamp = new Date();
    }
    if(weatherLoop) {
        if(validWeather) {
        	// we have weather data, so show it
            var cstr = temp + "F " + conditions;
            var fstr = "Hi: " + hifc + "  Lo: " + lofc; 
            display(cstr, fstr);
        }
        else {
        	// show placeholder while we wait for weather data from API call
            display("Updating", "weather data...");
        }
    } else {
    	// display time and date
        var d = getDay(now.getDay()) + ", " + getMonth(now.getMonth()) + " " + now.getDate() + " " + now.getFullYear();
        var t = null;
        if(now.getMinutes() < 10) {
            t = now.getHours() + ":0" + now.getMinutes();
        } else {
            t = now.getHours() + ":" + now.getMinutes();
        }
        display(t, d);
    }
    // alternate between weather and time/date
    weatherLoop = !weatherLoop;
}

function loadConditionsFromURL() {
    var url = "http://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&units=imperial&APPID=" + APIID;
    
    // Make the request
    var request = http.get(url, function(response) {

        // Where we store the response text
        var body = '';

        //Read the data
        response.on('data', function(chunk) {
            body += chunk;
        });

        // Print out the data once we have received all of it
        response.on('end', function() {
            if (response.statusCode === 200) {
                try {
                    var w = JSON.parse(body);

                    temp = Math.round(w.main.temp);
                    conditions = w.weather[0].main;
                    
                } catch(e) {
                    console.log("Parse error: " + e);
                }
            } else {
                console.log("Response status code: " + response.statusCode);
            }
        })
    });
    
    // Report a problem with the connection
    request.on('error', function (err) {
        console.log("Connection error: " + err);
    });
}

function loadForecastFromURL(url) {
    var url = "http://api.openweathermap.org/data/2.5/forecast?id=" + cityId + "&units=imperial&APPID=" + APIID;
    
    // Make the request
    var request = http.get(url, function(response) {
        
        // Where we store the response text
        var body = '';

        //Read the data
        response.on('data', function(chunk) {
            console.log("Got Chunk");
            body += chunk;
        });

        // Print out the data once we have received all of it
        response.on('end', function() {
            if (response.statusCode === 200) {
                try {
                    var w = JSON.parse(body);

                    var h = -1000;
                    var l = 1000;
                    var len = w.list.length;
                    if (len > 8) {
                        len = 8;
                    }
                    // look through the forecast for the hi and lo for next 24 hours (eight times 3-hour interval)
                    for(var i = 0; i < len; ++i) {
                        var t = Math.round(w.list[i].main.temp);
                        if(t > h) { h = t; }
                        if(t < l) { l = t; }
                    }
                    hifc = h;
                    lofc = l;

                    validWeather = true;
                } catch (e) {
                    console.log("Parse Error: " + e );   
                }
            } else {
                console.log("Response status code " + response.statusCode);
            }
        })
    });
    
    // Report a problem with the connection
    request.on('error', function (err) {
        console.log("Connection error: " + err);
    });

}

// convert javascript month number to a string
function getMonth(m) {
    switch(m) {
        case 0: return ("Jan");
            break;
        case 1: return ("Feb");
            break;
        case 2: return ("Mar");
            break;
        case 3: return ("Apr");
            break;
        case 4: return ("May");
            break;
        case 5: return ("Jun");
            break;
        case 6: return ("Jul");
            break;
        case 7: return ("Aug");
            break;
        case 8: return ("Sep");
            break;
        case 9: return ("Oct");
            break;
        case 10: return ("Nov");
            break;
        case 11: return ("Dec");
            break;
    }
    return "???";
}

// convert javascript day number to a string
function getDay(d) {
    switch(d) {
        case 0: return ("Sun");
            break;
        case 1: return ("Mon");
            break;
        case 2: return ("Tue");
            break;
        case 3: return ("Wed");
            break;
        case 4: return ("Thu");
            break;
        case 5: return ("Fri");
            break;
        case 6: return ("Sat");
            break;
    }
    return "---";
}

function display(line1, line2) {
    
    /*
    this should clear the LCD, but I never got it to work   :)
    
    var cmd = 254;
    var pos1 = 128;
    var pos1Str = String.fromCharCode(cmd) + String.fromCharCode(pos1);
    uart.writeStr(pos1Str);
    */
    
	// make sure lines are exactly 16 chars long
    if(line1.length>16) {
        line1 = line1.substring(0,15);
    } 
    while(line1.length<16) {
        line1 = line1 + " ";
    }
    if(line2.length>16) {
        line2 = line2.substring(0,15);
    } 
    while(line2.length<16) {
        line2 = line2 + " ";
    }
    
    console.log("LCD: " + line1);
    console.log("LCD: " + line2);

    // write lines to LCD
    uart.writeStr(line1);
    uart.writeStr(line2);
}

