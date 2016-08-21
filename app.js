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
var AlexaAppServer = require('alexa-app-server');
AlexaAppServer.start({
    server_root:__dirname,
    app_dir:"apps",
    app_root:"/alexa/",
	// Amazons API communicates on port 80, so it is advised not to change this 
    port:80
});
var alexa = require('alexa-app');

// Allow changing config while running
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('bluebird');
app.launch(function(req,res) {
	res.say("To use bluebird ask Alexa to ask bluebird something about twitter");
});
module.exports = app;
