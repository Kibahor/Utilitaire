module.exports = {
  name:'help',
  aliases: 'h',
  description: 'Affiche une description de chaques commandes',
  usage: '+help <commande>',
  args: false,
  execute(message,args,client){

    const Discord = require('discord.js');

    function embed(message){
      let MsgEmbed = new Discord.MessageEmbed()
        .setColor('#3669d9')
        .setDescription(message)
      return MsgEmbed;
    }

    if (args[0]) {
      const command = client.commands.get(args[0])
      if (!command) {
        return message.channel.send(embed(`Commande : \`${args[0]}\` introuvable`));
      }else{
        return message.channel.send(embed(`\`${command.usage}\`   ${command.description}`));
      }
    }else{
      reply=''
      for(let command of client.commands.array()){
        reply+=`\`${command.usage}\`\n${command.description}\n`
      }
      return message.channel.send(embed(reply));
    }
  }
}
