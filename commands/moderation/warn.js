module.exports = {
  name:'warn',
  aliases: '',
  description: "Permet de d'avertir une personne (sans restrictions)",
  usage: '+warn @user <raison>',
  args: true,

  execute(message,args){
    /*Ajout des modules*/
    const Discord = require('discord.js');
    const fs = require('fs');
    const dateFormat = require('dateformat');
    const chalk = require('chalk');

    const custom = require('../../myfunction.js');

    /*Récupére la mention*/
    let taggedUser = message.mentions.users.first();

    /*Fonction qui créé/modifie le fichier user.json de warn*/
    function warn_register(username,raison,date){
      if(custom.IsFileExist(`commands/warn/${username}.json`)){//Vérifie que le fichier existe bien et le modifie

        let listwarn = JSON.parse(fs.readFileSync(`commands/warn/${username}.json`)); //instancie listwarn à partir du JSON (on le lit et on le convertit en objet)
        listwarn.infraction.push({"date": date ,"raison": raison});//Ajout d'une infraction
        fs.writeFileSync(`commands/warn/${username}.json`, JSON.stringify(listwarn));//On convertit listwarn au format JSON et on l'enregistre

        console.log(chalk.yellow(`[WARN] commands/warn/${username}.json à bien était modifié !`))

      }else{//Sinon c'est que le fichier n'existe pas donc on le créer

        let user = {"user": username,
                    "infraction": [
                      {"date": date,"raison": raison}
                    ]};
        fs.writeFileSync(`commands/warn/${username}.json`, JSON.stringify(user));

        console.log(chalk.yellow(`[WARN] commands/warn/${username}.json à bien été créé !`));

      }
    }

    //On vérifie qu'il y a bien les bons arguments
    if (!message.mentions.users.size) {
	     return message.reply(custom.ToEmbedWarning("Tu dois mentionner quelqu'un !"));
    }else if(args[1]== null){
        return message.reply(custom.ToEmbedWarning("Tu dois donner une raison !"))
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

    warn_register(taggedUser.username,raison.trim(),dateFormat(new Date(),"dd/mm/yy"));

    const MsgEmbed = new Discord.MessageEmbed()
      .setThumbnail(taggedUser.displayAvatarURL({ format: "png", dynamic: false }))
      .setTitle(`Un avertissement pour ${taggedUser.username}`)
      .setDescription(`**Raison :** ${raison}`)
      .setColor('#3669d9')
      .setTimestamp()
      .setFooter('C\'est pas bien d\'être méchant - Naruto')
    return message.channel.send(MsgEmbed);
  }
}
