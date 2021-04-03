module.exports = {
  name:'show',
  category:'Affichage',
  description: "Permet d'afficher toute sorte d'information",
  usage: '+show <score|warn|bug|demande|report>',
  usage2: '+show score @user <all|nom du jeu>\n+show warn @user <all>\n+show <demande|bug|report>',
  args: true,
  execute (message,args,client){

    //Ajout des modules//////////////////////////////////////////////////////////////////////////////////////////////
      const Discord= require('discord.js')
      const custom_file = require('../../MyModule/file.js');
      const custom_embed = require('../../MyModule/embed.js');
      const custom_score = require('../../MyModule/score.js');
      const {blue}=require('../../config.json');
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Vérifier les arguments (Général)///////////////////////////////////////////////////////////////////////////////
      if(!args[0].match(/(score|warn|bug|demande|report)/)){
        return message.channel.send(custom_embed.ToEmbedWarning(`Argument \`${args[0]}\` non valide`));
      }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    //Appel des fonction//////////////////////////////////////////////////////////////////////////////////////
      if(args[0]==="score"){return Score();}
      else if(args[0]==="warn"){return Warn();}
      else if(args[0].match(/(bug|demande|report)/)){return Report();}
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Afficher score/////////////////////////////////////////////////////////////////////////////////////////
      function Score(){
        let taggedUser=getTaggedUser();
        if(taggedUser==null){
          return;
        }else if(!args[2]){
          return message.channel.send(custom_embed.ToEmbedWarning("Veuillez spécifier un jeux"));
        }

        let footer="";
        let content="";

        if(taggedUser.id==="807667723151605822"){footer="Comment sa j'ai tricher 🙄";}//Le bot à un score innateignable !
        else{footer="Nous avons en fasse un grand *G@M3R* !";}

        const MsgNoScore = new Discord.MessageEmbed()
          .setTitle('Liste des Scores')
          .setDescription("Félicitation (ou pas ?)\nVous n'avez aucun score pour l'instant !")
          .setColor(blue)
          .setFooter("Je vois qu'on n'aime pas trop jouer ...")

        if(args[2]==="all"){  //Si all on affiche tout les scores
          content=custom_score.showAllScore(taggedUser,footer);
        }else{  //Sinon on affiche le score que d'un seul jeu
          content=custom_score.showOneScore(taggedUser,args[2],footer);
        }

        if(content===null){
            return message.channel.send(MsgNoScore);
        }else{
            return message.channel.send(content);
        }

      }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Afficher Warn////////////////////////////////////////////////////////////////////////////////////////

      //Général/////////////////////////////////////////////////////////////////
        function Warn(){
          let taggedUser=getTaggedUser();

          if(taggedUser==null){
            return;
          }

          const MsgNoWarn = new Discord.MessageEmbed()
            .setThumbnail(taggedUser.displayAvatarURL({ format: "png", dynamic: false }))
            .setTitle('Liste des Warns')
            .setDescription("Félicitation tu n'as pas (encore) été warn")
            .setColor(blue)
            .setTimestamp()
            .setFooter("Tu es gentil !")

          let listwarn = custom_file.loadJSON(`data/listwarn.json`);
          if(listwarn === null){return MsgNoWarn;}

          let user_index=search_user_by_id(taggedUser.id,listwarn);
          if(user_index === null){return MsgNoWarn;}

          let reply="";
          let start_index;
          let warnSize=listwarn.userlist[user_index].infraction.length-1;

          if(args[2]==="all"){
            let MsgBody;
            let nbMessage=Math.round(warnSize/5);
            message.channel.send(custom_embed.ToEmbed("Merci de ne **spammer** la commande car en cas d'utilisations intensive, elle (peut) demande beaucoup de ressources !"));

            //HEAD
            for(let i=0;i<5;i++){
              reply+=`**❯ N°${i} | ${listwarn.userlist[user_index].infraction[i].date} | <@${listwarn.userlist[user_index].infraction[i].from}>**\n`;
              reply+=`*${listwarn.userlist[user_index].infraction[i].raison}*\n\n`;
            }
            let MsgHead = new Discord.MessageEmbed()
              .setTitle('Liste des Warns')
              .setDescription(reply)
              .setColor(blue)
            message.author.send(MsgHead);
            reply="";

            //BODY
            for(let j=1;j<nbMessage-1;j++){
              for(let i=j*5;i<j*5+5;i++){
                reply+=`**❯ N°${i} | ${listwarn.userlist[user_index].infraction[i].date} | <@${listwarn.userlist[user_index].infraction[i].from}>**\n`;
                reply+=`*${listwarn.userlist[user_index].infraction[i].raison}*\n\n`;
              }
              MsgBody = new Discord.MessageEmbed()
                .setDescription(reply)
                .setColor(blue)
              message.author.send(MsgBody);
              reply="";
            }

            //END
            for(let i=(nbMessage-1)*5;i<warnSize;i++){
              reply+=`**❯ N°${i} | ${listwarn.userlist[user_index].infraction[i].date} | <@${listwarn.userlist[user_index].infraction[i].from}>**\n`;
              reply+=`*${listwarn.userlist[user_index].infraction[i].raison}*\n\n`;
            }
            let MsgEnd = new Discord.MessageEmbed()
              .setDescription(reply)
              .setColor(blue)
              .setFooter("C'est pas bien d'être méchant - Naruto")
            message.author.send(MsgEnd);

          }else{
            if(warnSize<5){start_index=0;}
            else{start_index=warnSize-5;}

            for(let i=warnSize;i>start_index;i--){
              reply+=`**❯ N°${i} | ${listwarn.userlist[user_index].infraction[i].date} | <@${listwarn.userlist[user_index].infraction[i].from}>**\n`;
              reply+=`*${listwarn.userlist[user_index].infraction[i].raison}*\n\n`;
            }

            const MsgWarn = new Discord.MessageEmbed()
              .setThumbnail(taggedUser.displayAvatarURL({ format: "png", dynamic: false }))
              .setTitle('Liste des Warns')
              .setDescription(reply)
              .setColor(blue)
              .setTimestamp()
              .setFooter("C'est pas bien d'être méchant - Naruto")

            message.channel.send(MsgWarn);
          }
        }
      //////////////////////////////////////////////////////////////////////////

      //Cherche et renvoie l'indice de l'utilisateur////////////////////////////
        function search_user_by_id(id,listwarn){
          for(let i=0;i<listwarn.userlist.length;i++){
            if(listwarn.userlist[i].user === id){return i;}
          }
          return null;
        }
      //////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Afficher Report////////////////////////////////////////////////////////////////////////////////////////

      //Général/////////////////////////////////////////////////////////////////
        function Report(){
          const path='data/report.json';
          let thumbnail="",title="",reply="",footer="",start_index;

          let listreport=custom_file.loadJSON(path);

          if(listreport===null){
            title='Liste des Reports';
            reply="La liste est vide !";
            footer="Attention à ne pas flood les Reports";

          }else if(args[0]==="report"){
            title='Liste des Reports';
            footer="Attention à ne pas flood les Reports";
            reply="❯ **Bug**\n";
            reply+=bug(listreport);
            reply+="\n❯ **Demande**\n";
            reply+=demande(listreport);

          }else if(args[0]==="demande"){
            thumbnail="https://cdn.discordapp.com/attachments/813753518799192095/815644965681889311/plus.png";
            title='Liste des Demandes';
            footer="Attention à ne pas flood les Demandes";
            reply=demande(listreport);

          }else{
            thumbnail="https://cdn.discordapp.com/attachments/813753518799192095/815644950691708979/malware.png";
            title='Liste des Bugs';
            footer="Attention à ne pas flood les Bugs";
            reply=bug(listreport);
          }

          const Msg = new Discord.MessageEmbed()
            .setThumbnail(thumbnail)
            .setTitle(title)
            .setDescription(reply)
            .setColor(blue)
            .setFooter(footer)
          return message.channel.send(Msg);
        }
      //////////////////////////////////////////////////////////////////////////

      //Renvoie un message contenant tout les demandes//////////////////////////
        function demande(listreport){
          let start_index,reply="";
          let demande_size=listreport.demande.length;

          if(demande_size===0){
            return "La liste des demandes est vide";
          }else if(demande_size===1){
            return `\n**N°0** | ${listreport.demande[0].date} ${listreport.demande[0].heure} | <@${listreport.demande[0].from}>\n${listreport.demande[0].texte}\n`;
          }else if(demande_size<=5){
            start_index=0;
          }else{
            start_index=demande_size-6;
          }

          for(let i=demande_size-1;i>=start_index;i--){
            reply+=`\n**N°${i}** | ${listreport.demande[i].date} ${listreport.demande[i].heure} | <@${listreport.demande[i].from}>\n${listreport.demande[i].texte}\n`;
          }

          return reply;
        }
      //////////////////////////////////////////////////////////////////////////

      //Renvoie un message contenant tout les bugs//////////////////////////////
        function bug(listreport){
          let start_index,reply="";
          let bug_size=listreport.bug.length;

          if(bug_size===0){
            return "La liste des bugs est vide";
          }else if(bug_size===1){
            return `\n**N°0** | ${listreport.bug[0].date} ${listreport.bug[0].heure} | <@${listreport.bug[0].from}>\n${listreport.bug[0].texte}\n`;
          }else if(bug_size<=5){
            start_index=0;
          }else{
            start_index=bug_size-6;
          }

          for(let i=bug_size-1;i>=start_index;i--){
            reply+=`\n**N°${i}** | ${listreport.bug[i].date} ${listreport.bug[i].heure} | <@${listreport.bug[i].from}>\n${listreport.bug[i].texte}\n`;
          }

          return reply;
        }
      //////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

  }
}
