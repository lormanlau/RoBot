module.exports = {
    name: 'rejected',
    type: 'fun',
    usage: 'rejected <mention>',
    permission: 1,
    help: 'Reject someone\'s avatar!',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js'), user = msg.author;
        if (msg.mentions.users.first()) user = msg.mentions.users.first();
        bot.IdioticAPI.rejected(user.displayAvatarURL.replace('.gif', '.png'), user.username).then(img => {
            msg.channel.send(new Attachment(img, 'rejected.png'));
        });
    },
};
