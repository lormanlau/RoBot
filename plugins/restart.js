module.exports = {
	main: function(bot, msg){
		if (msg.member.hasPermission('ADMINISTRATOR') === true || msg.author.id === "171319044715053057") {
			msg.channel.sendMessage(":wave: RoBot is restarting...");

			setTimeout(function() {
				bot.logout();
			}, 1000);

			setTimeout(function() {
				process.exit();
			}, 2000);
		} else {
			msg.channel.sendMessage(msg.author + ": You do not have permission to do this!")
		}
	}
};
