var unirest = require('unirest');
var Discord = require('discord.js');

module.exports = {
	name: 'catfact',
    type: 'fun',
	usage: 'catfact',
	permission: 1,
	help: 'Gets a random cat fact.',
	main: function(bot, msg) {
        unirest.get('http://www.animalplanet.com/xhr.php?action=get_facts&limit=500&page_id=37397&module_id=cfct-module-bdff02c2a38ff3c34ce90ffffce76104')
        .end(function (result) {
            var catfact = JSON.parse(result.body)
            var num = Math.round(Math.random() * catfact.length);
            var e = new Discord.RichEmbed()
            .setFooter("Powered by animalplanet.com")
            .setTimestamp()
            .setTitle("Cat Fact #" + num)
            .setDescription(catfact[num].description)

            msg.channel.send({embed:e})
        })
	}
};