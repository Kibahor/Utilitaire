module.exports = {
  name:'report',
  aliases: 'r',
  category:'Modération',
  description: 'Permet de report un bug ou une demande',
  usage: '+report <demande|bug> texte',
  args: true,
  execute (message,args){

    //Ajout des modules/////////////////////////////////////////////////////////////////////////////////////
      const custom_embed=require('../../MyModule/embed.js');
      const custom_file=require('../../MyModule/file.js');
      const dateFormat = require('dateformat');
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Début du programme/////////////////////////////////////////////////////////////////////////////////////////////
      if(!args[0].match(/(demande|bug)/)){message.channel.send(custom_embed.ToEmbedWarning("Vous pouvez report uniquement un `bug` ou une `demande` !"));return;}
      else if(!args[1]){message.channel.send(custom_embed.ToEmbedWarning("Veuillez donner la raison !"));return;}

      let texte="";
      for(let i=1;i<args.length;i++){texte+=args[i]+' ';}

      if(report_register(texte,args[0])){
        message.channel.send(custom_embed.ToEmbed(`Votre ${args[0]} à bien été enregistrer !`));
      }else{
        message.channel.send(custom_embed.ToEmbed(`Nous n'avons pas pu enregistrer votre ${args[0]} !`));
      }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Fonctions/////////////////////////////////////////////////////////////////////////////////////////

      //Modifie le fichier report.json//////////////////////////////////////////
        function report_register(texte,type_of_report){
          const path='data/report.json';
          const date=dateFormat(new Date(),"dd/mm/yy");
          const heure=dateFormat(new Date(),"isoTime");
          texte=texte.trim();

          let listreport=custom_file.loadJSON(path);
          if(listreport===null){return registerNewReportFile(path,date,heure,texte,type_of_report);}
          if(type_of_report==="bug"){listreport.bug.push({"from": message.author.id,"date":date,"heure":heure,"texte":texte});}
          else{listreport.demande.push({"from": message.author.id,"date":date,"heure":heure,"texte":texte});}

          let sucess=custom_file.registerJSON(path,listreport);
          //if(sucess){console.log(`Fichier ${path} à bien été modifié`);}
          //else{console.log(`Fichier ${path} n'a pas pu été modifié`);}
          return sucess;
        }
      //////////////////////////////////////////////////////////////////////////

      //MCréé le fichier report.json////////////////////////////////////////////
        function registerNewReportFile(path,date,heure,texte,type_of_report){
          report={
            "bug":[],
            "demande":[]
          };
          if(type_of_report==="bug"){report.bug.push({"from": message.author.id,"date":date,"heure":heure,"texte":texte});}
          else{report.demande.push({"from": message.author.id,"date":date,"heure":heure,"texte":texte});}
          let sucess=custom_file.registerJSON(path,report);
          //if(sucess){console.log(`Fichier ${path} à bien été créé`);}
          //else{console.log(`Fichier ${path} n'a pas pu être créé`);}
          return sucess;
        }
      //////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  }
}
