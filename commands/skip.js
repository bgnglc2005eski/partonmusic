module.exports = {
    name: "geç",
    description: "Oynatılan şarkıyı geçer.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: `Hiçbir şarkı oynatılmıyor!. ❌`, ephemeral: true }).catch(e => { })

        const success = queue.skip();

        return interaction.reply({ content: success ? `**${queue.current.title}**, Şarkı geçildi ✅` : `Bir şeyler ters gitti. ❌` }).catch(e => { })
    },
};
