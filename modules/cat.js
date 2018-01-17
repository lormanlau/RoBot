var unirest = require('unirest');

module.exports = {
    name: 'cat',
    type: 'fun',
    usage: 'cat',
    permission: 1,
    help: 'Returns a random cat picture.',
    main: function(bot, msg) {
        unirest.get('http://random.cat/meow')
        .end(result => {
            msg.channel.send(result.body.file);
        });
    },
};
