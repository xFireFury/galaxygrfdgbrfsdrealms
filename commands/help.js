const Discord = require("discord.js");
const fs = require("fs");
let cmds = [];

fs.readdir("./commands", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    jsfile.forEach((f, i) => {
        let props = require(`../commands/${f}`);
        cmds.push(props.help)
    });
})

module.exports.run = async (bot, message, args) => {
    let perPage = 12;

    let totalPages = Math.ceil(cmds.length / perPage);

    let botconfig = JSON.parse(fs.readFileSync("./botconfig.json", "utf8"));

    let arg = args.slice(0).join(" ");
    for (var i = 0; i < cmds.length; i++) {
        if (arg === cmds[i].name) {
            let cmdEmbed = new Discord.RichEmbed()
            .setDescription(`**${arg}** command help\n\`[required]\` \`(optional)\``)
            .setColor("ffb2dc")
            .addField("Usage", `\`${botconfig.prefix}${arg}${(cmds[i].usage || "")}\``)
            .addField("Description", cmds[i].desc)
            if (cmds[i].perms) cmdEmbed.addField("Required Permission", cmds[i].perms)
            if (cmds[i].dm) cmdEmbed.addField("Allowed in DM", "Yes")
            else cmdEmbed.addField("Allowed in DM", "No")
            if (cmds[i].info) cmdEmbed.addField("More Information", cmds[i].info)
            .setFooter(`To view all commands, type "${botconfig.prefix}help (page)"`);

            return message.channel.send(cmdEmbed);
        }
    }

    let page = Math.floor(args[0]);
    if (!page || page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    let helpEmbed = new Discord.RichEmbed()
    .setDescription("List of commands")
    .setColor("ffb2dc")
    .addField(`Prefix:`, botconfig.prefix)
    .setFooter(`Page ${page} of ${totalPages}. Type "${botconfig.prefix}help (page/command)" to view a new page or more information about a command`)
    
    for (var i = page * perPage - perPage; i < Math.min(page * perPage, cmds.length); i++) {
        helpEmbed.addField(cmds[i].name, cmds[i].desc)
    }

    try {
        await message.author.send(helpEmbed);
        message.channel.send("Help page has been sent through DM");
    } catch (e) {
        message.channel.send(helpEmbed);
    }
}

module.exports.help = {
    name: "help",
    desc: "See a list of commands or information about a command",
    usage: " (page/command)"
}