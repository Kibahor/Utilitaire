module.exports = {
  name:'morpions',
  aliases: ['mp','tictactoe','ttt'],
  category:'Jeux',
  description: 'Permet de jouer à Tic Tac Toe ou Morpions comme un bon français le dirais',
  usage: '+morpion @player1 @player2',
  usage2: '+morpion @player1 @player2\n+morpion stop',
  args: false,

  execute(message,args){ //Pas oublier de remetrre de vérifier les arguments

    //Ajout des modules//////////////////////////////////////////////////////////////////////////////////////////////
      const Discord = require('discord.js');
      const custom_embed = require('../../MyModule/embed.js');
      const custom_score = require('../../MyModule/score.js');
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Vérifier les arguments/////////////////////////////////////////////////////////////////////////////////////////
    /*
      if(message.mentions.users.size != 2){
        return message.channel.send(custom_embed.ToEmbedWarning("Tu dois mentionné 2 personnes"));
      }

      for (let [id, user] of message.mentions.users.entries()){
        if(user.bot){
          return message.channel.send(custom_embed.ToEmbedWarning("Désolé il n'est pas possible de jouer avec un bot"));
        }
      }*/
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      let A="<:regional_indicator_a:836273768782495786> "
      let C="<:regional_indicator_c:836273669130551317> "
      let E="<:regional_indicator_e:836274991129428018> "
      let I="<:regional_indicator_i:836247466775937075> "
      let O="<:o2:836273911729487873> "
      let T="<:regional_indicator_t:836242151708688464> "
      let X="<:regional_indicator_x:836280115234734120>"

      let One="<:one:836277380905041962>"
      let Two="<:two:836277613924319323>"
      let Three="<:three:836277765124784178>"
      let Four="<:four:836277842865946656>"
      let Five="<:five:836277974579150918>"
      let Six="<:six:836278127915040838>"
      let Seven="<:seven:836278371452452894>"
      let Eight="<:eight:836278557432217651>"
      let Nine="<:nine:836278671165227080>"

      title=T+I+C+"  "+T+A+C+"  "+T+O+E+"\n\n"

      transition="              "+"=============\n"
      ligne1="              "+One+"   "+"‖"+"   "+Two+"   "+"‖"+"   "+Three+"\n"
      ligne2="              "+Four+"   "+"‖"+"   "+Five+"   "+"‖"+"   "+Six+"\n"
      ligne3="              "+Seven+"   "+"‖"+"   "+Eight+"   "+"‖"+"   "+Nine+"\n"

      end_msg="\n<:arrow_down:836284510000775228>"+" Choisi ta case"
      grille=ligne1+transition+ligne2+transition+ligne3
      message.channel.send(title + grille+end_msg).then(sentMessage => {
        sentMessage.react("1️⃣")/*
        sentMessage.react("2️⃣")
        sentMessage.react("3️⃣")
        sentMessage.react("4️⃣")
        sentMessage.react("5️⃣")
        sentMessage.react("6️⃣")
        sentMessage.react("7️⃣")
        sentMessage.react("8️⃣")
        sentMessage.react("9️⃣")*/

        //https://stackoverflow.com/questions/57452056/discord-js-how-to-send-a-message-and-collect-reactions-from-it
        //https://discordjs.guide/popular-topics/collectors.html#await-reactions

        const time = 60000 //amount of time to collect for in milliseconds

        async function (message) {
          await message.react("1️⃣")
          const filter = (reaction, user) => {
              return reaction.emoji.name === "1️⃣" && user.id === message.author.id
          };
          const collector = message.createReactionCollector(filter, { time: time });
              collector.on('collect', (reaction, reactionCollector) => {
                   //do stuff
              });
         });

      });
  }
}
