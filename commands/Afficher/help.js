module.exports = {
  name:'help',
  aliases: 'h',
  category:'Affichage',
  description: 'Affiche une description de chaques commandes',
  usage: '+help <commande>',
  args: false,
  execute (message,args,client){
    const custom_embed = require('../../MyModule/embed.js');
    const Discord = require('discord.js');

    if (args[0]) {
      const command = client.commands.get(args[0])//On récupère la commande en vérifiant le nom et les aliases
    		|| client.commands.find(command => command.aliases && command.aliases.includes(args[0]));

      if (!command) {
        return message.channel.send(custom_embed.ToEmbedWarning(`Commande : \`${args[0]}\` introuvable`));
      }else{
        if(command.usage2){
          return message.channel.send(custom_embed.ToEmbed1(`**${command.name.charAt(0).toUpperCase() + command.name.slice(1)}**`,`❯ **Alias**\n\`${command.name}\` \`${command.aliases}\`\n\n❯ **Syntax**\n\`${command.usage2}\`\n\n❯ **Description**\n${command.description}`));
        }else{
          return message.channel.send(custom_embed.ToEmbed1(`**${command.name.charAt(0).toUpperCase() + command.name.slice(1)}**`,`❯ **Alias**\n\`${command.name}\` \`${command.aliases}\`\n\n❯ **Syntax**\n\`${command.usage}\`\n\n❯ **Description**\n${command.description}`));
        }
      }
    }else{

      //Trier les commandes par catégorie grâce au map
      let commandsMap=new Map();  //Key: command.category | Value: Set<command>
      let categorySet=new Set();
      let tempCategory=client.commands.first().category;  //On obtient le 1er element de la collection de commandes et on prend sa catégorie

      for(let command of client.commands.array()){  //Parcours des commandes
        if(tempCategory===command.category){ //Si la catégorie de la dernière commandes correspond à la catégorie de la commandes actuel
          categorySet.add(command);
        }else{ //Si ce n'est pas le cas on ajoute la categorie avec les commandes dans la map
          commandsMap.set(tempCategory,categorySet);
          tempCategory=command.category;
          categorySet=new Set();
          categorySet.add(command);
        }
      }
      commandsMap.set(tempCategory,categorySet); //On ajoute la dernière catégorie

      //Parcours de la map
      let reply='';

      for (let [keyMap, valueMap] of commandsMap.entries()) {
        reply+=`\n❯ **${keyMap}**\n`;
        for(let command of valueMap){
          reply+=`\`${command.name}\` `;
        }
      }
      message.channel.send(custom_embed.ToEmbed1("Help",reply));
    }
  }
}
