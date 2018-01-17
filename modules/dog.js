module.exports = {
    name: 'dog',
    type: 'fun',
    usage: 'dog',
    permission: 1,
    help: 'Returns a random dog picture.',
    main: function(bot, msg) {
        const randomPuppy = require('random-puppy');
        randomPuppy().then(url => {
            msg.channel.send(url);
        });
    },
};
