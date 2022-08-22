module.exports = {
    name: "devamet",
    description: "Duraklatılan şarkıyı oynatır.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue) return interaction.reply({ content: `Hiçbir şarkı oynatılmıyor! ❌`, ephemeral: true }).catch(e => { })

        const success = queue.setPaused(false);

        return interaction.reply({ content: success ? `**${queue.current.title}**, Şarkı çalmaya devam ediyor. ✅` : `Bir şeyler ters gitti. ❌ Müziği daha önce durdurmamışsınız.` }).catch(e => { })
    },
};
