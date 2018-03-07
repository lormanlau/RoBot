module.exports = {
    name: 'heavyfear',
    type: 'fun',
    usage: 'heavyfear <mention>',
    permission: 1,
    help: 'What could Heavy possibly be afraid of?',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js'), user = msg.author;
        if (msg.mentions.users.first()) user = msg.mentions.users.first();
        bot.IdioticAPI.heavyFear(user.displayAvatarURL.replace('.gif', '.png'), user.username).then(img => {
            msg.channel.send(new Attachment(img, 'heavyfear.png'));
        });
    },
};
