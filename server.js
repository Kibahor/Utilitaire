const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix,token} = require('./config.json'); //ajouter les couleur rouge et bleu

client.events = new Discord.Collection();
client.commands = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
		require(`./handlers/${handler}`)(client,Discord);
})

client.login(token);
