module.exports = {
    name: 'vaultboy',
    type: 'image generation',
    usage: 'vaultboy <mention>',
    permission: 1,
    help: 'Ever wanted to be Vault Boy? Well now you can!',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js'), user = msg.author;
        if (msg.mentions.users.first()) user = msg.mentions.users.first();
        bot.IdioticAPI.vaultBoy(user.displayAvatarURL.replace('.gif', '.png')).then(img => {
            msg.channel.send(new Attachment(img, 'vaultBoy.png'));
        });
    },
};
