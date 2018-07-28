const oid = process.env.oid

module.exports.run = (bot, message, args, discord) => {
 var game = args.join(' ')
  if (message.author.id == oid) {
   if (!game) {
    message.channel.send(`:ok_hand: Okay, I will set my activity back to normal!`)
    bot.user.setActivity(`for h!help | ${bot.guilds.size} servers`, {type: "WATCHING"})
  } else {
    bot.user.setActivity(`${game}`, {type: "PLAYING"})
    message.channel.send(`:ok_hand: Okay, I will set my activity to '${game}'!`)
  }
  } else {
     message.channel.send("Nope!")
  } 
}

module.exports.help = {
  name: "changegame",
  usage: ``,
  information: ""
}
