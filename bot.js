// init ;p
const time = Date(),
stitch = require("mongodb-stitch"),
pak = require('./package.json'),
discord = require('discord.js'),
config = require('./json/config.json'),
profanities = require("./profanities.json"),
bot = new discord.Client(),
prefix = process.env.prefix,
{baselogger} = require('./src/logger.js'),
result = Math.round(Math.random()),
updates = ["Removed the language filter for good."],
webhookchannelid = "441710517460008960",
cleverbot = require('cleverbot.io'),
ms = require('ms'),
cb = new cleverbot("sMNApmkOjMlZRlPZ", "gskxw3JBqEVGIAboBjOnvyTf8awM1MbS")
config.updates = updates.join(' ')
// End of init

// The bot's support server invite vvv
bot.invite = "https://discord.gg/qEFNkxB"
// No more invite.

// Gather commands
bot.commands = new discord.Collection();

require('fs').readdir("./commands/", (err, files) => {
  console.log("Loading commands...");
  if (err) return console.log(`Command loading failed!`);
  files.filter(f => f.split(".").pop() === "js").forEach((f, i) => {
    bot.commands.set(require(`./commands/${f}`).help.name, require(`./commands/${f}`));
  });
});

bot.on("ready", () => {
  require('./util/poststats.js')(bot)
  require('./util/consoles.js')(bot, config)
  
  setTimeout(() => {
  }, 20000)

  bot.guilds.forEach((guild, id) => {
    console.log(`[SERVER] [${guild.memberCount}] ${guild.name} (${guild.id}) | Joined: ${guild.joinedAt.toString()}\n`)
  });
});
bot.on('error', (err) => {
  console.error(`Error... ${err}`).then(() => {
    bot.destroy().then(() => {
      bot.login(process.env.botToken)
    })
  })
})
bot.on("guildMemberAdd", (member) => require('./events/guildMemberAdd.js')(bot, member))
bot.on("guildMemberRemove", (member) => require('./events/guildMemberRemove.js')(bot, member))
// bot.on("guildBanAdd", (guild, member) => require('./events/BanAdd.js')(bot, guild, member))
bot.on("guildBanRemove", (guild, member) => require('./events/BanRemove.js')(bot, guild, member))
 
bot.on("message", message => {
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  if (message.channel.type == "dm") return;

  let mArray = message.content.split(" ");
  let args = mArray.slice(1);
  let loggedcmd = mArray[0].slice(prefix.length)

  let cmd = bot.commands.get(loggedcmd);
  if (message.author.bot) return;

  if (cmd) {
      if (config.userblacklist.includes(message.author.id)) return;
      message.channel.startTyping();
        cmd.run(bot, message, args, discord);  
      message.channel.stopTyping();
        console.log(`${message.author.username} used the ${loggedcmd} command.`);
        if (message.guild.id == "427846834225020928") {
        return;
    } else {
        baselogger(bot, `**Command Run**\n\n**Command:** ${loggedcmd}\n**User:** ${message.author.tag}\n**Message:** ${message.content}\n**Guild:** ${message.guild.name}\n**Channel:** ${message.channel.name}`);
    }
  } 
    if (message.content.toLowerCase().includes("i love you hulkbot")) {
    message.channel.send("oh god, not another one");
  }
 });
      
bot.on("guildCreate", (guild) => {
  require('./events/guildCreate.js')(bot, guild, discord)
  baselogger(bot, `**Guild Join**\n\n**Guild:** ${guild.name}\n**Owner:** ${guild.owner.user.username}\n**Large:** ${guild.large}\n**Member Count:** ${guild.memberCount}\n\n**Total Guilds:** ${bot.guilds.array().length}`, guild.iconURL);
});

bot.on("guildDelete", (guild) => {
  require('./events/guildDelete.js')(bot, guild, discord)
  baselogger(bot, `**Guild Leave**\n\n**Guild:** ${guild.name}\n**Owner:** ${guild.owner.user.username}\n**Large:** ${guild.large}\n**Member Count:** ${guild.memberCount}\n\n**Total Guilds:** ${bot.guilds.array().length}`, guild.iconURL);
});

bot.login(process.env.botToken); 

let upmsg = `Oh yeah, more updates! New updates:\n${updates}`
  async function senddat(up,msg) {
    if (up == null) return;
   await bot.channels.get('441982405985828864').send(msg).then(() => {
     up.pop(up)
   })
   await bot.channels.get('441982440005697539').send(msg).then(() => {
     up.pop(up)
   })
  }
exports.date = time
exports.bot = bot
exports.updates = updates.join(" ")
exports.sendupdates = senddat
