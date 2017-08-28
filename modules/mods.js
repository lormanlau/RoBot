const Discord = require('discord.js');

module.exports = {
    name: 'mods',
    type: 'utility',
    usage: 'mods',
    permission: 1,
    help: 'Gives you information about the server moderators.',
    main: function (bot, msg) {
        var members = {}

        msg.guild.members.forEach(member => {
            if (member.hasPermission("MANAGE_MESSAGES") && !member.user.bot) {
                if (!members[member.hoistRole.name])
                    members[member.hoistRole.name] = []
                members[member.hoistRole.name].push(member);
            }
        });

        var mods = new Discord.RichEmbed()
            .setTitle("Moderators on " + msg.guild.name)
            .setThumbnail(msg.guild.iconURL)
            .setFooter("Powered by RoBot", bot.user.iconURL)
            .setTimestamp()

        for (var role in members) {
            var str = ""
            var arr = members[role];

            for (var i = 0; i < arr.length; i++) {
                var user = arr[i].user;
                if (user.presence.status == 'offline')
                    str += ":offline: **" + arr[i].displayName + "**\n"
                else if (user.presence.status == 'idle')
                    str += ":away: **" + arr[i].displayName + "**\n"
                else if (user.presence.status == 'online')
                    str += ":online: **" + arr[i].displayName + "**\n"
                else if (user.presence.status == 'dnd')
                    str += ":dnd: **" + arr[i].displayName + "**\n"
            }

            var arr = members[role];
            mods.addField(role, str);
        }

        msg.channel.send({ embed: mods })
    }
};
