const { channels } = require('..');
const client = require('..');
const moment = require('moment');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

client.on("interactionCreate", (interaction) => {
    if(interaction.customId == "ticket-create") {
        const guild = interaction.guild;
        const user = interaction.user;

        if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id)) {
            return interaction.reply({
              content: 'you have already a Ticket created!',
              ephemeral: true
            });
          };

        guild.channels.create({ name: `ticket-${user.username}`, reason: `${user} created a ticket.`})
        .then(async (channel) => {

            let everyoneRole = guild.roles.cache.find(r => r.name === "@everyone");
            let supportRole = guild.roles.cache.find(r => r.id === '1004491511162998894');

            var createdTime = Date.now();
            channel.setParent('1004478847682609283');
            channel.setTopic(`Ticket created on ${moment(createdTime).format('DD-MM-YYYY, HH:mm')}`)

            channel.permissionOverwrites.edit(user.id, {
                SendMessages: true,
                ViewChannel: true
            });

            channel.permissionOverwrites.edit(everyoneRole.id, {
                SendMessages: false,
                ViewChannel: false
            });

            channel.permissionOverwrites.edit(supportRole.id, {
                SendMessages: true,
                ViewChannel: true
            });

            const ticketCreated = new EmbedBuilder()
                .setTitle(`Ticket aangemaakt`)
                .setDescription(`Je ticket is aangemaakt. <#${channel.id}>`)
                .setColor(0x009FE3);

            const ticketManager = new EmbedBuilder()
                .setColor(0x009FE3)
                .setTitle(`${user.username}'s Ticket`)
                .setDescription(`Je ticket is aangemaakt, ${supportRole} zal zo snel mogelijk met u zijn.`)
                .setTimestamp();

            const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('ticket-delete')
                    .setLabel('Verwijder Ticket')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('🔒')
            )

            interaction.reply({
                embeds: [ticketCreated],
                ephemeral: true
            });

            channel.send({
                embeds: [ticketManager],
                components: [buttons]
            });

        });
    }
});
