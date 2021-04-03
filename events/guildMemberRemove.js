const chalk = require('chalk');

module.exports= (client,Discord,member) =>{
      console.log(chalk.red(`[INFO] ${member.displayName} à quitter le serveur`));
      
      const MsgEmbed = new Discord.MessageEmbed()
        .setTitle(`${member.displayName} à quitter le serveur !`)
        .setDescription("Ciao Sayonara, de toute façon je ne t'ai jamais aimer")
        .setImage("https://media1.tenor.com/images/51b4e198459c2b7c5861fda42cd084b2/tenor.gif?itemid=15229886")

      client.channels.cache.get("805861658495811604").send(MsgEmbed);

}
