const { QueryType } = require('discord-player')
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "oynat",
    description: "Yazılan müziği sesli kanalda oynatır.",
    permissions: "0x0000000000000800",
    options: [{
        name: 'müzik',
        description: 'Bir müzik girin.',
        type: ApplicationCommandOptionType.String,
        required: true
    }],
    voiceChannel: true,
    run: async (client, interaction) => {

        const name = interaction.options.getString('müzik')
        if (!name) return interaction.reply({ content: `Yanlış müzik adı girildiği için müzik bulunamıyor. ❌`, ephemeral: true }).catch(e => { })

        const res = await client.player.search(name, {
            requestedBy: interaction.member,
            searchEngine: QueryType.AUTO
        });
        if (!res || !res.tracks.length) return interaction.reply({ content: `Müzik bulunamadı! ❌`, ephemeral: true }).catch(e => { })

        const queue = await client.player.createQueue(interaction.guild, {
            leaveOnEnd: client.config.opt.voiceConfig.leaveOnEnd,
            autoSelfDeaf: client.config.opt.voiceConfig.autoSelfDeaf,
            metadata: interaction.channel
        });

        try {
            if (!queue.playing) await queue.connect(interaction.member.voice.channelId)
        } catch {
            await client.player.deleteQueue(interaction.guild.id);
            return interaction.reply({ content: `Herhangi bir ses kanalında değilsin. ❌`, ephemeral: true }).catch(e => { })
        }

        await interaction.reply({ content: `<@${interaction.member.id}>, Müziğiniz yükleniyor... 🎧` }).catch(e => { })
        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);
        if (!queue.playing) await queue.play()
    },
};
