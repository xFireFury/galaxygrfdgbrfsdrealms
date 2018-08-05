const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.delete();
  let suggestchannel = message.guild.channels.find(`name`, "suggestions");
  let argument = args.join(" ");
  let botEmbed = new Discord.RichEmbed()
  .setColor("BLUE")
  .setAuthor(`Suggestion From ${message.author.username}`, message.author.displayAvatarURL)
  .setDescription(argument)
  
  suggestchannel.send(botEmbed).then(msg => {
      msg.react("✅").then(msg.react("❌"))
  });
};
module.exports.help = {
  name: "suggest"
};