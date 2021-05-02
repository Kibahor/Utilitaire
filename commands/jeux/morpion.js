module.exports = {
  name:'morpions',
  aliases: ['mp','tictactoe','ttt'],
  category:'Jeux',
  description: 'Permet de jouer à Tic Tac Toe ou Morpions comme un bon français le dirais',
  usage: '+morpion @player2',
  args: true,

  execute(message,args,client){ //Pas oublier de remetrre de vérifier les arguments

    //Ajout des modules//////////////////////////////////////////////////////////////////////////////////////////////
      const Discord = require('discord.js');
      const custom_embed = require('../../MyModule/embed.js');
      const custom_score = require('../../MyModule/score.js');
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Vérifier les arguments/////////////////////////////////////////////////////////////////////////////////////////
      taggedUser=message.mentions.users.first();
      if(!message.mentions.users.size){
        return message.channel.send(custom_embed.ToEmbedWarning("Tu dois mentionné 1 personne"));
      }else if(taggedUser.bot){
        return message.channel.send(custom_embed.ToEmbedWarning("Désolé il n'est pas possible de jouer avec un bot"));
      }else if(taggedUser.id===message.author.id){
        return message.channel.send(custom_embed.ToEmbed("Tu n'as pas vraiment aucun ami avec qui jouer ?"));
      }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let letter={A:"🇦 ", C:"🇨 ", E:"🇪 ", I:"🇮 ",O:"🇴 ",O2:"🅾️" ,T:"🇹 ", X:"❎",X2:"❌"};
    let number=["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"];
    let modified_number=number
    let player;
    let XorO_letter;
    let tour=0;

    function create_msg(number,end_msg){
      let msg=letter.T+letter.I+letter.C+"⬛"+letter.T+letter.A+letter.C+"⬛"+letter.T+letter.O+letter.E+"\n\n"
      msg+="⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n"
      for(let i=0;i<9;i=i+3){
        msg+=`⬛⬛⬛⬛${number[i]}⬛${number[i+1]}⬛${number[i+2]}⬛⬛⬛⬛\n`
        msg+="⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n"
      }
      msg+="\n"+end_msg
      return custom_embed.ToEmbed(msg);
    }

    //Choisis aléatoirement le joueur
    switch(Math.round(Math.random())){
      case 0:
        player=message.author
        XorO_letter=letter.X
        break;
      case 1:
        player=taggedUser
        XorO_letter=letter.O2
        break;
    }

    message.channel.send(create_msg(number,`\n${XorO_letter} **Choisi ta case**  <@${player.id}> `))
      .then(sentMessage => {

        sentMessage.react(letter.X2);
        for(let nb of number){
          sentMessage.react(nb);
        }

        const filter = (reaction, user) => (number.includes(reaction.emoji.name) || reaction.emoji.name===letter.X2) && user.id !== sentMessage.author.id;
        const collector = sentMessage.createReactionCollector(filter,{ time: 300000 });//5 min et s'arrête

        collector.on('collect',async (reaction, user) => {
            if(user.id != player.id){return}
            tour++
            function isVictory(player){
              /*Toute les possibilités
              ["🅾️","🅾️","🅾️","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"]
              ["1️⃣","2️⃣","3️⃣","🅾️","🅾️","🅾️","7️⃣","8️⃣","9️⃣"]
              ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","🅾️","🅾️","🅾️"]
              ["1️⃣","🅾️","3️⃣","4️⃣","🅾️","6️⃣","7️⃣","🅾️","9️⃣"]
              ["1️⃣","2️⃣","🅾️","4️⃣","5️⃣","🅾️","7️⃣","8️⃣","🅾️"]
              ["🅾️","2️⃣","3️⃣","4️⃣","🅾️","6️⃣","7️⃣","8️⃣","🅾️"]
              ["1️⃣","2️⃣","🅾️","4️⃣","🅾️","6️⃣","🅾️","8️⃣","9️⃣"]
              ["🅾️","2️⃣","3️⃣","🅾️","5️⃣","6️⃣","🅾️","8️⃣","9️⃣"]*/

              if(player.id===message.author.id){actual_letter=letter.O2}
              else{actual_letter=letter.X}

              return ((modified_number[0] === actual_letter && modified_number[1] === actual_letter && modified_number[2] === actual_letter)||
              (modified_number[3] === actual_letter && modified_number[4] === actual_letter && modified_number[5] === actual_letter)||
              (modified_number[6] === actual_letter && modified_number[7] === actual_letter && modified_number[8] === actual_letter)||
              (modified_number[1] === actual_letter && modified_number[4] === actual_letter && modified_number[7] === actual_letter)||
              (modified_number[2] === actual_letter && modified_number[5] === actual_letter && modified_number[8] === actual_letter)||
              (modified_number[0] === actual_letter && modified_number[4] === actual_letter && modified_number[8] === actual_letter)||
              (modified_number[2] === actual_letter && modified_number[4] === actual_letter && modified_number[6] === actual_letter)||
              (modified_number[0] === actual_letter && modified_number[3] === actual_letter && modified_number[6] === actual_letter))
            }

            function GameOver(msg){
              sentMessage.reactions.removeAll()
              sentMessage.edit(create_msg(modified_number,msg))
              return collector.stop(); // Delete the collector.
            }

            if(reaction.emoji.name === letter.X2){

              let msg=`⛔ **Partie Annulé par** <@${user.id}>`
              return GameOver(msg)

            }else{

                let index=modified_number.indexOf(reaction.emoji.name);

                if(player.id===message.author.id){//Change le joueur
                  modified_number[index]=letter.X
                  player=taggedUser
                  XorO_letter=letter.O2
                }else{
                  modified_number[index]=letter.O2
                  player=message.author
                  XorO_letter=letter.X
                }

                if(tour==9){ //Partie Terminé
                  let msg="🏁 **Partie Terminé :** Égalité"
                  return GameOver(msg)
                }else if(isVictory(player)){
                  custom_score.setScore(player,"morpions",-1);

                  //Inverse le joueur
                  if(player.id===message.author.id){player=taggedUser}
                  else{player=message.author}

                  custom_score.setScore(player,"morpions",1);

                  let msg=`🏁 **Partie Terminé :** 👑 <@${player.id}>`
                  return GameOver(msg)
                }else{
                  let msg=`\n${XorO_letter} **Choisi ta case** <@${player.id}> `
                  sentMessage.edit(create_msg(modified_number,msg))
                  await reaction.remove()
                }
              }
        })

      }).catch(err => console.error(err));
  }
}
