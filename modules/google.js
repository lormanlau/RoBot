var GoogleSearch = require('google-search');
var config = require('../config.json');
const Discord = require("discord.js");
var google = new GoogleSearch({
	key: config.key,
	cx: config.cx
});

module.exports = {
	name: 'google',
	type: 'utility',
	usage: 'google <query>',
	permission: 1,
	help: 'Queries Google for information.',
	main: function (bot, message) {
		bot.checkForUpvote(msg).then(res => {
			if (res) {
				google.build({
					q: message.content,
					num: 1, // Number of search results to return between 1 and 10, inclusive
				}, function (err, response) {
					console.log(err);
					console.log(response);
					if (err) {
						console.error(err);
						message.channel.send("ERROR: Search failed");
						return;
					}
					if (response.totalResults === 0 || response.items == undefined) {
						message.channel.send("No results.");
						return;
					}
					else if (response.items != undefined) {
						console.log(response);
						var results = new Discord.RichEmbed();
						var link = response.items[0].link;
						var title = response.items[0].title;
						var desc = response.items[0].snippet;
						results.setAuthor('Google', 'https://cdn.discordapp.com/avatars/187406062989606912/c723649997673dcc758186ce92d475a0.jpg?size=1024', 'https://www.google.com/')
							.setTitle(title)
							.setURL(link)
							.setDescription(desc + ' [more](' + link + ')')
							.setTimestamp()
							.setFooter('Powered by RoBot', bot.user.avatarURL)
						message.channel.send({ embed: results });
					}
				});
			} else {
				bot.promptForUpvote(msg, this.name);
			}
		})
	}
};