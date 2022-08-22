const { EmbedBuilder } = require('discord.js')
module.exports = {
    name: "ping",
    description: "Botun pingini görüntülersiniz.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {

        const start = Date.now();
        const embed = new EmbedBuilder()
            .setColor('007fff')
            .setTitle(client.user.username + " - Pong!")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields([
                { name: `Mesaj Pingi`, value: `\`${Date.now() - start}ms\` 🛰️` },
                { name: `Mesaj Gecikmesi`, value: `\`${Date.now() - start}ms\` 🛰️` },
                { name: `API Gecikmesi`, value: `\`${Math.round(client.ws.ping)}ms\` 🛰️` }
            ])
            .setTimestamp()
            .setFooter({ text: `Made by qHerox ❤️` })
        interaction.reply({ embeds: [embed] }).catch(e => { });

    },
};
