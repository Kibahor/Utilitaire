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

    function search_user_by_id(id,listwarn){
      for(let i=0;i<listwarn.userlist.length;i++){
        if(listwarn.userlist[i].user === id){return i;}
      }
      return null;
    }

    /*Fonction qui créé/modifie le fichier user.json de warn*/
    function warn_register(id,raison,date){
      const path=`commands/moderation/warn/listwarn.json`;
      if(custom_file.IsFileExist(path)){//Vérifie que le fichier existe bien et le modifie

        let listwarn = JSON.parse(fs.readFileSync(path)); //instancie listwarn à partir du JSON (on le lit et on le convertit en objet)
        let user_index=search_user_by_id(id,listwarn);
        if(user_index===null){return custom_embed.ToEmbedWarning(`user ${id} n'as pas été trouvé !`);}
        listwarn.userlist[user_index].infraction.push({"date": date ,"raison": raison,"from": taggedUser.id});//Ajout d'une infraction
        fs.writeFileSync(path, JSON.stringify(listwarn));//On convertit listwarn au format JSON et on l'enregistre

        console.log(chalk.yellow(`[MODERATION] ${path} à bien était modifié !`))

      }else{//Sinon c'est que le fichier n'existe pas donc on le créer

        let listwarn = {"userlist":[
                          {"user": id,
                          "infraction": [
                            {"date": date,"raison": raison,"from": message.author.id}
                          ]}
                        ]}
        fs.writeFileSync(path, JSON.stringify(listwarn));
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

    if(taggedUser.id === "813742071567351849"){
      taggedUser=message.author;
      raison="À voulu donner un avertissement au sacro-saint bot Utilitaire !"
    }else if(taggedUser.id === message.author.id){
      raison=`${taggedUser.username} à décider de s'avertir lui même ! Aurait-il perdu toute sa raison ?`;
    }else{
      for(let i=1;i<args.length;i++){raison=raison+args[i]+' ';}
    }

    if(raison.trim().length>200){return message.channel.send(custom_embed.ToEmbedWarning("Le message est trop long (200 charactéres max)")); } //1024/5=204 comme j'affiche 5 war à la fois je ne dépasse pas la limite du embed

    warn_register(taggedUser.id,raison.trim(),dateFormat(new Date(),"dd/mm/yy"));

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
