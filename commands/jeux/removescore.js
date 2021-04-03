module.exports = {
  name:'removescore',
  category:'Jeux',
  description: "Supprime le score d'un jeu sur un utilisateur",
  usage: '+removescore @user <all|nom du jeu>',
  permission: 'ADMINISTRATOR',
  args: true,

  execute(message,args,client){
    const fs = require('fs');
    const Discord= require('discord.js')

    const custom_embed = require('../../MyModule/embed.js');
    const custom_score = require('../../MyModule/score.js');
    const {blue}=require('../../config.json');

//Si d'autres commandes necessitent perm admin vérifier directement dans event message
    if(!message.member.hasPermission('ADMINISTRATOR')){return message.reply(custom_embed.ToEmbedWarning("Vous n'avez pas la permissions d'utiliser cette commande !"));}
    else if(!message.mentions.users.size) {return message.reply(custom_embed.ToEmbedWarning("Aucun utilisateur n'as été mentionner"));}
    else if(!args[1] && args[0]!==message.mentions.users.first()){return message.reply(custom_embed.ToEmbedWarning("Aucun jeu mentionné !"));}

    let taggedUser=message.mentions.users.first();
    arg_jeu=args[1];
    let reply;
    if(custom_score.removeScore(taggedUser,arg_jeu)){
      if(arg_jeu==="all"){reply=`Tout vos scores ont bien été supprimer !`;}
      else{reply=`Votre Score sur le jeu \`${arg_jeu}\` à bien été supprimer !`;}
    }else{
      return message.channel.send(custom_embed.ToEmbedWarning("Aucun scores trouvés"));
    }

    const MsgEmbed = new Discord.MessageEmbed()
      .setThumbnail(taggedUser.displayAvatarURL({ format: "png", dynamic: false }))
      .setTitle('Scores')
      .setDescription(reply)
      .setColor(blue)
      .setFooter("Ton score été de toute façon nul ...")
    return message.channel.send(MsgEmbed);
  }
}
