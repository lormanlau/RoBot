const Discord = require('discord.js');

module.exports = {
	name: 'user',
	type: 'utility',
	usage: 'user <optional-mention>',
	permission: 1,
	help: 'Provides information about a user.',
	main: function(bot, msg) {
		if (msg.mentions.users.array()[0])
			var member = msg.guild.members.get(msg.mentions.users.array()[0].id);
		else if(bot.users.get(msg.content) != null)
			var member = msg.guild.members.get(msg.content);
		else
			var member = msg.guild.members.get(msg.author.id);
		var user = member.user;
		var roles = member.roles.size;

		if(user.presence.game)
			var game = user.presence.game.name
		else
			var game = 'None'
		
		var info = new Discord.RichEmbed()
		.setAuthor(user.username + '#' + user.discriminator, user.avatarURL)
		.setDescription("User Information")
		.setColor(member.displayHexColor)
		.setFooter('Triggered by ' + msg.author.username, msg.author.avatarURL)
		.setTimestamp()
		.setThumbnail(user.avatarURL)
		.addField('Username', user.username, true)
		.addField('Display Name', member.displayName, true)
		.addField('ID', user.id, true)
		.addField('Account Created', new Date(user.createdAt), true)
		.addField('Join Date', new Date(member.joinedAt), true)
		.addField('Bot', user.bot, true)
		.addField('Status', user.presence.status, true)
		.addField('Game', game, true)
		.addField('Roles', roles, true)
		.addField('Color', member.displayHexColor, true)
		.addField('Highest Role', member.highestRole.name, true)
		.addField('Avatar URL', '[Here](' + user.avatarURL + ')', true)
		
		msg.channel.send({embed:info})
	}
};
