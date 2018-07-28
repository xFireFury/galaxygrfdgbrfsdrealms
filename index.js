const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

let pink = "ffb2dc";
let lightPink = "ffe2f1";

fs.readdir("./commands", (err, files) => {

  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    bot.commands.set(props.help.name, props);
    console.log(`${f} loaded!`);
  });

})

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online in ${bot.guilds.size} servers!`);
  bot.user.setActivity(`DDLC | d/help`);
});

bot.on("guildMemberAdd", async member => {
  let welcomeChannel = member.guild.channels.find(`name`, "general");
  welcomeChannel.send(`${member.user.username}.chr added successfully.`);
});

bot.on("guildMemberRemove", async member => {
  let welcomeChannel = member.guild.channels.find(`name`, "general");
  welcomeChannel.send(`${member.user.username}.chr deleted successfully.`);
})

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (!message.content.startsWith(prefix)) return;

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);
  if (message.content.startsWith(`${prefix}eval`)) {
    if (message.author.id !== "463255069543104553") return;
    let code = args.slice(0).join(" ");
    try {
      await eval(code);
    } catch(e) {
      message.channel.send("`" + e.toString() + "`");
    }
  }
});

bot.login(process.env.BOT_TOKEN);
