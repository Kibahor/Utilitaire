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

    function search_user_by_id(id,listwarn){
      for(let i=0;i<listwarn.userlist.length;i++){
        if(listwarn.userlist[i].user === id){return i;}
      }
      return null;
    }

    if(custom_file.IsFileExist(`commands/moderation/warn/listwarn.json`)===true){
      let listwarn = custom_file.loadJSON(`commands/moderation/warn/listwarn.json`);
      let user_index=search_user_by_id(taggedUser.id,listwarn);
      let reply="";
      let user;
      let j;

      if(user_index===null){return custom_embed.ToEmbedWarning(`user ${id} n'as pas été trouvé !`);}

      if(listwarn.userlist[user_index].infraction.length<=5){j=0;}
      else{j=listwarn.userlist[user_index].infraction.length-6;}
      for(let i=listwarn.userlist[user_index].infraction.length-1;i>j;i--){
        reply+=`**[${i}] [${listwarn.userlist[user_index].infraction[i].date}] [<@${listwarn.userlist[user_index].infraction[i].from}>]**\n*${listwarn.userlist[user_index].infraction[i].raison}*\n\n`;
      }

      const MsgEmbed = new Discord.MessageEmbed()
        .setThumbnail(taggedUser.displayAvatarURL({ format: "png", dynamic: false }))
        .setTitle('Liste des Warns')
        .setDescription(reply)
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
