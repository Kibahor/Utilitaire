module.exports = {
  name:'list-warn',
  description: 'Afficher la liste des avertissements d\'un utilisateur',
  usage: '+list-warn @user',
  args: false,

  execute(message,args){
    /*Ajout des modules*/
    const Discord = require('discord.js');
    const fs = require('fs');
    const custom = require('../../myfunction.js');

    let taggedUser = message.author;

    if (message.mentions.users.size) {taggedUser=message.mentions.users.first();}

    if(custom.IsFileExist(`commands/warn/${taggedUser.username}.json`)===true){
      let listwarn = JSON.parse(fs.readFileSync(`commands/warn/${taggedUser.username}.json`))
      let date="";
      let raison="";
      let i;
      if(listwarn.infraction.length<9){i=0;}
      else{i=listwarn.infraction.length-9}
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
        .setColor('#3669d9')
        .setTimestamp()
        .setFooter("C'est pas bien d'être méchant - Naruto")
      return message.channel.send(MsgEmbed);

    }else{
      const MsgEmbed = new Discord.MessageEmbed()
        .setThumbnail(taggedUser.displayAvatarURL({ format: "png", dynamic: false }))
        .setTitle('Liste des Warns')
        .setDescription("Félicitation tu n'as pas (encore) été warn")
        .setColor('#3669d9')
        .setTimestamp()
        .setFooter("Tu es gentil !")
      return message.channel.send(MsgEmbed);
    }
 }
}
