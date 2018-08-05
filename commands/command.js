const Discord = require('discord.js');
const fs = require('fs');
const config = require(`./../../config.json`);

module.exports.run = function(bot, command, args, message, updateJSON, addFooter){
    if(message.author.id==''){
        message.channel.send('Killing processes...').then(process.exit());
    }
}
 
module.exports.help = {
name: "restart"
}