const custom = require('../myfunction.js');
const chalk = require('chalk');

module.exports= (client,Discord) =>{
      console.log(chalk.cyan(`[INFO] ${member.displayName} à rejoint le serveur`));
      const MsgEmbed = new Discord.MessageEmbed()
        .setTitle(`Bienvenue sur notre magnifique serveur ${member.displayName} !`)
        .setImage("https://media1.tenor.com/images/8856e3ad69679ed85e3239df270a24a6/tenor.gif?itemid=11860846")
        .setFooter("PS: Si tu trouve d'où vient le logo du serveur, tu obtient le rôle administratour !")
      client.channels.cache.get("805861658495811604").send(MsgEmbed);
}
