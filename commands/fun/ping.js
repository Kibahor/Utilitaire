module.exports = {
  name:'ping',
  aliases: 'p',
  description: 'Affiche le gif de gandalf sax guy',
  usage: '+ping',
  args: false,
  execute(message){
    const Discord = require('discord.js');
    const MsgEmbed = new Discord.MessageEmbed()
      .setColor('#3669d9')
      .setDescription('*EL Magnificos Gandalf* apparrait !')
      .setImage(url='https://tenor.com/bqtl0.gif')
      .setTimestamp()
      .setFooter('Gandalf Sax Guy Intensifies')
    return message.channel.send(MsgEmbed);
  }
}
