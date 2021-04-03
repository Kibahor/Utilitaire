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

      if (!command) return message.channel.send(custom_embed.ToEmbedWarning(`La commande \`${commandName}\` n'existe pas !`));

      if (command.args && !args.length) {
    		let reply = `Tu n'as fourni aucun arguments !`;
    		if (command.usage) {reply += `\nSyntax: \`${command.usage}\``;}
    		return message.channel.send(custom_embed.ToEmbed(reply));
    	}
      try{
        command.execute(message,args,client);
      }catch (error){
        console.log("\n");
        console.error(error);
        message.reply(custom_embed.ToEmbedWarning("Une erreur est survenue lors de l'éxecution de la commande"));
      }
}
