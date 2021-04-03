//Ajouter l'utilisateur qui a warn
module.exports = {
  name:'warn',
  category:'Modération',
  description: "Permet de d'avertir une personne (sans restrictions)",
  usage: '+warn @user <raison>',
  args: true,

  execute(message,args){
    /*Ajout des modules*/
    const Discord = require('discord.js');
    const fs = require('fs');
    const dateFormat = require('dateformat');
    const chalk = require('chalk');

    const custom_file = require('../../MyModule/file');
    const custom_embed = require('../../MyModule/embed.js');
    const {blue}=require('../../config.json');

    /*Récupére la mention*/
    let taggedUser = message.mentions.users.first();

    /*Fonction qui créé/modifie le fichier user.json de warn*/
    function warn_register(username,raison,date){
      const path=`commands/moderation/warn/${username}.json`;
      if(custom_file.IsFileExist(path)){//Vérifie que le fichier existe bien et le modifie

        let listwarn = JSON.parse(fs.readFileSync(path)); //instancie listwarn à partir du JSON (on le lit et on le convertit en objet)
        listwarn.infraction.push({"date": date ,"raison": raison});//Ajout d'une infraction
        fs.writeFileSync(path, JSON.stringify(listwarn));//On convertit listwarn au format JSON et on l'enregistre

        console.log(chalk.yellow(`[MODERATION] ${path} à bien était modifié !`))

      }else{//Sinon c'est que le fichier n'existe pas donc on le créer

        let user = {"user": username,
                    "infraction": [
                      {"date": date,"raison": raison}
                    ]};
        fs.writeFileSync(path, JSON.stringify(user));

        console.log(chalk.yellow(`[MODERATION] ${path} à bien été créé !`));

      }
    }

    //On vérifie qu'il y a bien les bons arguments
    if (!message.mentions.users.size) {
	     return message.reply(custom_embed.ToEmbedWarning("Tu dois mentionner quelqu'un !"));
    }else if(args[1]== null){
        return message.reply(custom_embed.ToEmbedWarning("Tu dois donner une raison !"))
    }

    /*Traitement des données*/
    let raison="";

    if(taggedUser.id === "807667723151605822"){
      taggedUser=message.author;
      raison="À voulu donner un avertissement au sacro-saint bot Utilitaire !"
    }else if(taggedUser.id === message.author.id){
      raison=`${taggedUser.username} à décider de s'avertir lui même ! Aurait-il perdu toute sa raison ?`;
    }else{
      for(let i=1;i<args.length;i++){raison=raison+args[i]+' ';}
    }

    if(raison.trim().length>200){return message.channel.send(custom_embed.ToEmbedWarning("Le message est trop long (200 charactéres max)")); } //1024/5=204 comme j'affiche 5 war à la fois je ne dépasse pas la limite du embed

    warn_register(taggedUser.username,raison.trim(),dateFormat(new Date(),"dd/mm/yy"));

    const MsgEmbed = new Discord.MessageEmbed()
      .setThumbnail(taggedUser.displayAvatarURL({ format: "png", dynamic: false }))
      .setTitle(`Un avertissement pour ${taggedUser.username}`)
      .setDescription(`**Raison :** ${raison}`)
      .setColor(blue)
      .setTimestamp()
      .setFooter('C\'est pas bien d\'être méchant - Naruto')
    return message.channel.send(MsgEmbed);
  }
}
