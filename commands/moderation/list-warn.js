//afficher celui qui a warn la personne et le numero du warn
//laisser la possibilité d'afficher tout les warn en envoyant plrs embed en dm
module.exports = {
  name:'list-warn',
  category:'Modération',
  description: 'Afficher la liste des avertissements d\'un utilisateur',
  usage: '+list-warn @user',
  args: false,

  execute(message,args){
    /*Ajout des modules*/
    const Discord = require('discord.js');
    const fs = require('fs');

    const custom_file = require('../../MyModule/file');
    const {blue}=require('../../config.json');

    let taggedUser = message.author;
    if (message.mentions.users.size) {taggedUser=message.mentions.users.first();}

    if(custom_file.IsFileExist(`commands/moderation/warn/${taggedUser.username}.json`)===true){
      let listwarn = custom_file.loadJSON(`commands/moderation/warn/${taggedUser.username}.json`)
      let raison="";
      let date="";
      let i;

      if(listwarn.infraction.length>5){i=listwarn.infraction.length-5;}
      else{i=0;}

      for(i;i<listwarn.infraction.length;i++){
        raison+=`*${listwarn.infraction[i].raison}*\n`;
        date+=`${listwarn.infraction[i].date}\n`;

        if(listwarn.infraction[i].raison.length>=41){
          let nbChar=listwarn.infraction[i].raison.length;
          for(let i=1;i<(nbChar/41);i++){date+='\n'}
        }

      }
      const MsgEmbed = new Discord.MessageEmbed()
        .setThumbnail(taggedUser.displayAvatarURL({ format: "png", dynamic: false }))
        .setTitle('Liste des Warns')
        .addFields(
      		{ name: 'Date', value: `${date}`, inline: true },
      		{ name: 'Raison', value: `${raison}`, inline: true }
        )
        .setColor(blue)
        .setTimestamp()
        .setFooter("C'est pas bien d'être méchant - Naruto")
      return message.channel.send(MsgEmbed);

    }else{
      const MsgEmbed = new Discord.MessageEmbed()
        .setThumbnail(taggedUser.displayAvatarURL({ format: "png", dynamic: false }))
        .setTitle('Liste des Warns')
        .setDescription("Félicitation tu n'as pas (encore) été warn")
        .setColor(blue)
        .setTimestamp()
        .setFooter("Tu es gentil !")
      return message.channel.send(MsgEmbed);
    }
 }
}
