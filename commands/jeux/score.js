module.exports = {
  name:'score',
  category:'Jeux',
  description: "Afficher le score d'un utilisateur",
  usage: '+score @user <all|nom du jeu>',
  args: false,

  execute(message,args,client){
    const Discord= require('discord.js')

    const custom_file = require('../../MyModule/file.js');
    const custom_embed = require('../../MyModule/embed.js');
    const custom_score = require('../../MyModule/score.js');
    const {blue}=require('../../config.json');

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

    const Score=custom_file.loadJSON('commands/jeux/score/score.json');
    //Vérifie que le fichier exite
    if(custom_file.IsFileExist(`commands/jeux/score/score.json`)===true && custom_score.indiceUser(Score,taggedUser.id)!=null){
      //Si all on affiche tout les scores
      if(arg_jeu==="all"){return message.channel.send(custom_score.showAllScore(taggedUser,footer));}
      //Sinon on affiche le score que d'un seul jeu
      else{message.channel.send(custom_score.showOneScore(taggedUser,arg_jeu,footer));}
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
