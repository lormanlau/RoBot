const Discord = require("discord.js");

module.exports = {
	name: 'tempmute',
	type: 'moderation',
	usage: 'tempmute <user> <time>',
	permission: 2,
	help: 'Mutes a specified user for a certain amount of time.',
	main: function(bot, msg) {
		var mutee = msg.mentions.users.array();
		
		for(var k = 0; k < mutee.length; k++) {
            var str = msg.content.split(" ").splice(mutee.length).join(" ");
            var ts = str.split(" ")[0]
            var reason = str.split(" ").splice(1).join(" ");
			var user = bot.users.get(mutee[k].id);
			var member = msg.guild.members.get(mutee[k].id);
            
            if(member.hasPermission("ADMINISTRATOR"))
                return msg.channel.send("I can't mute " + member + "!")
			
			msg.guild.channels.forEach(channel => {
                if(channel.type == 'text')
					channel.overwritePermissions(member, {SEND_MESSAGES: false})
            })
            
			msg.reply(member + ' has been muted.')
			
			/*var mute = new Discord.RichEmbed()
				.setColor(0xFF0000)
				.setAuthor(user.username, user.avatarURL)
				.addField('Member Muted', `**${user.username}#${user.discriminator} (${user.id}) was muted.**`)
                .addField('Responsible Moderator', msg.member.displayName)
                .addField('Duration', ts)
				.addField('Reason', reason || "Not Specified")
				.setFooter(`${msg.guild.name}`, `${msg.guild.iconURL}`)
				.setTimestamp()
			try {
				var log = msg.guild.channels.find('name', 'mod-logs') || msg.guild.channels.find('name', 'modlogs');
				log.send({embed: mute});
			} catch (e) {
				msg.channel.send({embed: mute});
			}*/
		}
	}
};