const { RichEmbed } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

module.exports = {
	name: 'shardinfo',
	type: 'core',
	usage: 'shardinfo',
	permission: 1,
	help: 'Gives you information on the bot\'s shards.',
	main: function (bot, msg) {
		bot.shard.fetchClientValues('guilds.size').then(guilds => {
            bot.shard.fetchClientValues('uptime').then(uptime => {
                let averageUptime = (uptime[0] + uptime[1]) / 2;
                const embed = new RichEmbed()
                .setColor(0x0000FF)
                .setAuthor(bot.user.username, bot.user.avatarURL)
                .setTitle('Shard Info')
                .addField('Total Shards:', bot.shard.count)
                .addField('Total Servers:', guilds.reduce((prev, val) => prev + val, 0).toLocaleString())
                .addField('Shard 0 Servers:', guilds[0].toLocaleString())
                .addField('Shard 1 Servers:', guilds[1].toLocaleString())
                .addField('Average Shard Uptime:', moment.duration(averageUptime).format(' D [days], H [hrs], m [mins], s [secs]'))
                .addField('Shard 0 Uptime:', moment.duration(uptime[0]).format(' D [days], H [hrs], m [mins], s [secs]'))
                .addField('Shard 1 Uptime:', moment.duration(uptime[1]).format(' D [days], H [hrs], m [mins], s [secs]'))
                msg.channel.send({embed:embed});
            })
        })
	}
};