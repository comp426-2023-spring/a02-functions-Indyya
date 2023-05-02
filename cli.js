#!/usr/bin/env node
//import package
import minimist from "minimist"
import fetch from "node-fetch"
import moment from "moment-timezone"

//parse command-line agruments
const args = minimist(process.argv.slice(2))
//get timezone
const timezone = moment.tz.guess()


if (args.h) {
	console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
	 -h            Show this help message and exit.
	 -n, -s        Latitude: N positive; S negative.
	 -e, -w        Longitude: E positive; W negative.
	 -z            Time zone: uses tz.guess() from moment-timezone by default.
	 -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
	 -j            Echo pretty JSON from open-meteo API and exit.`);
	  process.exit(0)
}

//format latitude and longitude args
let latitude = 0
let longitude = 0

if (args.h) {
	console.log(help_text)
	process.exit(0)
}
if (args.n){
	latitude = args.n
}

else if (args.s){
	latitude = -args.s
}

else{
	console.log("Latitude must be in range");
}

if (args.e){
	longitude = args.e
}

else if (args.w){
	longitude = -args.w
}

else{
	console.log("Longitude must be in range");
}

//make a fetch API route and format data
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&timezone=' + timezone);
const data = await response.json()

//add info for a specific day
const days = args.d
if args.j {
	console.log(data)
	process.exit(0)
}

//parse through json
if (days == 0) {
	console.log('today.')
}else if (days > 1) {
	console.log('in ' + days + ' days.')
}else {
	console.log('tomorrow')
}
 

