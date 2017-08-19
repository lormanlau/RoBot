var unirest = require('unirest');
var config = require('../config.json');

module.exports = {
	name: 'quote',
	type: 'fun',
	usage: 'quote',
	permission: 1,
	help: 'Gets a random quote.',
	main: function(bot, msg) {
		unirest.post("https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1")
			.header("X-Mashape-Key", config.mashape)
			.header("Content-Type", "application/x-www-form-urlencoded")
			.header("Accept", "application/json")
			.end(function (result) {
				console.log(result.body);
				msg.channel.send(result.body.quote + '\n*- ' + result.body.author + '*')
			});
	}
};