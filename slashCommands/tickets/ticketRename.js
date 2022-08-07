const { EmbedBuilder } = require("discord.js");


module.exports = {
    name: 'rename',
    description: 'Hernoem het ticket.',
    default_permission: 'MANAGE_MESSAGES',
    options: [
        {
            name: 'naam',
            description: 'Hoe wil je het ticket noemen?',
            type: 3,
            required: true
        }
    ],

    run: async (client, interaction) => {
        try {

            let name = interaction.options.getString('naam');
            let topic = interaction.channel.topic;
    
            
            if(topic == null || !topic.includes('Ticket')) {
                interaction.reply({
                    content: 'Je kan dit command alleen gebruiken in een ticket',
                    ephemeral: true
                })
                return;
            }

            interaction.channel.setName(name);

            const renameEmbed = new EmbedBuilder()
                .setTitle(`Ticket hernoemd`)
                .setDescription(`Ticket naam veranderd naar **${name}** door ${interaction.user}`)
                .setColor(0x009FE3)

            interaction.reply({
                embeds: [renameEmbed]
            });



        } catch (error) {
            console.error(error);
            return interaction.reply(error);
        }
    }
}