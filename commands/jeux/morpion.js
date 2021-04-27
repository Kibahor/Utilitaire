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

    function create_msg(number,username){
      let msg=letter.T+letter.I+letter.C+"⬛"+letter.T+letter.A+letter.C+"⬛"+letter.T+letter.O+letter.E+"\n\n"
      msg+="⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n"
      for(let i=0;i<9;i=i+3){
        msg+=`⬛⬛⬛⬛${number[i]}⬛${number[i+1]}⬛${number[i+2]}⬛⬛⬛⬛\n`
        msg+="⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛\n"
      }
      if(username.includes("Partie Terminé")){
        msg+=`\n🏁 **${username}**`
      }else{
        msg+=`\n<:arrow_down:836284510000775228> Choisi ta case **${username}**`
      }
      return custom_embed.ToEmbed(msg);
    }

    message.channel.send(create_msg(number,message.author.username))
      .then(sentMessage => {

        sentMessage.react(letter.X2);
        for(let nb of number){
          sentMessage.react(nb);
        }

        const filter = (reaction, user) => (number.includes(reaction.emoji.name) || reaction.emoji.name===letter.X2) && user.id !== sentMessage.author.id;
        const collector = sentMessage.createReactionCollector(filter,{ time: 300000 });//5 min et s'arrête
        let player_select=message.author;

        collector.on('collect',async (reaction, user) => {
            //console.log(`Collect reaction ${reaction.emoji.name} from ${user.tag}`)
            if(reaction.emoji.name === letter.X2 && (user.id===taggedUser.id || user.id===message.author.id)){

              await sentMessage.delete(); // Delete the message
              message.channel.send(custom_embed.ToEmbed(`Partie Annulé par **${user.username}**`))
                .then(end_msg => {end_msg.delete({ timeout: 10000 })});
              return collector.stop(); // Delete the collector.

            }else if(player_select.id===user.id){
                let index=modified_number.indexOf(reaction.emoji.name);

                if(player_select.id===message.author.id){
                  modified_number[index]=letter.X
                  player_select=taggedUser
                }else{
                  modified_number[index]=letter.O2
                  player_select=message.author
                }
                sentMessage.edit(create_msg(modified_number,player_select.username))
                await reaction.remove()

                if(collector.collected.size==9){ //Partie Terminé
                  endmsg="Partie Terminé"
                  sentMessage.edit(create_msg(modified_number,endmsg))
                  await sentMessage.reactions.removeAll()
                  return collector.stop(); // Delete the collector.
                }
              }
        })

      }).catch(err => console.error(err));
  }
}
