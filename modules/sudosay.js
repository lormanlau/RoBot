module.exports = {
    name: 'sudosay',
    type: 'owner',
    usage: 'sudosay',
    permission: 6,
    help: 'Makes the bot say something.',
    main: function(bot, msg) {
        if (msg.author.id === require('../config.json').owner) {
            msg.channel.send(msg.content);
            msg.delete();
        }
    },
};
