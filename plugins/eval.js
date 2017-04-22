module.exports = {
	name: 'eval',
    usage: '<p> eval <code>',
    permission: 3,
    help: 'Allows bot administrators to evaluate code to test the bot.',
	main: function(bot, msg) {
		var Discord = require('discord.js');
		const util = require('util');
		
		if (msg.author.id === "171319044715053057" || msg.member.hasPermission('ADMINISTRATOR')) {
			var code = msg.content;
			var embed = new Discord.RichEmbed();
			try {
				let evaled = eval(code);
				let type = typeof evaled;
				let insp = util.inspect(evaled, {
					depth: 0
				});

				if (evaled === null) evaled = 'null';

				embed.setColor(0x00FF00)
				.setTitle("RoBot Javascript Evaluation Complete")
				.setFooter(`${msg.author.username}`, `${bot.user.avatarURL}`)
				.setTimestamp()
				.addField('Code', "```js\n" + clean(code) + "```")
				.addField('Result', "```js\n" + clean(evaled.toString().replace(bot.token, 'REDACTED')) + "```");
				if (evaled instanceof Object) {
					embed.addField('Inspect', "```js\n" + insp.toString().replace(bot.token, 'REDACTED') + "```");
				} else {
					embed.addField('Type', "```js\n" + type + "```");
				}
				msg.delete();
				msg.channel.sendEmbed(embed)
			} catch (err) {
				embed.setColor(0xFF0000)
				.setTitle(":rotating_light: :rotating_light: ERROR ERROR ERROR :rotating_light: :rotating_light: in RoBot Javascript Evaluation")
				.setFooter(`${msg.author.username}`, `${bot.user.avatarURL}`)
				.setTimestamp()
				.addField('Code', "```js\n" + clean(code) + "```")
				.addField('Error', "```LDIF\n" + clean(err.message) + "```");
				msg.delete();
				msg.channel.sendEmbed(embed)
					.catch(error => console.log(error.stack));
			}
		}
		else {
			msg.channel.sendMessage(msg.author + ", you do not have permission to use eval!");
		}
		
		function clean(text) {
			if (typeof(text) === "string") {
				return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
			}
			else {
				return text;
			}
		}
	}
}