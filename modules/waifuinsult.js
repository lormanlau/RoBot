module.exports = {
    name: 'waifuinsult',
    type: 'fun',
    usage: 'waifuinsult <mention>',
    permission: 1,
    help: 'My waifu is better than yours! >:(',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js'), user = msg.author;
        if (msg.mentions.users.first()) user = msg.mentions.users.first();
        bot.IdioticAPI.waifuinsult(user.displayAvatarURL.replace('.gif', '.png'), user.username).then(img => {
            msg.channel.send(new Attachment(img, 'waifuinsult.png'));
        });
    },
};
