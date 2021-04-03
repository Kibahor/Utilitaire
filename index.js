const fs = require('fs');
const Discord = require('discord.js');

const {prefix,token} = require('./config.json');

const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
		|| client.commands.find(command => command.aliases && command.aliases.includes(commandName));

  if (!command) return message.channel.send(`La commande ${commandName} n'existe pas !`);

  if (command.args && !args.length) {
		let reply = `${message.author} Tu n'as fourni aucun arguments !`;
		if (command.usage) {
			reply += `\nSyntax: \`${command.usage}\``;
		}
		return message.channel.send(reply);
	}
  try{
    command.execute(message,args,client);
  }catch (error){
    console.error(error);
    message.reply("Une erreur est survenue lors de l'éxecution de la commande");
  }
});

client.login(token);
