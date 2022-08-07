const { EmbedBuilder } = require("discord.js");


module.exports = {
    name: 'remove',
    description: 'Verwijder iemand van het ticket.',
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
                SendMessages: false,
                ViewChannel: false
            })

            const removedEmbed = new EmbedBuilder()
                .setTitle(`Gebruiker verwijderd.`)
                .setDescription(`${user} is verwijderd van het ticket door ${interaction.user}`)
                .setColor(0x009FE3)

            interaction.reply({
                embeds: [removedEmbed]
            });



        } catch (error) {
            console.error(error);
            return interaction.reply(error);
        }
    }
}