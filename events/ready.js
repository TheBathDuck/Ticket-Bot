const client = require('..');
const chalk = require('chalk');

client.on("ready", () => {

    client.user.setStatus('dnd');
    client.user.setActivity({
        name: `with Tickets`,
        type: 0
    });
    console.log(chalk.red(`Ingelogd als: ${client.user.tag}!`));
});
