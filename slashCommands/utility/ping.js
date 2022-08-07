const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'ping',
	description: "Controleer de ping van de bot.",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,

	run: async (client, interaction) => {
	await interaction.reply({ content: `🏓 Pong! | Latency: **${Math.round(client.ws.ping)} ms**`, ephemeral: true });
	}
};