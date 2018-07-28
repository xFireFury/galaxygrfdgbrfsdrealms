const config = require('../json/config.json')
const prefix = process.env.prefix

module.exports.run = (bot, message, args, discord) => {
  if (message.channel.id == "356181785899565077") {
      message.channel.bulkDelete(100).catch(console.err)
      message.channel.send("Successfully cleared the logs.").then(m => m.delete(5000))
    } else {
        console.log("Failed to clear logs. :-(")
    }
}

module.exports.help = {
  name: "clearlogs",
  usage: "h!clearlogs",
  information: "Clears the bot logs"
}
