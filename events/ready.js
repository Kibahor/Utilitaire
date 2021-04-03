const chalk = require('chalk');
const {prefix} = require('../config.json');

module.exports = (client) =>{
      client.user.setStatus('available');
      client.user.setPresence({
        activity: {
            name: `Epic Sax Guy | ${prefix}help`,
            type: "LISTENING",
        }
      });

      console.log(chalk.bgGreen('Le bot est opérationel !'));
}
