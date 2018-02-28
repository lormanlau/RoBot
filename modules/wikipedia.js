module.exports = {
    name: 'fml',
    type: 'fun',
    usage: 'npm <package-name>',
    permission: 1,
    help: 'Gives you information about an npm package',
    main: async function(bot, msg) {
        const wiki = require('wikipediajs'), { RichEmbed } = require('discord.js'), wiki2 = require('wikijs').default;
        msg.content = msg.content.replace(/ /g, '_');
        wiki.search(msg.content)
            .then(res => {
                if (res.query) {
                    res = res.query.pages[Object.keys(res.query.pages)[0]];
                    wiki2().page(msg.content).then(async function(page) { // eslint-disable-line prefer-arrow-callback
                        const info = await page.summary();
                        const image = await page.mainImage();
                        msg.channel.send({
                            embed: new RichEmbed()
                                .setAuthor('Wikipedia: ' + res.title, 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/220px-Wikipedia-logo-v2.svg.png', res.fullurl)
                                .setFooter('Powered by wikipediajs')
                                .setDescription(info)
                                .setImage(image)
                                .setTimestamp()
                                .setColor(msg.guild.me.displayHexColor),
                        });
                    });
                }
            })
            .catch(error => console.log(error));
    },
};
