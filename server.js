// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
// app.get("/api/hello", function (req, res) {
//   res.json({greeting: 'hello API'});
// });

app.get('/api/timestamp', function(req,res){
	res.json({unix : Date.now(), utc : new Date()});
});

app.get('/api/timestamp/:date_string?', function(req,res){
	// var dateString = req.params.date_string;
	// let dateNum = parseInt(dateString);
	// var regex = /(-)/;
	// console.log(new Date(dateNum).toString());
    // if (new Date(dateNum).toString() === 'Invalid Date') {
	// 	//res.json({unix : Date.now(), utc : Date()});
	// 	res.json({unix: "null",utc : "Invalid Date"});
	//  }
	// else{
	// 	let checkDate = regex.test(dateString);
	// 	console.log(checkDate);
	// 	if (checkDate === true){
	// 		let dateInt = Date.parse(dateString);
	// 		res.json({unix : dateInt, utc : new Date(dateString).toUTCString()});
	// 	}
	// 	else{
	// 		let dateObj = new Date(dateString * 1000); 
	// 		let utcString = dateObj.toUTCString(); 
	// 		console.log(utcString);
	// 		let time = utcString.slice(-11, -4); 
	// 		console.log(time);
	// 		res.json({unix : dateString, utc : time});
	// 	}
	// }
	let dateString = req.params.date_string;
	if (/\d{5,}/.test(dateString)) {
		let dateInt = parseInt(dateString);
		console.log(new Date(dateInt).toUTCString());
		res.json({ unix: dateString, utc: new Date(dateInt).toUTCString() });
	}
	else {
		let dateObj = new Date(dateString);
		if (dateObj === "Invalid Date"){
			res.json({error : "Invalid Date"});
		}
		else{
			res.json({unix : dateObj.valueOf(), utc: dateObj.toUTCString()});
		}
	}
});

// listen for requests :)
app.set('port', 3000);
var listener = app.listen(app.get('port'), function () {
	console.log('Your app is listening on port ' + listener.address().port);
});