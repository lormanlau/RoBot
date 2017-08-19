var googl = require('goo.gl');
var config = require('../config.json');
const Discord = require("discord.js");

module.exports = {
	name: 'expand',
	type: 'utility',
	usage: 'expand <URL>',
	permission: 1,
	help: 'Expands a goo.gl URL.',
	main: function(bot, msg) {
		googl.setKey(config.googl);
        
		googl.expand(msg.content)
		.then(function (longURL) {
			msg.channel.send('URL expanded to ' + longURL)
		})
		.catch(function (err) {
			msg.channel.send(err);
			console.error(err.message);
		});
	}
};