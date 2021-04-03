module.exports = {
  name:'chifoumi',
  aliases: 'pfs',
  description: 'pierre papier ciseaux',
  usage: '+chifoumi <pierre|papier|ciseaux>',
  args: true,

  execute(message,args,client){
    const Discord = require('discord.js');
    const custom = require('../../myfunction.js');

    let answer="";
    let arg=args[0].trim().toLowerCase();
    let perdu="\tJ'ai perdu <:cry:812013791951716352>";
    let gagner="\tJ'ai gagner !";

    switch(Math.floor(Math.random() * 3)) {
      case 0: answer="pierre"; break;
      case 1: answer="papier"; break;
      case 2: answer="ciseaux"; break;
    }

    let reply=`**[${arg} | ${answer}]**`;

    if(answer===arg){reply+="\tÉgalité !";}

    else if(arg==="pierre"  && answer==="ciseaux"){reply+=perdu;}
    else if(arg==="papier"  && answer==="pierre"){reply+=perdu;}
    else if(arg==="ciseaux" && answer==="papier"){reply+=perdu;}

    else if(answer==="pierre" && arg==="ciseaux"){reply+=gagner;}
    else if(answer==="papier" && arg==="pierre"){reply+=gagner;}
    else if(answer==="ciseaux"&& arg==="papier"){reply+=gagner;}

    return message.channel.send(custom.ToEmbed1("Chifoumi",reply));
  }
}
