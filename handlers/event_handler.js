const fs = require('fs');

module.exports = (client,Discord) =>{
    const eventFiles = fs.readdirSync(`./events`).filter(file => file.endsWith('.js'));
    for (const file of eventFiles){
      const event = require(`../events/${file}`);
      const eventname=file.split('.')[0];
      client.on(eventname, event.bind(null,client,Discord));
    }
}
