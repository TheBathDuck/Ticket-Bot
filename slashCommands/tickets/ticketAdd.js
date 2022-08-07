const { EmbedBuilder } = require("discord.js");


module.exports = {
    name: 'add',
    description: 'Voeg iemand toe aan het ticket.',
    options: [
        {
            name: 'user',
            description: 'De persoon die je wilt toevoegen',
            type: 6,
            required: true
        }
    ],

    run: async (client, interaction) => {
        try {

            let user = interaction.options.getUser('user');
            let topic = interaction.channel.topic;
            
            if(topic == null || !topic.includes('Ticket')) {
                interaction.reply({
                    content: 'Je kan dit command alleen gebruiken in een ticket',
                    ephemeral: true
                })
                return;
            }

            interaction.channel.permissionOverwrites.edit(user.id, {
                SendMessages: true,
                ViewChannel: true
            })

            const addedEmbed = new EmbedBuilder()
                .setTitle(`Gebruiker Toegevoegd.`)
                .setDescription(`${user} is toegevoegd door ${interaction.user}`)
                .setColor(0x009FE3)

            interaction.reply({
                embeds: [addedEmbed]
            });



        } catch (error) {
            console.error(error);
            return interaction.reply(error);
        }
    }
}