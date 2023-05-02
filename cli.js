#!/usr/bin/env node

import moment from "moment-timezone";
import minimist from "minimist";
import fetch from "node-fetch";

const args = minimist(process.argv);
if ("h" in args){
	console.log(Usage:galosh.js[options] -[n|s] LATITUDE -z TIME_ZONE
	-h	     Show this help message and exit.
	-n, -s	     Latitude: N positive; S negative.
	-e, -w	     Longitude: E positive; W negative.
	-z	     Time zone: use tz.guess() from moment-timezone by default to 1.
	-d 0-6	     Day to retrieve weather: 0 is today; defaults to 1.
	-j	     Echo pretty JSON from open-meteo APU and exit.)
	process.exit(0);
}
let latitude;
let longitude;

if (args.n){
	latitude = args.n;
}else if (args.s){
	latitude = -args.s;
}else{
	console.log("Latitude must be in range");
	process.exit(0);
}
if (args.e){
	longitude = args.e;
} else if (args.w){
	longitude = -args.w;
}else{
	console.log("Longitude must be in range")
	process.exit(0);
}
var url = "https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lg}&daily=precipitation_hours&current_weather=true&timezone=&timezone=${timezone}";
var response = await fetch(url);
const data = await response.json();
const timezone = moment.tz.guess();
const days = args.d

if(args.j){
	console.log(data);
	process.exit(0);
}

if (days == 0){
	console.log("today.")
} else if (day > 1){
	console.log("in" + days " days.")
} else{
	console.log("tomorrow.")
}

