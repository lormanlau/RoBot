const printscreen = require('printscreen');

module.exports = {
    name: 'webshot',
    type: 'utility',
    usage: 'webshot <website>',
    permission: 1,
    help: 'Returns a screenshot of a website.',
    main: function (bot, msg) {
        if(msg.content.indexOf("http") < 0) return "Please specify a website with http(s) included!";
        printscreen(msg.content, {
            viewport: {
                width: 1920,
                height: 1080
            },
            timeout: 1000,
            format: 'png',
            quality: 75,
        }, (err, data) => {
            bot.log(data.file);
            msg.channel.send("Screenshot of <" + msg.content + ">", {file:data.file})
        });
    }
};