module.exports = {
    name: 'wreckit',
    type: 'fun',
    usage: 'wreckit <mention>',
    permission: 1,
    help: 'Wreck It Ralph meme generation',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js'), user = msg.author;
        if (msg.mentions.users.first()) user = msg.mentions.users.first();
        bot.IdioticAPI.wreckIt(user.displayAvatarURL.replace('.gif', '.png'), user.username).then(img => {
            msg.channel.send(new Attachment(img, 'wreckit.png'));
        });
    },
};
