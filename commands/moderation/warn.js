module.exports = {
  name:'warn',
  category:'Modération',
  description: "Permet de d'avertir une personne (sans restrictions)",
  usage: '+warn <@user|id> raison',
  args: true,

  execute (message,args,client){

    //Ajout des modules/////////////////////////////////////////////////////////////////////////////////////
      const Discord = require('discord.js');
      const dateFormat = require('dateformat');
      const chalk = require('chalk');
      const custom_file = require('../../MyModule/file');
      const custom_embed = require('../../MyModule/embed.js');
      const {blue}=require('../../config.json');
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Vérification des arguments////////////////////////////////////////////////////////////////////////////
      if(args[1]== null){
          return message.channel.send(custom_embed.ToEmbedWarning("Tu dois donner une raison !"))
      }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Récupérer User/////////////////////////////////////////////////////////////////////////////////////////
      let taggedUser;

      if(!message.mentions.users.size) { //Si il n'y as pas de mention donc c'est un ID
        if(isNaN(args[1])){
          return message.channel.send(custom_embed.ToEmbedWarning("Tu dois mentionner quelqu'un !"));
        }else{
          taggedUser = client.users.cache.get(args[1]); //On obtient l'utilisateur grâce à l'ID
          if(!taggedUser){  //Si pas trouver
            return message.channel.send(custom_embed.ToEmbedWarning("L'ID renseigner ne correspond à aucun utilisateur"));
          }
        }
      }else{  //Il y a une mention donc c'est pas un ID
        taggedUser=message.mentions.users.first();
        if(!taggedUser){
          return message.channel.send(custom_embed.ToEmbedWarning("Tu dois mentionner quelqu'un !"));
        }
      }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Traitement des données////////////////////////////////////////////////////////////////////////////////////////
      let raison="";

      if(taggedUser.id === "813742071567351849"){
        taggedUser=message.author;
        raison="À voulu donner un avertissement au sacro-saint bot Utilitaire !"
      }else if(taggedUser.id === message.author.id){
        raison=`${taggedUser.username} à décider de s'avertir lui même ! Aurait-il perdu toute sa raison ?`;
      }else{
        for(let i=1;i<args.length;i++){raison=raison+args[i]+' ';}
      }

      if(raison.trim().length>350){return message.channel.send(custom_embed.ToEmbedWarning("Le message est trop long (350 charactéres max)")); } //1024/5=204 comme j'affiche 5 war à la fois je ne dépasse pas la limite du embed

      warn_register(taggedUser.id,raison.trim(),dateFormat(new Date(),"dd/mm/yy"));

      const MsgEmbed = new Discord.MessageEmbed()
        .setThumbnail(taggedUser.displayAvatarURL({ format: "png", dynamic: false }))
        .setTitle(`Un avertissement pour ${taggedUser.username}`)
        .setDescription(`**Raison :** ${raison}`)
        .setColor(blue)
        .setTimestamp()
        .setFooter('C\'est pas bien d\'être méchant - Naruto')

      return message.channel.send(MsgEmbed);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Fonctions//////////////////////////////////////////////////////////////////////////////////////////////////////

      //créé/modifie le fichier listwarn.json///////////////////////////////////
        function warn_register(id,raison,date){
          const path=`data/listwarn.json`;
          let listwarn = custom_file.loadJSON(path); //instancie listwarn à partir du JSON (on le lit et on le convertit en objet)

          if(listwarn != null){ //Vérifie que le fichier existe bien et le modifie

            let user_index=search_user_by_id(id,listwarn);
            if(user_index===null){return custom_embed.ToEmbedWarning(`user ${id} n'as pas été trouvé !`);}
            listwarn.userlist[user_index].infraction.push({"date": date ,"raison": raison,"from": message.author.id});//Ajout d'une infraction
            custom_file.registerJSON(path,listwarn);  //On convertit listwarn au format JSON et on l'enregistre
            //console.log(chalk.yellow(`[MODERATION] ${id} à bien était modifié !`))

          }else{//Sinon c'est que le fichier n'existe pas donc on le créer

            let listwarn = {"userlist":[
                              {"user": id,
                              "infraction": [
                                {"date": date,"raison": raison,"from": message.author.id}
                              ]}
                            ]}
            custom_file.registerJSON(path,listwarn);
            //console.log(chalk.yellow(`[MODERATION] ${id} à bien été ajouté !`));
          }
        }
      //////////////////////////////////////////////////////////////////////////

      //Cherche et renvoie l'indice de l'utilisateur à partir d'un id///////////
        function search_user_by_id(id,listwarn){
          for(let i=0;i<listwarn.userlist.length;i++){
            if(listwarn.userlist[i].user === id){return i;}
          }
          return null;
        }
      //////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }
}
