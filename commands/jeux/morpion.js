module.exports = {
  name:'morpions',
  aliases: ['mp','tictactoe','ttt'],
  category:'Jeux',
  description: 'Permet de jouer à Tic Tac Toe ou Morpions comme un bon français le dirais\n⚠️Attention au bout de 5 min la partie est arrêté',
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
    let actual_letter;
    let tour=1;

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
      /*
      if(player.id===message.author.id){actual_letter=letter.O2}
      else{actual_letter=letter.X}
      */
      function testPossibility(case1,case2,case3){
        return (modified_number[case1-1] === actual_letter &&
                modified_number[case2-1] === actual_letter &&
                modified_number[case3-1] === actual_letter)
      }

      return (testPossibility(1,2,3)||
              testPossibility(4,5,6)||
              testPossibility(7,8,9)||
              testPossibility(2,5,8)||
              testPossibility(3,6,9)||
              testPossibility(1,5,9)||
              testPossibility(3,5,7)||
              testPossibility(1,4,7))
    }


    //Choisis aléatoirement le joueur
    switch(Math.round(Math.random())){
      case 0:
        player=message.author
        actual_letter=letter.X
        break;
      case 1:
        player=taggedUser
        actual_letter=letter.O2
        break;
    }

    message.channel.send(create_msg(number,`\n${actual_letter} **Choisi ta case**  <@${player.id}> `))
      .then(sentMessage => {

        /*Envoie les réactions*/
        sentMessage.react(letter.X2);
        for(let nb of number){
          sentMessage.react(nb);
        }

        /*Création du collecteur*/
        const filter = (reaction, user) => (user.id === message.author.id || user.id === taggedUser.id);//Seul les deux joueurs active le collecteur
        const collector = sentMessage.createReactionCollector(filter,{ time: 300000 });//5 min et s'arrête

        collector.on('collect',async (reaction, user) => {

            function GameOver(msg){
              sentMessage.reactions.removeAll()
              sentMessage.edit(create_msg(modified_number,msg))
              return collector.stop();
            }

            if(reaction.emoji.name === letter.X2){
              return GameOver(sentMessage,`⛔ **Partie Annulé par** <@${user.id}>`)
            }else if(user.id === player.id){
                let index=modified_number.indexOf(reaction.emoji.name);

                /*Change le joueur*/
                if(player.id===message.author.id){
                  modified_number[index]=letter.X
                  player=taggedUser
                  actual_letter=letter.O2
                }else{
                  modified_number[index]=letter.O2
                  player=message.author
                  actual_letter=letter.X
                }

                /*Déroulement de la partie*/
                if(tour==9){ //Partie Terminé
                  return GameOver("🏁 **Partie Terminé :** Égalité")
                }else if(isVictory(player)){ //Partie Gagné
                  //custom_score.setScore(player,"morpions",1);
                  return GameOver(`🏁 **Partie Terminé :** 👑 <@${player.id}>`)
                }else{ //Passe au prochain tour
                  sentMessage.edit(create_msg(modified_number,`\n${actual_letter} **Choisi ta case** <@${player.id}> `))
                  await reaction.remove()
                }

                tour++
              }
        })

      }).catch(err => console.error(err));
  }
}
