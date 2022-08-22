module.exports = {
    name: "durdur",
    description: "Tüm şarkıları durdurur ve sesten ayrılır.",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ content: `Şu anda çalan müzik yok!. ❌`, ephemeral: true }).catch(e => { })

        queue.destroy();

        interaction.reply({ content: `Tüm şarkılar durduruldu. ✅` }).catch(e => { })
    },
};
