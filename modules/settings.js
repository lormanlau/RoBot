//Work on finishing welcomemessage, farewell, joinrole, botrole, antiinvite, antimentionspam

module.exports = {
	name: 'settings',
	type: 'core',
	usage: 'settings <arguments>',
	permission: 4,
	help: 'Changes server settings.',
	main: function (bot, msg) {
		if (!msg.member.hasPermission('MANAGE_GUILD')) return msg.reply("you do not have permission to manage this server's setings!")

		if (msg.args[0] == "announcementchannel") {
			bot.getAnnouncementChannel(msg.guild.id).then(value => {
				processAnnouncementChannel(value);
			})
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
			bot.getJoinRole(msg.guild.id).then(value => {
				setJoinRole(value);
			})
		} else if (msg.args[0] == "botrole") {

		} else if (msg.args[0] == "invitelinks") {

		} else if (msg.args[0] == "mentionspam") {

		} else
			msg.reply("please specify an argument! Accepted arguments: announcementchannel, welcomemessage, leavemessage, banmessage, joinrole, botrole, invitelinks, mentionspam")

		function processBanMessage(value) {
			msg.channel.send(`The ban message for this server is **${value ? 'on' : 'off'}**. Do you want to turn it **${value ? 'off' : 'on'}**? (Reply with 'yes' or 'no')`);
			var collector = msg.channel.createCollector(
				m => (m.content.toLowerCase() == 'yes' || m.content.toLowerCase() == 'no'),
				{ time: 30000 }
			);
			collector.on('collect', m => {
				var e = value;
				if (m.content.toLowerCase() == 'yes' && m.author.id == msg.author.id) {
					if (value)
						value = 0
					else
						value = 1
					e = bot.setBanMessageEnabled(msg.guild, value)
					msg.channel.send(`Ban messages ${e ? 'enabled' : 'disabled'}.`);
					collector.stop();
				} else if (m.content.toLowerCase() == 'no' && m.author.id == msg.author.id) {
					msg.channel.send(`Ban messages are staying **${value ? 'on' : 'off'}**.`)
					collector.stop();
				}
				if (e) {
					msg.channel.send("What would you like the ban message to be? You may include the following arguments in your welcome message: ``{servername}``, ``{username}``, ``{usermention}``, ``{userdiscrim}``, ``{membercount}``")
					var collector2 = msg.channel.createCollector(
						m => msg.author.id == m.author.id,
						{ time: 60000 }
					);
					collector2.on('message', m => {
						m.channel.send(`Ban message set to \`${bot.setBanMessageText(m.guild.id, m.content)}\`!`)
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
					msg.channel.send("No messages were detected within 30 seconds. Aborting...")
				console.log(`Collected ${collected.size} items`)
			});
		}

		function processLeaveMessage(value) {
			msg.channel.send(`The leave message for this server is **${value ? 'on' : 'off'}**. Do you want to turn it **${value ? 'off' : 'on'}**? (Reply with 'yes' or 'no')`);
			var collector = msg.channel.createCollector(
				m => (m.content.toLowerCase() == 'yes' || m.content.toLowerCase() == 'no'),
				{ time: 30000 }
			);
			collector.on('collect', m => {
				var e = value;
				if (m.content.toLowerCase() == 'yes' && m.author.id == msg.author.id) {
					if (value)
						value = 0
					else
						value = 1
					e = bot.setLeaveMessageEnabled(msg.guild, value)
					msg.channel.send(`Leave messages ${e ? 'enabled' : 'disabled'}.`);
					collector.stop();
				} else if (m.content.toLowerCase() == 'no' && m.author.id == msg.author.id) {
					msg.channel.send(`Leave messages are staying **${value ? 'on' : 'off'}**.`)
					collector.stop();
				}
				if (e) {
					msg.channel.send("What would you like the leave message to be? You may include the following arguments in your welcome message: ``{servername}``, ``{username}``, ``{usermention}``, ``{userdiscrim}``, ``{membercount}``")
					var collector2 = msg.channel.createCollector(
						m => msg.author.id == m.author.id,
						{ time: 60000 }
					);
					collector2.on('message', m => {
						m.channel.send(`Leave message set to \`${bot.setLeaveMessageText(m.guild.id, m.content)}\`!`)
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
					msg.channel.send("No messages were detected within 30 seconds. Aborting...")
				console.log(`Collected ${collected.size} items`)
			});
		}

		function processWelcomeMessage(value) {
			msg.channel.send(`The welcome message for this server is **${value ? 'on' : 'off'}**. Do you want to turn it **${value ? 'off' : 'on'}**? (Reply with 'yes' or 'no')`);
			var collector = msg.channel.createCollector(
				m => (m.content.toLowerCase() == 'yes' || m.content.toLowerCase() == 'no'),
				{ time: 30000 }
			);
			collector.on('collect', m => {
				var e = value;
				if (m.content.toLowerCase() == 'yes' && m.author.id == msg.author.id) {
					if (value)
						value = 0
					else
						value = 1
					e = bot.setWelcomeMessageEnabled(msg.guild, value)
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
					msg.channel.send("No messages were detected within 30 seconds. Aborting...")
				console.log(`Collected ${collected.size} items`)
			});
		}

		function processAnnouncementChannel(value) {
			msg.channel.send(`The current announcement channel for this server is <#${value}>. Do you want to change it? (Reply with 'yes' or 'no')`);
			var collector = msg.channel.createCollector(
				m => (m.content.toLowerCase() == 'yes' || m.content.toLowerCase() == 'no'),
				{ time: 30000 }
			);
			collector.on('collect', m => {
				var e = false;
				if (m.content.toLowerCase() == 'yes' && m.author.id == msg.author.id) {
					e = true
					collector.stop();
				} else if (m.content.toLowerCase() == 'no' && m.author.id == msg.author.id) {
					msg.channel.send(`The announcement channel will remain as <#${value}>.`)
					collector.stop();
				}
				if (e) {
					msg.channel.send("What would you like the announcement channel to be? (Mention a channel)")
					var collector2 = msg.channel.createCollector(
						m => msg.author.id == m.author.id,
						{ time: 60000 }
					);
					collector2.on('message', m => {
						if (m.mentions.channels.array()[0]) {
							m.channel.send(`Announcement channel set to ${bot.setAnnouncementChannel(m.guild.id, m.mentions.channels.array()[0])}!`)
							collector2.stop();
						}
						else
							m.channel.send(`Please mention a channel!`)
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
					msg.channel.send("No messages were detected within 30 seconds. Aborting...")
				console.log(`Collected ${collected.size} items`)
			});
		}

		function setJoinRole(value) {
			msg.channel.send(`The current join role for this server is **${value}**. Do you want to change it? (Reply with 'yes' or 'no')`);
			var collector = msg.channel.createCollector(
				m => (m.content.toLowerCase() == 'yes' || m.content.toLowerCase() == 'no'),
				{ time: 30000 }
			);
			collector.on('collect', m => {
				var e = false;
				if (m.content.toLowerCase() == 'yes' && m.author.id == msg.author.id) {
					e = true
					collector.stop();
				} else if (m.content.toLowerCase() == 'no' && m.author.id == msg.author.id) {
					msg.channel.send(`The join role will remain as **${value}**.`)
					collector.stop();
				}
				if (e) {
					msg.channel.send("What would you like the join role to be? (Say the name of a role, 'NONE' for none)")
					var collector2 = msg.channel.createCollector(
						m => msg.author.id == m.author.id,
						{ time: 60000 }
					);
					collector2.on('message', m => {
						if (m.mentions.channels.array()[0]) {
							m.channel.send(`Announcement channel set to ${bot.setAnnouncementChannel(m.guild.id, m.mentions.channels.array()[0])}!`)
							collector2.stop();
						}
						else
							m.channel.send(`Please mention a channel!`)
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
					msg.channel.send("No messages were detected within 30 seconds. Aborting...")
				console.log(`Collected ${collected.size} items`)
			});
		}
	}
};