var xkcd = require('xkcd');

module.exports = {
	name: 'xkcd',
	type: 'fun',
	usage: 'xkcd <optional-num>',
	permission: 1,
	help: 'Returns an XKCD comic.',
	main: function (bot, msg) {
		bot.checkForUpvote(msg).then(res => {
			if (res) {
				var num = msg.content;
				if (!isNaN(num)) {
					xkcd(num, function (data) {
						try {
							msg.channel.send("**XKCD #" + data.num + "**: \"" + data.title + "\"\n" + data.img + "\n*" + data.alt + "*");
						} catch (err) {
							msg.channel.send(err);
						}
						console.log(data);
					});
				} else {
					xkcd(function (data) {
						try {
							msg.channel.send("**" + data.num + "**: " + data.title + "\n" + data.img + "\n*" + data.alt + "*");
						} catch (err) {
							msg.channel.send(err);
						}
						console.log(data);
					});
				}
			} else {
				bot.promptForUpvote(msg, this.name);
			}
		})
	}
};