const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder} = require('discord.js');
const chalk = require("chalk");

require('dotenv').config()

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMembers,
	], 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});

client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();

module.exports = client;

['slashCommand', 'events'].forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});

client.login(process.env.CLIENT_TOKEN)