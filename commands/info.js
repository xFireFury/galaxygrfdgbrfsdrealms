const pkg = require('../package.json')

module.exports.run = (bot, message, args) => {
  var msgArray = []; 
  msgArray.push(`Hello, I'm ${bot.user.username} version ${pkg.version}, a Discord bot running on NodeJS Version 8.`);
  msgArray.push(`My create date is January of 2017`)
  msgArray.push(`I'm currently running on Discord.js version 12.0.0 which utilizes the latest version of Discord.js, an *unofficial* Discord libary by hydrabolt.`);
  msgArray.push(`To see what I can do, use h!help`);
  msgArray.push(`My invocation method is using prefixes, currently, I only respond to messages beginning with h!`);
  message.channel.send(msgArray)
}

module.exports.help = {
  name: "info",
  usage: ``,
  information: "I'll tell you some information about myself."
}
