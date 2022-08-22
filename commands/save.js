const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: "kaydet",
    description: "Çalınan müziği DM ile size gönderir ve kaydeder.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: `Hiçbir şarkı oynatılmıyor! ❌`, ephemeral: true }).catch(e => { })

        const embed = new EmbedBuilder()
            .setColor('007fff')
            .setTitle(client.user.username + " - Şarkıyı Kaydet")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields([
                { name: `Şarkı`, value: `\`${queue.current.title}\`` },
                { name: `Süre`, value: `\`${queue.current.duration}\`` },
                { name: `URL`, value: `${queue.current.url}` },
                { name: `Kaydedilen sunucu`, value: `\`${interaction.guild.name}\`` },
                { name: `İsteyen`, value: `${queue.current.requestedBy}` }
            ])
            .setTimestamp()
            .setFooter({ text: `Made by qHerox ❤️` })
        interaction.user.send({ embeds: [embed] }).then(() => {
            interaction.reply({ content: `Müziğin adını DM ile gönderdim.. ✅`, ephemeral: true }).catch(e => { })
        }).catch(error => {
            interaction.reply({ content: `Özel mesajınız kapalı olduğu için mesaj gönderilemiyor. ❌`, ephemeral: true }).catch(e => { })
        });
    },
};
