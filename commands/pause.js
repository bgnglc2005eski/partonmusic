module.exports = {
    name: "duraklat",
    description: "Çalınan şarkıyı duraklatır.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {

        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: `Hiçbir şarkı çalmıyor!. ❌`, ephemeral: true }).catch(e => { })

        const success = queue.setPaused(true);

        return interaction.reply({ content: success ? `Şu anda çalınan **${queue.current.title}** adlı müzik durduruldu ✅` : `Bir şeyler ters gitti. ❌` }).catch(e => { })
    },
}
