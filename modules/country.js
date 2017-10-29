var unirest = require('unirest');
var Discord = require('discord.js');
var config = require('../config.json');

module.exports = {
	name: 'country',
	type: 'fun',
	usage: 'country <country-name>',
	permission: 1,
	help: 'Gets information about a country.',
	main: function (bot, msg) {
		bot.checkForUpvote(msg).then(res => {
			if (res) {
				if (msg.content == null) return "Please specify a country!";
				if (msg.content.trim().toLowerCase() == "north dumpling island") {
					msg.channel.send("All hail our glorious leader, Dean Kamen!\nhttp://3.bp.blogspot.com/-SUNDyBLeen0/UA1gikP_2AI/AAAAAAAAEDs/32CU65woD-A/s1600/Dean_Kamen_FIRST.png")
				} else {
					msg.content = msg.content.replace(" ", "%20")
					unirest.get("https://restcountries.eu/rest/v2/name/" + msg.content)
						.end(function (result) {
							var res = result.body;
							if (!res) return msg.channel.send("Country not found.");
							for (var i = 0; i < res.length; i++) {
								var country = new Discord.RichEmbed();
								var capital = res[i].capital || "N/A";
								country.setTitle(res[i].name)
									.setDescription('Country Information')
									.addField('Capital', capital, true)
									.addField('Region', res[i].region, true)
									.addField('Population', res[i].population, true)
									.addField('Area', res[i].area + " Square Kilometers", true)
									.addField('Native Name', res[i].nativeName, true)
									.addField('Alternate Names', res[i].altSpellings.join(", "), true)
									.addField('Demonym', res[i].demonym, true)
									.setFooter('Triggered by ' + msg.author.username, msg.author.avatarURL)
									.setTimestamp()
								msg.channel.send({ "embed": country });
							}
						});
				}
			} else {
				bot.promptForUpvote(msg, this.name);
			}
		})
	}
};