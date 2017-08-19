const unirest = require('unirest');
const Discord = require('discord.js');

module.exports = {
	name: 'isnowillegal',
	type: 'fun',
	usage: 'isnowillegal <content>',
	permission: 1,
	help: 'Generates an isnowillegal picture for a given word',
	main: function(bot, msg) {
        msg.channel.send('Generating... Please wait...');
        var content = msg.content.replace(" ", "%20")

        unirest.post("https://is-now-illegal.firebaseio.com/queue/tasks.json")
			.send({task:'gif', word: content.toUpperCase()})
			.end(function (response) {
				bot.log(response.body);
            });
            
        setTimeout(function() {
            unirest.get("https://is-now-illegal.firebaseio.com/gifs/" + content.toUpperCase() + ".json")
                .end(function (result) {
                    try {
                        var res = result.body;
                        var embed = new Discord.RichEmbed()
                        .setImage(res.url.replace(" ", "%20"));
                    } catch(err) {
                        msg.channel.send(err);
                    }
                });
                msg.channel.send("https://storage.googleapis.com/is-now-illegal.appspot.com/gifs/" + msg.content.replace(" ", "%20").toUpperCase() + ".gif");
        }, 10000)
	}
};
