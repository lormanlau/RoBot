module.exports = {
    name: 'wikipedia',
    type: 'info',
    usage: 'wikipedia <package-name>',
    permission: 1,
    help: 'Fetches a Wikipedia article',
    main: async function(bot, msg) {
        const { RichEmbed } = require('discord.js'), wiki = require('wikijs').default;
        msg.content = msg.content.replace(/ /g, '_');
        wiki().page(msg.content).then(async function(page) { // eslint-disable-line prefer-arrow-callback
            const info = await page.summary();
            const image = await page.mainImage();
            msg.channel.send({
                embed: new RichEmbed()
                    .setAuthor('Wikipedia: ' + page.raw.title, 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/220px-Wikipedia-logo-v2.svg.png', page.raw.fullurl)
                    .setFooter('Powered by wikipediajs')
                    .setDescription(info.substring(0, info.indexOf('\n')) + `\n[Read More](${page.raw.fullurl})`)
                    .setImage(image)
                    .setTimestamp()
                    .setColor(msg.guild.me.displayHexColor),
            });
        });
    },
};
