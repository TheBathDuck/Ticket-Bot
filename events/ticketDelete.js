const { EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const client = require('..');

client.on("interactionCreate", (interaction) => {
    if(interaction.customId == "ticket-delete") {
        
        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('ticket-confirmclose')
                    .setLabel('Sluit Ticket')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('🗑️'),
                    
            )

        interaction.reply({
            content: 'Weet je zeker dat je dit ticket wilt sluiten?',
            components: [buttons]
        })

    };

    if(interaction.customId == "ticket-confirmclose") {
        interaction.reply('ok!');
        interaction.channel.delete('Ticket deleted');
    }
});
