module.exports = {
    name: 'blame',
    type: 'action',
    usage: 'blame <content>',
    permission: 1,
    help: 'Blame someone',
    main: function(bot, msg) {
        var { Attachment } = require('discord.js');
        bot.IdioticAPI.blame(msg.content).then(img => {
            msg.channel.send(new Attachment(img, 'blame.png'));
        });
    },
};
