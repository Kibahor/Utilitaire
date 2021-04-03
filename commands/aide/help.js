module.exports = {
  name:'help',
  aliases: 'h',
  description: 'Affiche une description de chaques commandes',
  usage: '+help <commande>',
  args: false,
  execute(message,args,client){
    const custom = require('../../myfunction.js');
    const Discord = require('discord.js');

    if (args[0]) {
      const command = client.commands.get(args[0])
      if (!command) {
        return message.channel.send(custom.ToEmbedWarning(`Commande : \`${args[0]}\` introuvable`));
      }else{
        return message.channel.send(custom.ToEmbed(`\`${command.usage}\`   ${command.description}`));
      }
    }else{
      reply=''
      for(let command of client.commands.array()){
        reply+=`\`${command.usage}\`\n${command.description}\n`
      }
      return message.channel.send(custom.ToEmbed1("Help",reply));
    }
  }
}
