module.exports = {
  name:'list-warn',
  aliases: '',
  description: 'Afficher la liste des avertissements',
  usage: '+list-warn',
  args: false,
  execute(message,args){
    let taggedUser = message.author;
    const Discord = require('discord.js');
    const fs = require('fs')

    try{
      let fichier=fs.readFileSync(`commands/warn/${taggedUser.username}.json`);
      let listwarn = JSON.parse(fichier)
      let date="";
      let raison="";
      for(let i=0;i<listwarn.infraction.length;i++){
        raison+=`*${listwarn.infraction[i].raison}*\n`
        date+=`${listwarn.infraction[i].date}\n`
      }


      const MsgEmbed = new Discord.MessageEmbed()
        .setThumbnail(taggedUser.displayAvatarURL({ format: "png", dynamic: false }))
        .setTitle('Liste des Warns')
        .addFields(
      		{ name: 'Date', value: `${date}`, inline: true },
      		{ name: 'Raison', value: `${raison}`, inline: true }
        )
        .setColor('#3669d9')
        .setTimestamp()
        .setFooter('C\'est pas bien d\'être méchant - Naruto')
      return message.channel.send(MsgEmbed);
    }catch(error){
      const MsgEmbed = new Discord.MessageEmbed()
        .setThumbnail(taggedUser.displayAvatarURL({ format: "png", dynamic: false }))
        .setTitle('Liste des Warns')
        .setDescription('Félicitation tu n\'as pas (encore) été warn')
        .setColor('#3669d9')
        .setTimestamp()
        .setFooter('Tu es gentil !')
      return message.channel.send(MsgEmbed);
    }
 }
}
