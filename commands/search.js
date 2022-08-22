const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const { QueryType } = require('discord-player');
module.exports = {
  name: "ara",
  description: "Müzik aramanız için kullanılır.",
  permissions: "0x0000000000000800",
  options: [{
    name: 'isim',
    description: 'Çalmak istediğiniz müziğin adını yazın.',
    type: ApplicationCommandOptionType.String,
    required: true
  }],
  run: async (client, interaction) => {

    const name = interaction.options.getString('name')
    if (!name) return interaction.reply({ content: `Geçerli bir şarkı girin. ❌`, ephemeral: true }).catch(e => { })

    const res = await client.player.search(name, {
      requestedBy: interaction.member,
      searchEngine: QueryType.AUTO
    });
    if (!res || !res.tracks.length) return interaction.reply({ content: `Arama sonucu bulunamadı. ❌`, ephemeral: true }).catch(e => { })

    const queue = await client.player.createQueue(interaction.guild, {
      leaveOnEnd: client.config.opt.voiceConfig.leaveOnEnd,
      autoSelfDeaf: client.config.opt.voiceConfig.autoSelfDeaf,
      metadata: interaction.channel
    });

    const embed = new EmbedBuilder();

    embed.setColor('007fff');
    embed.setTitle(`Aranan müzik: ${name}`);

    const maxTracks = res.tracks.slice(0, 10);

    embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | \`${track.author}\``).join('\n')}\n\nŞundan bir şarkı seçin **1** to **${maxTracks.length}** yaz gönder veya yaz **iptal** ve seçimi iptal et.⬇️`)

    embed.setTimestamp();
    embed.setFooter({ text: `Made by qHerox ❤️` })

    interaction.reply({ embeds: [embed] }).catch(e => { })

    const collector = interaction.channel.createMessageCollector({
      time: 30000,
      errors: ['time'],
      filter: m => m.author.id === interaction.user.id
    });

    collector.on('collect', async (query) => {
      if (["cancel"].includes(query.content)) {
        embed.setDescription(`Müzik araması iptal edildi. ✅`)
        await interaction.editReply({ embeds: [embed], ephemeral: true }).catch(e => { })
        return collector.stop();
      }
      const value = parseInt(query.content);

      if (!value || value <= 0 || value > maxTracks.length) return interaction.reply({ content: `Hata: **1** ila **${maxTracks.length}** arasında bir şarkı seçin ve gönder yazın veya **iptal** yazın ve seçimi iptal edin. ❌`, ephemeral: true }).catch(e => { })

      collector.stop();

      try {
        if (!queue.connection) await queue.connect(interaction.member.voice.channelId);
      } catch {
        await client.player.deleteQueue(interaction.guild.id);
        return interaction.reply({ content: `Ses kanalına katılamıyorum. Yetkim olmayabilir. ❌`, ephemeral: true }).catch(e => { })
      }

      await interaction.reply({ content: `Müzik aramanız yükleniyor. 🎧` }).catch(e => { })

      queue.addTrack(res.tracks[Number(query.content) - 1]);
      if (!queue.playing) await queue.play();

    });

    collector.on('end', (msg, reason) => {
      if (reason === 'time') return interaction.reply({ content: `Şarkı arama süresi doldu ❌`, ephemeral: true }).catch(e => { })
    });
  },
};
