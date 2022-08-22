const { EmbedBuilder } = require('discord.js')
module.exports = {
    name: "yardım",
    description: "Bot hakkındaki komutları görüntülersiniz.",
    permissions: "0x0000000000000800",
    options: [],
    showHelp: false,
    run: async (client, interaction) => {

        const commands = client.commands.filter(x => x.showHelp !== false);

        const embed = new EmbedBuilder()
            .setColor('007fff')
            .setTitle(client.user.username)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription("Parton Music / komutlarını destekler ve V14 olarak kodlanmıştır.")
            .addFields([
                { name: `Bot Komutları`, value: commands.map(x => `\`/${x.name}\``).join(' | ') }
            ])
            .setTimestamp()
            .setFooter({ text: `Made by qHerox ❤️` })
        interaction.reply({ embeds: [embed] }).catch(e => { })
    },
};
