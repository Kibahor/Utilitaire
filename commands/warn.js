module.exports = {
  name:'warn',
  aliases: '',
  description: 'Permet de d\'avertir une personne (sans restrictions)',
  usage: '+warn @user raison',
  args: true,
  execute(message,args){
    const Discord = require('discord.js');
    const fs = require('fs');
    let dateFormat = require("dateformat");
    let taggedUser = message.mentions.users.first();

    function user_register(username,raison,date){
      try{
        let listwarn = JSON.parse(fs.readFileSync(`commands/warn/${username}.json`));
        listwarn.infraction.push({"date": date ,"raison": raison});
        fs.writeFileSync(`commands/warn/${username}.json`, JSON.stringify(listwarn));
      }catch(error){
        let user = {"user": username,
                    "infraction": [
                      {"date": date,"raison": raison}
                    ]};
                    console.log(`ajout de commands/warn/${username}.json`);
        fs.writeFileSync(`commands/warn/${username}.json`, JSON.stringify(user))
      }
    }

    if (!message.mentions.users.size) {
	     return message.reply("Tu dois mentionner quelqu'un !");
    }else if(args[1]== null){
        return message.reply("Tu dois donner une raison !")
    }
    let raison;
    if(taggedUser.id === "807667723151605822"){
      taggedUser=message.author;
      raison="À voulu donner un avertissement au sacro-saint bot Utilitaire !"
    }else if(taggedUser.id === message.author.id){
      raison=`${taggedUser.username} à décider de s'avertir lui même ! Aurait-il perdu toute sa raison ?`;
    }else{
      for(let i=1;i<args.length;i++){raison=raison+args[i]+' ';}
    }

    user_register(taggedUser.username,raison,dateFormat(new Date(),"dd/mm/yy"));

    const MsgEmbed = new Discord.MessageEmbed()
      .setThumbnail(taggedUser.displayAvatarURL({ format: "png", dynamic: false }))
      .setTitle(`Un avertissement pour ${taggedUser.username}`)
      .setDescription(`**Raison :** ${raison}`)
      .setColor('#3669d9')
      .setTimestamp()
      .setFooter('C\'est pas bien d\'être méchant - Naruto')
    return message.channel.send(MsgEmbed);
  }
}
