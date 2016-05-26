
From the main.js file in this project:

/**
 * This project implements a "LittleWeatherBug", a small, enclosed display
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

============================
This code was based on the blank "Node.js" App distributed with the Intel Edison board, the notices below are from that project:

Blank Node.js IoT App
============================
The Blank Node.js sample application distributed within Intel® XDK IoT Edition under the Internet of Things  project creation option.

Intel(R) XDK IoT Edition
-------------------------------------------
This template is part of the Intel(R) XDK IoT Edition. 
Download the Intel(R) XDK IoT Edition at https://software.intel.com/en-us/html5/xdk-iot. To see the technical details of the sample, 
please visit the sample article page at https://software.intel.com/en-us/xdk/docs/intel-xdk-iot-edition-nodejs-templates.


Important App Files
---------------------------
* main.js
* package.json
* icon.png
* README.md

License Information Follows
---------------------------
Copyright (c) 2014, Intel Corporation. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, 
are permitted provided that the following conditions are met:

- Redistributions of source code must retain the above copyright notice, 
  this list of conditions and the following disclaimer.

- Redistributions in binary form must reproduce the above copyright notice, 
  this list of conditions and the following disclaimer in the documentation 
  and/or other materials provided with the distribution.

- Neither the name of Intel Corporation nor the names of its contributors 
  may be used to endorse or promote products derived from this software 
  without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, 
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE 
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE 
GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) 
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT 
LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT 
OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
