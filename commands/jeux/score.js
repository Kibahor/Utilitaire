module.exports = {
  name:'score',
  category:'Jeux',
  description: "Afficher le score d'un utilisateur",
  usage: '+score @user <all|nom du jeu>',
  args: false,

  execute(message,args,client){
    const fs = require('fs');
    const Discord= require('discord.js')

    const custom_file = require('../../MyModule/file');
    const custom_embed = require('../../MyModule/embed.js');
    const {blue}=require('../../config.json');

    //[à modifier] Peut-être faire une fonction embed pour regrouper
    function showAllScore(taggedUser,footer){
      let listscore = custom_file.loadJSON(`commands/jeux/score/${taggedUser.username}.json`);
      let reply="";
      for(let i=0;i<listscore.jeux.length;i++){reply+=`**${listscore.jeux[i].nom}** : ${listscore.jeux[i].score}\n`}
      const MsgEmbed = new Discord.MessageEmbed()
        .setThumbnail(taggedUser.displayAvatarURL({ format: "png", dynamic: false }))
        .setTitle('Liste des Scores')
        .setDescription(reply)
        .setColor(blue)
        .setFooter(footer)

      return message.channel.send(MsgEmbed);
    }

    function showOneScore(taggedUser,nom_jeu,footer){
      let listscore = custom_file.loadJSON(`commands/jeux/score/${taggedUser.username}.json`);
      indice=0;
      //[à modifier] faire appel à la fonction de recherche
      for(let i;i<listscore.jeux.length;i++){ //Cherche l'indice d'un jeu
        if(listscore.jeux[i].nom===nom_jeu){break;}
        indice++;
      }
      let reply=`**${listscore.jeux[indice].nom}** : ${listscore.jeux[indice].score}\n`;//[à modifier] Afficher le score avec les emoji chiffre

      const MsgEmbed = new Discord.MessageEmbed()
        .setThumbnail(taggedUser.displayAvatarURL({ format: "png", dynamic: false }))
        .setTitle(`Score de \`${nom_jeu}\``)
        .setDescription(reply)
        .setColor(blue)
        .setFooter(footer)

      return message.channel.send(MsgEmbed);
    }

    let taggedUser=message.author;
    let arg_jeu="all";
    let footer="";

    //Déclare arg_jeu qui contient le nom du jeu + désigne la personne
    if (message.mentions.users.size) {
      if(args[1]){arg_jeu=args[1];}
      taggedUser=message.mentions.users.first();
    }else{
      if(args[0]){arg_jeu=args[0];}
    }

    //Vérifie que le nom du jeu est valide '<all|nom du jeu>'
    if(arg_jeu.length<=1 && !arg_jeu==="all"){ //[à modifier] Vérifier qu'ils fait partie de la liste des jeux (aka jeux.json)
      return message.channel.send(custom_embed.ToEmbedWarning("Nom de jeu invalide"));
    }
    if(taggedUser.id==="807667723151605822"){footer="Comment sa j'ai tricher 🙄";}//Le bot à un score innateignable !
    else{footer="Nous avons en fasse un grand *G@M3R* !";}

    //Vérifie que le fichier exite
    if(custom_file.IsFileExist(`commands/jeux/score/${taggedUser.username}.json`)===true){
      //Si all on affiche tout les scores
      if(arg_jeu==="all"){showAllScore(taggedUser,footer);}
      //Sinon on affiche le score que d'un seul jeu
      else{showOneScore(taggedUser,arg_jeu,footer);}
    //Si le fichier n'existe pas et c'est que l'utilisateur n'as pas de score !
    }else{
      const MsgEmbed = new Discord.MessageEmbed()
        .setThumbnail(taggedUser.displayAvatarURL({ format: "png", dynamic: false }))
        .setTitle('Liste des Scores')
        .setDescription("Félicitation (ou pas ?)\nVous n'avez aucun score pour l'instant !")
        .setColor(blue)
        .setFooter("Je vois qu'on n'aime pas trop jouer ...")
      return message.channel.send(MsgEmbed);
    }

  }
}
