module.exports.run = (bot, message, args, discord) => {
  message.channel.send(`My creators are <@${process.env.oid}>.`)
}

module.exports.help = {
  name: "creators"
}
