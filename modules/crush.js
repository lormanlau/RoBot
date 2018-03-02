module.exports = {
    name: 'crush',
    type: 'action',
    usage: 'crush <mention>',
    permission: 1,
    help: 'Someone has a crush on someone!',
    main: function(bot, msg) {
        var avatarURL, target, { Attachment } = require('discord.js');
        if (!msg.mentions.users.first()) {
            avatarURL = msg.author.displayAvatarURL.replace('.gif', '.png');
            target = 'themselves';
        } else {
            avatarURL = msg.mentions.users.first().displayAvatarURL.replace('.gif', '.png');
            target = msg.mentions.members.first().displayName;
        }

        bot.IdioticAPI.crush(msg.author.displayAvatarURL.replace('.gif', '.png'), avatarURL).then(img => {
            msg.channel.send(`**${msg.member.displayName}** has a crush on **${target}**!`, new Attachment(img, 'crush.png'));
        });
    },
};
