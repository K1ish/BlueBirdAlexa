"use strict";

/*
███╗   ███╗ █████╗ ██████╗ ███████╗    ██████╗ ██╗   ██╗    ██╗  ██╗ ██╗██╗███████╗██╗  ██╗
████╗ ████║██╔══██╗██╔══██╗██╔════╝    ██╔══██╗╚██╗ ██╔╝    ██║ ██╔╝███║██║██╔════╝██║  ██║
██╔████╔██║███████║██║  ██║█████╗      ██████╔╝ ╚████╔╝     █████╔╝ ╚██║██║███████╗███████║
██║╚██╔╝██║██╔══██║██║  ██║██╔══╝      ██╔══██╗  ╚██╔╝      ██╔═██╗  ██║██║╚════██║██╔══██║
██║ ╚═╝ ██║██║  ██║██████╔╝███████╗    ██████╔╝   ██║       ██║  ██╗ ██║██║███████║██║  ██║
╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝    ╚═════╝    ╚═╝       ╚═╝  ╚═╝ ╚═╝╚═╝╚══════╝╚═╝  ╚═╝
github.com/k1ish
(C)2016 Keegan Harris
*/

// Depedencies: get them through npm install (name)
const alexa = require("alexa-app"),
 	  Twit = require("twit"),
 	  moment = require("moment");

// Allow this module to be reloaded automatically when code is changed
module.change_code = 1;

// Define an alexa-app
const app = new alexa.app("bluebird");

// If these api keys stop working, get your own at http://app.twitter.com/
const T = new Twit({
	consumer_key: "4408N95GWSnxMqG9FDoxAk0lI",
	consumer_secret: "rVpdHwJkLJVFPxNu1gUMUAD9fC7WOeQqzcfo127iV6xz4ebsEi",
	access_token: "767120325330874368-DFk7AvieRj7MNRsMzaVZvLlH48yj2Og",
	access_token_secret: "hT7CvXYsrrpIQy5KhbSm1l576CNVm2oLMHu6ktu9HB2PB"
});

// Prettify Twitter's follower numbers
function nFormatter(num, digits) {
	let si = [
		{ value: 1E6,  symbol: " million" },
		{ value: 1E3,  symbol: " thousand" }
	], rx = /\.0+$|(\.[0-9]*[1-9])0+$/, i;

	for(i = 0; i < si.length; i++) {
		if(num >= si[i].value) {
		  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
		}
	}

	return num.toFixed(digits).replace(rx, "$1");
}

// Strip dem links down
function stripLink(input) {
    return input.replace(/(https?:\/\/[^\s]+)/g, "");
}

// Sometimes Alexa gives us the question here, or includes non-alphanumeric characters.
// Those, and all whitespace, gets taken out.
function sanatizeAccountName(input) {
	for(let item of [
		"followers",
		"does",
		"have",
		"has",
		"from"
	])
		input = input.replace(item, "");

	return input.trim().replace(/\W/g, "");
}

// Called when user says "open bluebird"
app.launch(function(req, res) {
	res.say("You should ask bluebird a question");
	res.shouldEndSession(false, "Anything else?");
});

// "ask bluebird for the last tweet from william t d r"
app.intent("GetLastTweet", {
		"slots": {"AccountName": "LITERAL"},
		"utterances": [
			"for the last tweet from {account name|AccountName}",
			"what is the last tweet from {account name|AccountName}",
			"read me the last tweet from {account name|AccountName}",
			"tell me the last tweet from {account name|AccountName}"
		]
	}, (req, res) => {
		let accountName = sanatizeAccountName(req.slot("AccountName"));

		console.log("[BlueBird] Request for last tweet from " + accountName + ".");

		// Call the twitter API to get the last tweet
		T.get("statuses/user_timeline", {
			screen_name: accountName,
			count: 1,
			exclude_replies: true,
			include_rts: false
		}, (err, data, response) => {
			try {
				let text = stripLink(data[0].text);

				res.say(data[0].user.name + " tweeted " + moment(new Date(data[0].created_at)).fromNow() + ": " + text).send();
			} catch(e) {
				console.log(req.data.request);
				res.say("There was an error when getting the contents of the tweet.").send();
			}
		});

		return false;
	}
);

// "ask bluebird how many followers does Donald Trump have"
app.intent("GetFollowers", {
		"slots": {"AccountName": "LITERAL"},
		"utterances": [
			"how many followers does {account name|AccountName} have",
			"how many followers {account name|AccountName} has",
			"how many followers does {account name|AccountName} have on twitter"
		]
	}, (req, res) => {
		let accountName = sanatizeAccountName(req.slot("AccountName"));

		console.log("[BlueBird] Request for follower count from " + accountName + ".");

		// Get basic information about an account from the twitter API.
		T.post("users/lookup", {
			screen_name: accountName
		}, (err, data, response) => {
			try {
				res.say(data[0].name + " has " + nFormatter(data[0].followers_count, 0) + " followers.").send();
			} catch(e) {
				res.say("There was an error when getting the user's follower count.").send();
			}
		});

		return false;
	}
);

// Last-resort error method (unknown intent, etc)
app.post = function(request, response, type, exception) {
	if(exception)
		response.say("Sorry, An error occurred.").send();
};

module.exports = app;
