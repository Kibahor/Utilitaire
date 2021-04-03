module.exports = {
  name:'help',
  aliases: 'h',
  category:'Aide',
  description: 'Affiche une description de chaques commandes',
  usage: '+help <commande>',
  args: false,
  execute(message,args,client){
    const custom_embed = require('../../MyModule/embed.js');
    const Discord = require('discord.js');

    if (args[0]) {
      const command = client.commands.get(args[0])
      if (!command) {
        return message.channel.send(custom_embed.ToEmbedWarning(`Commande : \`${args[0]}\` introuvable`));
      }else{
        return message.channel.send(custom_embed.ToEmbed(`\`${command.usage}\`   ${command.description}`));
      }
    }else{
      reply='';
      for(let command of client.commands.array()){
          if(!reply.includes(`\n**[${command.category}]**\n`)){reply+=`\n**[${command.category}]**\n`;}
          reply+=`\`${command.usage}\`\n${command.description}\n`;
      }
      return message.channel.send(custom_embed.ToEmbed1("Help",reply));
    }
  }
}
