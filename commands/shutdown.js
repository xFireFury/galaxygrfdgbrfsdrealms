module.exports.run = (bot, message, args, discord) => {
  if (message.author.id == process.env.oid) {
    let embed = new discord.RichEmbed()
      .setTitle("Chaos Shutdown")
      .setDescription(":wave: Chaos Bot will now shutdown... :cry:")
      .setThumbnail(bot.user.avatarURL)
      .setColor('BLUE')
    message.channel.send({ embed })
    setTimeout(() => {
      process.exit(666);
    }, 500)
  } else {
    message.channel.send("Nope!")
  }
}

module.exports.help = {
  name: "shutdown",
  usage: ``,
  information: ""
}
