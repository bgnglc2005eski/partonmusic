module.exports = {
    name: "back",
    description: "Önceki oynatılan müziği tekrar oynatın.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {

        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: `Hiçbir müzik çalmıyor! ❌`, ephemeral: true }).catch(e => { })

        if (!queue.previousTracks[1]) return interaction.reply({ content: `Daha önce çalan müzik yoktu. ❌`, ephemeral: true }).catch(e => { })

        await queue.back();

        interaction.reply({ content: `Önceki müzik oynatılıyor... ✅` }).catch(e => { })
    },
};
