module.exports = {
    name: 'hug',
    type: 'action',
    usage: 'hug <mention>',
    permission: 1,
    help: 'Batslap someone',
    main: function(bot, msg) {
        var avatarURL, target, { Attachment } = require('discord.js');
        if (!msg.mentions.users.first()) {
            avatarURL = msg.author.displayAvatarURL;
            target = 'themselves';
        } else {
            avatarURL = msg.mentions.users.first().displayAvatarURL;
            target = msg.mentions.members.first().displayName;
        }

        bot.IdioticAPI.batSlap(msg.author.displayAvatarURL, avatarURL).then(img => {
            msg.channel.send(`**${msg.member.displayName}** slapped **${target}**!`, new Attachment(img, 'slap.png'));
        });
    },
};
