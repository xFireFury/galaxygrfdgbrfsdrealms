const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

	var embed = new Discord.RichEmbed()
		.setTitle("Silver's Commands")
		.setColor("BLUE")
		.addField("Report", "Report others for reasons like cussing etc.")
		.addField("Suggest", "Suggest stuff to help the server.")
		.addField("Reload", "This command is only for the bot owners to reload commands.")
	message.channel.sendEmbed(embed);
}
module.exports.help = {
  name:"help"
}
