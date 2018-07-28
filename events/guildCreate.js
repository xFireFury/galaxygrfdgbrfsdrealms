const fs = require('fs')

module.exports = (bot, guild, discord) => {
  let member = guild.owner
  let embed = new discord.RichEmbed()
  .setTitle("Introduction to Hulkbot")
  .addField("Heyo! Thanks for adding me.","Before you start using me, I need to get some things straight. First of all, for some basic info about me, say `h!info`.")
  .addField("To see a list of commands","Say `h!help`.", true)
  .addField("If you need to report a bug:","go to the [issue tracker](https://github.com/FHGDev/JSHulkbot/issues/new), or just use the `h!contact` command, and it will send a message straight to my creator.")
  .addField("Done!", "Alrighty! Now you can start using all my awesome features in your server!")
  .setThumbnail(bot.user.avatarURL)
  .setTimestamp()
 
  member.send({embed})
}
