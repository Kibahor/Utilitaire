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

    let letter={A:"🇦 ", C:"🇨 ", E:"🇪 ", I:"🇮 ", O:"🅾️ " ,T:"🇹 ", X:"🇽 "};
    let number=new Array("1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣");

    function create_msg(number){
      let msg=letter.T+letter.I+letter.C+"  "+letter.T+letter.A+letter.C+"  "+letter.T+letter.O+letter.E+"\n\n"
      for(let i=0;i<9;i=i+3){
        msg+=`              ${number[i]}   ‖   ${number[i+1]}   ‖   ${number[i+2]}\n`
        msg+="              =============\n"
      }
      msg=msg.slice(0,-14)//enlève la barre de séparation en trop
      msg+="\n<:arrow_down:836284510000775228> Choisi ta case"
      return msg;
    }

    message.channel.send(create_msg(number))
      .then(sentMessage => {
        for(let nb of number){
          sentMessage.react(nb);
        }
        sentMessage.react
        const filter = (reaction, user) => number.includes(reaction.emoji.name)&& user.id === message.author.id;
        const collector = sentMessage.createReactionCollector(filter, { time: 15000 });
        collector.on('collect', async (reaction, user) => {
          console.log(`Collect reaction ${reaction.emoji.name} from ${user.tag}`)
        });
      });
  }
}
