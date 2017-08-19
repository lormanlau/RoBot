var unirest = require('unirest');

module.exports = {
	name: 'yomomma',
	type: 'fun',
	usage: 'yomomma',
	permission: 1,
	help: 'Gets a yomomma joke.',
	main: function(bot, msg) {
		unirest.get('http://api.yomomma.info/')
		.end(function (result) {
			var yomomma = JSON.parse(result.body)
			msg.channel.send(yomomma.joke)
		})
	}
};