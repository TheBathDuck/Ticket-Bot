const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");


module.exports = {
    name: 'ticketpanel',
    description: 'Maak een ticket paneel aan.',
    options: [
        {
            name: 'channel',
            description: 'Het kanaal waar het panel in moet verschijnen.',
            type: 7,
            required: true
        }
    ],

    run: async (client, interaction) => {
        try {
            const channel = interaction.options.getChannel('channel');
            const embed = new EmbedBuilder()
                .setTitle('Tickets')
                .setDescription('Klik op de onderstaande knop om een ticket aan te maken.')
                .setColor(0x009FE3)
                

                const buttons = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('ticket-create')
                            .setLabel('Nieuw Ticket')
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji('🎫')
                    )


                channel.send({
                    embeds: [embed],
                    components: [buttons],
                });

                interaction.reply({
                    content: `Ticketpaneel verzonden in ${channel}`,
                    ephemeral: true,
                });

        } catch (error) {
            console.error(error);
            return interaction.reply(error);
        }
    }
}