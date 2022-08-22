module.exports = {
    name: "temizle",
    description: "Çalınan veya çalınacak olan müzikleri temizler.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: `Hiçbir müzik oynatılmıyor. ❌`, ephemeral: true }).catch(e => { })

        if (!queue.tracks[0]) return interaction.reply({ content: `Geçerli olandan sonra müzik yok. ❌`, ephemeral: true }).catch(e => { })

        await queue.clear();

        interaction.reply({ content: `Bütün şarkılar temizlendi. 🗑️` }).catch(e => { })
    },
}
