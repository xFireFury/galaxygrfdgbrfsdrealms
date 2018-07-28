const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bestGirlChannel = message.guild.channels.find(`name`, "best-girl");
    if (message.channel !== bestGirlChannel) return message.reply(`use best girl commands in ${bestGirlChannel}!`).then(msg => msg.delete(5000));
    if (!args[0]) return message.channel.send("Specify a valid team to join");
    if (args[0].toLowerCase() !== "monika" && args[0].toLowerCase() !== "sayori" && args[0].toLowerCase() !== "yuri" && args[0].toLowerCase() !== "natsuki") return message.channel.send("Specify a valid team to join");
    
    let monikaRole = message.guild.roles.find(`name`, "Team Monika");
    let sayoriRole = message.guild.roles.find(`name`, "Team Sayori");
    let yuriRole = message.guild.roles.find(`name`, "Team Yuri");
    let natsukiRole = message.guild.roles.find(`name`, "Team Natsuki");

    if (args[0].toLowerCase() === "monika") message.member.addRole(monikaRole.id);
    if (args[0].toLowerCase() === "sayori") message.member.addRole(sayoriRole.id);
    if (args[0].toLowerCase() === "yuri") message.member.addRole(yuriRole.id);
    if (args[0].toLowerCase() === "natsuki") message.member.addRole(natsukiRole.id);

    
    if (args[0].toLowerCase() !== "monika") message.member.removeRole(monikaRole.id);
    if (args[0].toLowerCase() !== "sayori") message.member.removeRole(sayoriRole.id);
    if (args[0].toLowerCase() !== "yuri") message.member.removeRole(yuriRole.id);
    if (args[0].toLowerCase() !== "natsuki") message.member.removeRole(natsukiRole.id);

    message.delete().catch();
    message.channel.send(`${message.author} chose ${args[0][0].toUpperCase()}${args[0].slice(1).toLowerCase()}`);
}

module.exports.help = {
    name: "team",
    desc: "Join a best girl team",
    usage: " [monika/sayori/yuri/natsuki]"
}