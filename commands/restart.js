module.exports.run = (bot, message, args, discord) => {
let em = new discord.RichEmbed()
.setTitle("Hulkbot Restarting...")
.setDescription(":wave: Restarting...")
.setThumbnail("https://media1.giphy.com/media/WKJpCXfvBHyla/giphy.gif")
.setTimestamp()
.setColor("GOLD")
let embed = new discord.RichEmbed()
.setTitle("Chaos Restarted!")
.setDescription(":thumbsup: Chaos Successfully Restarted.")
.setThumbnail(bot.user.avatarURL)
.setTimestamp()
.setColor("GOLD")

  function restart(channel) {
    channel.send({embed: em})
    .then(m => m.delete(5000))
    .then(() => bot.destroy())
    .then(() => bot.login(process.env.botToken))
    .catch(err => console.error(err))
    .then(() => message.channel.send({embed: embed}))
  }
  
  restart(message.channel)
}

module.exports.help = {
  name: "restart"
}
