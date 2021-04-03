module.exports = {
  name:'remove',
  aliases: 'del',
  category:'Modération',
  description: '[Admin Only] Permet de supprimer toute sorte de chose',
  usage: "+remove <score|warn|demande|bug> ...",
  usage2: "+remove score <id|@user> nom du jeu\n+remove warn <id|@user> numéro\n+remove <demande|bug> numéro",
  permission: 'ADMINISTRATOR',
  args: true,
  execute (message,args,client){

    //Ajout des modules/////////////////////////////////////////////////////////////////////////////////////
      const Discord= require('discord.js')
      const custom_embed = require('../../MyModule/embed.js');
      const custom_score = require('../../MyModule/score.js');
      const custom_file = require('../../MyModule/file.js');
      const {blue}=require('../../config.json');
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Vérifier les arguments (Général)///////////////////////////////////////////////////////////////////////////////
      const regCommande=/(score|warn|demande|bug)/;

      if(!args[0].match(regCommande)){  //On vérifie le premier argument (score/warn/demande/bug)
        return message.channel.send(custom_embed.ToEmbedWarning(`\`${args[0]}\` n'est pas valide\n`));
      }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Récupérer User/////////////////////////////////////////////////////////////////////////////////////////////////
      function getTaggedUser(){
        let taggedUser;

        if(!message.mentions.users.size) { //Si il n'y as pas de mention donc c'est un ID
          if(isNaN(args[1])){
            message.channel.send(custom_embed.ToEmbedWarning("Tu dois mentionner quelqu'un"));
            return null;
          }else{
            taggedUser = client.users.cache.get(args[1]); //On obtient l'utilisateur grâce à l'ID
            if(!taggedUser){  //Si pas trouver
              message.channel.send(custom_embed.ToEmbedWarning("L'ID renseigner ne correspond à aucun utilisateur"));
              return null;
            }
          }
        }else{  //Il y a une mention donc c'est pas un ID
          taggedUser=message.mentions.users.first();
          if(!taggedUser){
            message.channel.send(custom_embed.ToEmbedWarning("Tu dois mentionner quelqu'un"))
            return null;
          }
        }
        return taggedUser;
      }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Appel des fonctions////////////////////////////////////////////////////////////////////////////////////////////
      if(args[0]==="score"){return Score();}
      else if(args[0]==="warn"){return Warn();}
      else if(args[0]==="demande" || args[0]==="bug"){return Demande_Bug();}
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Score/////////////////////////////////////////////////////////////////////////////////////////////////////////
      function Score(){
        const regjeux=/(chifoumi|pfc)/;
        let reply;
        let taggedUser=getTaggedUser();

        if(taggedUser==null){
          return;
        }

        /*Vérifier les arguments*/
        if(!args[2]){
          return message.channel.send(custom_embed.ToEmbedWarning("Aucun jeu spécifié"));
        }else if(!args[2].match(regjeux)){ //Si c'est un jeu alors on vérifie que sa correspond à un jeu existant
          return message.channel.send(custom_embed.ToEmbedWarning(`\`${args[2]}\` n'est pas un nom de jeu valide`));
        }

        /*Début du programme*/
        let arg_jeu=args[2];

        if(custom_score.removeScore(taggedUser,arg_jeu)){
          if(arg_jeu==="all"){
            reply=`Tout vos scores ont bien été supprimer !`;
          }else{
            reply=`Votre Score sur le jeu \`${arg_jeu}\` à bien été supprimer !`;
          }
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
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Warn///////////////////////////////////////////////////////////////////////////////////////////////////////////
      function Warn(){
        const path=`data/listwarn.json`;
        let listwarn=custom_file.loadJSON(path); //On charge le fichier

        /*Vérifier les arguments*/
        if(isNaN(args[2])){ //On vérifie que c'est bien un nombre
          return message.channel.send(custom_embed.ToEmbedWarning(`\`${args[2]}\` n'est pas un numéro`));
        }else if(listwarn==null){
          return message.channel.send(custom_embed.ToEmbedWarning("Impossible d'enlever le "+args[0]+" car le serveur ne contient aucun "+args[0]));
        }

        /*Début du programme*/
        let userIndex=search_user_by_id(taggedUser.id,listwarn); //On recherche l'index de l'utilisateur
        if(!listwarn.userlist[userIndex].infraction[args[2]]){ //On vérifie que le warn existe
          return message.channel.send(custom_embed.ToEmbedWarning("Le warn n'existe pas"));
        }

        listwarn.userlist[userIndex].infraction.splice(args[2], 1); //On supprime le warn
        if(custom_file.registerJSON(path,listwarn)){ //On enregistre la liste des warns modifier
          return message.channel.send(custom_embed.ToEmbed("Le warn à bien été supprimer"));
        }else{
          return message.channel.send(custom_embed.ToEmbedWarning("Une erreur est survenue lors de la suppression du warn"));
        }
      }

      function search_user_by_id(id,listwarn){
        for(let i=0;i<listwarn.userlist.length;i++){
          if(listwarn.userlist[i].user === id){return i;}
        }
        return null;
      }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Demande/Bug////////////////////////////////////////////////////////////////////s////////////////////////////////
      function Demande_Bug(){
        const path='data/report.json';
        let listreport=custom_file.loadJSON(path);

        /*Vérifier les arguments*/
        if(!args[1]){
          return message.channel.send(custom_embed.ToEmbedWarning("Veuillez mettre le numéro du "+args[0]));
        }else if(isNaN(args[1])){ //On vérifie que c'est bien un nombre
          return message.channel.send(custom_embed.ToEmbedWarning(`\`${args[1]}\` n'est pas un numéro`));
        }else if(listreport==null){
          return message.channel.send(custom_embed.ToEmbedWarning("Impossible d'enlever le "+args[0]+" car le serveur ne contient aucun "+args[0]));
        }

        if(args[0]=="bug"){
          listreport.bug.splice(args[2],1);
          if(custom_file.registerJSON(path,listreport)){
            return message.channel.send(custom_embed.ToEmbed("Le bug a été supprimer"))
          }else{
            return message.channel.send(custom_embed.ToEmbed("Une erreur est survenue lors de la suppression du bug"));
          }
        }else{
          listreport.demande.splice(args[2],1);
          if(custom_file.registerJSON(path,listreport)){
            return message.channel.send(custom_embed.ToEmbed("La demande a été supprimer"))
          }else{
            return message.channel.send(custom_embed.ToEmbed("Une erreur est survenue lors de la suppression de la demande"));
          }
        }

      }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  }
}
