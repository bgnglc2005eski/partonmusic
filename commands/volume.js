const { ApplicationCommandOptionType } = require('discord.js');
const maxVol = require("../config.js").opt.maxVol;
module.exports = {
    name: "ses",
    description: "Oynatılan müziğin sesini arttırır.",
    permissions: "0x0000000000000800",
    options: [{
        name: 'volume',
        description: '1 ile 200 arası ses girin.',
        type: ApplicationCommandOptionType.Integer,
        required: true
    }],
    run: async (client, interaction) => {
        const queue = client.player.getQueue(interaction.guild.id);
        if (!queue || !queue.playing) return interaction.reply({ content: `Hiçbir müzik oynatılmıyor!. ❌`, ephemeral: true }).catch(e => { })

        const vol = parseInt(interaction.options.getInteger('volume'));

        if (!vol) return interaction.reply({ content: `Yanlış değer: **${queue.volume}** 🔊\n** \`1\` ile \`${maxVol}\` arasında bir sayı girin.**`, ephemeral: true }).catch(e => { })

        if (queue.volume === vol) return interaction.reply({ content: `Değiştirmek istediğiniz ses düzeyi zaten mevcut ses düzeyidir ❌`, ephemeral: true }).catch(e => { })

        if (vol < 0 || vol > maxVol) return interaction.reply({ content: `**Sesi değiştirmek için \`1\` ile \`${maxVol}\` arasında bir sayı girin .** ❌`, ephemeral: true }).catch(e => { })

        const success = queue.setVolume(vol);

        return interaction.reply({ content: success ? `Ses değiştirildi: **${vol}**/**${maxVol}** 🔊` : `Bir şeyler ters gitti. ❌` }).catch(e => { })
    },
};
