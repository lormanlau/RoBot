module.exports = {
    name: 'wanted',
    type: 'fun',
    usage: 'wanted <mention>',
    permission: 1,
    help: 'Make a wanted poster of someone',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js'), user = msg.author;
        if (msg.mentions.users.first()) user = msg.mentions.users.first();
        bot.IdioticAPI.wanted(user.displayAvatarURL.replace('.gif', '.png'), user.username).then(img => {
            msg.channel.send(new Attachment(img, 'wanted.png'));
        });
    },
};
