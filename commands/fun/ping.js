module.exports = {
  name:'ping',
  aliases: 'p',
  category:'Fun',
  description: 'Affiche le gif de gandalf sax guy',
  usage: '+ping',
  args: false,
  execute(message){
    const Discord = require('discord.js');
    const {blue}=require('../../config.json');

    const MsgEmbed = new Discord.MessageEmbed()
      .setColor(blue)
      .setDescription('*EL Magnificos Gandalf* apparrait !')
      .setImage(url='https://media1.tenor.com/images/65a97143d2979f9ef4dc898d1f0d8eb5/tenor.gif?itemid=18663354')
      .setTimestamp()
      .setFooter('Gandalf Sax Guy Intensifies')
      
    return message.channel.send(MsgEmbed);
  }
}
