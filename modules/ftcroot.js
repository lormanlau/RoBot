
module.exports = {
	name: 'ftcroot',
	type: 'utility',
	usage: 'ftcroot <team number>',
	permission: 1,
	help: 'Returns an ftcroot link for a given FTC team\'s number',
	main: function(bot, msg) {
		msg.channel.send('http://www.ftcroot.com/teams/' + msg.content);
	}
};
