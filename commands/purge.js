module.exports.run = (bot, message, args) => {
	if (message.member.hasPermission(["MANAGE_MESSAGES"], false, true, true)) {
  if (isNaN(args[0])) {
    return message.channel.send('Please define a number..').then(m => m.delete(2000))
  }

  var am = args[0]
  message.channel.send(":exclamation: Beginning to purge " + am + " messages... :exclamation:").then(m => m.delete(2500))

  setTimeout(() => {
	message.channel.fetchMessages({limit: am}).then(m => message.channel.bulkDelete(m))
	message.channel.send("Done! Purged " + am + " messages!").then(m => m.delete(2000))
  }, 1000);
} else {
	message.channel.send("Sorry, you don't have the required permissions. :neutral_face:").then(m => m.delete(2000))
	}
}

module.exports.help = {
  name: "purge",
  usage: `[amount]`,
  information: "Remove x amount of messages"
}

	
