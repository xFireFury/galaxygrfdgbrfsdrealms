const Discord = require('discord.js');
const fs = require('fs')
const color = "BLUE"

module.exports.run = async (client, msg, args) => {
  let owner = new Discord.RichEmbed()
  .setColor(color)
  .setAuthor(`Only owners can reload commands`, `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4uti-kd958J2J_LsvALa7PbjGafsNBqVu0QHp0qMvrontC7uD`)
  
    let nocommand = new Discord.RichEmbed()
  .setColor(color)
  .setAuthor(`Please send a valid command`, `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4uti-kd958J2J_LsvALa7PbjGafsNBqVu0QHp0qMvrontC7uD`)
    
        let err = new Discord.RichEmbed()
  .setColor(color)
  .setAuthor(`Woops, Cant load that command`, `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4uti-kd958J2J_LsvALa7PbjGafsNBqVu0QHp0qMvrontC7uD`)
        
if(msg.member.id != "377876082835324929")
return msg.channel.send(owner)
if(!args[0])return msg.channel.send(nocommand)
client.loadCommand = (commandName) => {
    try {
      const props = require(`../commands/${commandName}`);
      if (props.init) {
        props.init(client);
      }
      client.commands.set(props.help.name, props);
      return false;
    } catch (e) {
      return msg.channel.send(e);
    }
  };
  client.unloadCommand = async (commandName) => {
    console.log(`Reloaded ${commandName}.js`)
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    }
    if (!command) return msg.channel.send(err)
  
    delete require.cache[require.resolve(`../commands/${commandName}.js`)];
    return false;
  };

  let response = await client.unloadCommand(args[0]);
  if (response) return msg.reply(`Error Unloading: ${response}`)

  response = client.loadCommand(args[0]);
  if (response) return msg.reply(`Error Loading: ${response}`)

          let done = new Discord.RichEmbed()
  .setColor(color)
  .setAuthor(`The command ${args[0]} was successfully reloaded`, `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4uti-kd958J2J_LsvALa7PbjGafsNBqVu0QHp0qMvrontC7uD`)
  
  msg.channel.send(done)


}


module.exports.help = {
    name: 'reload'
  }