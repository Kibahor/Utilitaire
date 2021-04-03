module.exports = {
  name:'chifoumi',
  aliases: 'pfc',
  category:'Jeux',
  description: 'Pierre Feuille Ciseaux',
  usage: '+chifoumi <pierre|feuille|ciseaux>',
  args: true,

  execute(message,args){

    //Ajout des modules//////////////////////////////////////////////////////////////////////////////////////////////
      const Discord = require('discord.js');
      const custom_embed = require('../../MyModule/embed.js');
      const custom_score = require('../../MyModule/score.js');
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Début du programme/////////////////////////////////////////////////////////////////////////////////////////////

      let answer="";
      let arg=args[0].trim().toLowerCase();
      const perdu="\tJ'ai perdu <:cry:812013791951716352>";
      const gagner="\tJ'ai gagner !";
      const nom_jeu="chifoumi";

      if (!arg.match(/(feuille|pierre|ciseaux)/)){return message.channel.send(custom_embed.ToEmbedWarning(`L'argument \`${arg}\` n'est pas valide !`));}

      switch(Math.floor(Math.random() * 3)) {
        case 0: answer="pierre"; break;
        case 1: answer="feuille"; break;
        case 2: answer="ciseaux"; break;
      }

      let reply=`**[${arg} | ${answer}]**`;

      if(answer===arg){reply+="\tÉgalité !";}

      else if(arg==="pierre"  && answer==="ciseaux"){reply+=perdu;custom_score.setScore(message.author,nom_jeu,1);}
      else if(arg==="feuille"  && answer==="pierre"){reply+=perdu;custom_score.setScore(message.author,nom_jeu,1);}
      else if(arg==="ciseaux" && answer==="feuille"){reply+=perdu;custom_score.setScore(message.author,nom_jeu,1);}

      else if(answer==="pierre" && arg==="ciseaux"){reply+=gagner;custom_score.setScore(message.author,nom_jeu,-1);}
      else if(answer==="feuille" && arg==="pierre"){reply+=gagner;custom_score.setScore(message.author,nom_jeu,-1);}
      else if(answer==="ciseaux"&& arg==="feuille"){reply+=gagner;custom_score.setScore(message.author,nom_jeu,-1);}


      return message.channel.send(custom_embed.ToEmbed1("Chifoumi",reply));
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  }
}
