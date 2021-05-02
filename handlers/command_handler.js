const fs = require('fs');
const chalk = require('chalk');

module.exports = (client,Discord) =>{

		let nbcommandes=0;
		const commandFolders = fs.readdirSync('./commands');
		for (const folder of commandFolders) {
			const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
			for (const file of commandFiles) {
				const command = require(`../commands/${folder}/${file}`);
				client.commands.set(command.name, command);
		    nbcommandes+=1;
			}
		}
		console.log(chalk.bgBlue(`${nbcommandes} commandes ont été trouvé !`));
}
