module.exports = {
	name: 'emoji',
	type: 'fun',
	usage: 'emoji',
	permission: 1,
	help: 'Returns a random emoji.',
	main: function(bot, msg) {
		var emoji = require('emoji-random');
		msg.channel.send(emoji.random());
	}
};