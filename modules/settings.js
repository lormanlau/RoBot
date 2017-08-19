//Work on finishing welcomemessage, farewell, joinrole, botrole, antiinvite, antimentionspam

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../servers.sqlite');

module.exports = {
	name: 'settings',
	type: 'core',
	usage: 'settings <arguments>',
	permission: 4,
	help: 'Changes server settings.',
	main: function (bot, msg) {
		if (!msg.member.hasPermission('MANAGE_GUILD')) return msg.reply("you do not have permission to manage this server's setings!")

		if (msg.args[0] == "announcementchannel") {
			
		} else if (msg.args[0] == "welcomemessage") {
			bot.getWelcomeMessageStatus(msg.guild.id).then(value => {
				processWelcomeMessage(value);
			})
		} else if (msg.args[0] == "leavemessage") {
			bot.getLeaveMessageStatus(msg.guild.id).then(value => {
				processLeaveMessage(value);
			})
		} else if (msg.args[0] == "banmessage") {
			bot.getBanMessageStatus(msg.guild.id).then(value => {
				processBanMessage(value);
			})
		} else if (msg.args[0] == "joinrole") {
			
		} else if (msg.args[0] == "botrole") {

		} else if (msg.args[0] == "invitelinks") {

		} else if (msg.args[0] == "mentionspam") {

		} else
			msg.reply("please specify an argument! Accepted arguments: announcementchannel, welcomemessage, leavemessage, banmessage, joinrole, botrole, invitelinks, mentionspam")

		function processWelcomeMessage(value) {
			msg.channel.send(`The welcome message for this server is **${value ? 'on' : 'off'}**. Do you want to turn it **${value ? 'off' : 'on'}**? (Reply with 'yes' or 'no')`);
			var collector = msg.channel.createCollector(
				m => (m.content.toLowerCase() == 'yes' || m.content.toLowerCase() == 'no'),
				{ time: 15000 }
			);
			collector.on('collect', m => {
				var e = value;
				if (m.content.toLowerCase() == 'yes' && m.author.id == msg.author.id) {
					if (value)
						value = 0
					else
						value = 1
					e = bot.setwelcomeMessageEnabled(msg.guild, value)
					msg.channel.send(`Welcome messages ${e ? 'enabled' : 'disabled'}.`);
					collector.stop();
				} else if (m.content.toLowerCase() == 'no' && m.author.id == msg.author.id) {
					msg.channel.send(`Welcome messages are staying **${value ? 'on' : 'off'}**.`)
					collector.stop();
				}
				if (e) {
					msg.channel.send("What would you like the welcome message to be? You may include the following arguments in your welcome message: ``{servername}``, ``{username}``, ``{usermention}``, ``{userdiscrim}``, ``{membercount}``")
					var collector2 = msg.channel.createCollector(
						m => msg.author.id == m.author.id,
						{ time: 60000 }
					);
					collector2.on('message', m => {
						m.channel.send(`Welcome message set to \`${bot.setWelcomeMessageText(m.guild.id, m.content)}\`!`)
						collector2.stop();
					});
					collector2.on('end', collected => {
						if (collected.size == 0)
							msg.channel.send("No messages were detected within 60 seconds. Aborting...")
						console.log(`Collected ${collected.size} items`)
					});
				}
			});
			collector.on('end', collected => {
				if (collected.size == 0)
					msg.channel.send("No messages were detected within 15 seconds. Aborting...")
				console.log(`Collected ${collected.size} items`)
			});
		}
	}
};