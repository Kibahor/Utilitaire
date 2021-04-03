const custom_embed = require('../MyModule/embed.js');
const custom_file = require('../MyModule/file.js');
const chalk = require('chalk');
const {prefix} = require('../config.json');

module.exports= (client,Discord,message) =>{
      if (!message.content.startsWith(prefix)) return;//Si le message ne contient pas le préfix on ignore

      const args = message.content.slice(prefix.length).trim().split(/ +/);//Récupère les arguments
      const commandName = args.shift().toLowerCase();//Récupère le nom de la commande

      const command = client.commands.get(commandName)//On récupère la commande en vérifiant le nom et les aliases
    		|| client.commands.find(command => command.aliases && command.aliases.includes(commandName));

      if (!command){
        return message.channel.send(custom_embed.ToEmbedWarning(`La commande \`${commandName}\` n'existe pas !`));
      }else if(command.permission && !message.member.hasPermission(command.permission)){
        return message.channel.send(custom_embed.ToEmbedWarning("Vous n'avez pas la permissions d'utiliser cette commande"));
      }else if (command.args && !args.length) {
    		let reply;
    		return message.channel.send(custom_embed.ToEmbed2("Tu n'as fourni aucun arguments !",`\n**Syntax :** \`${command.usage}\``,`Pour plus d'information fait "+help ${command.name}"`));
    	}

      try{
        command.execute(message,args,client)
      }catch(err){
        console.log("\n");
        console.error(err);
        message.reply(custom_embed.ToEmbedWarning("Une erreur est survenue lors de l'éxecution de la commande"));
      }

}
