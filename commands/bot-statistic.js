const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, Colors } = require("discord.js")
const config = require("../config.js");
module.exports = {
  name: "istatistik",
  description: "Botun istatistiklerini görün.",
  options: [],
  run: async (client, interaction) => {

    let link_button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Yenile')
        .setStyle(ButtonStyle.Success)
        .setCustomId("Yenile"))


    const embed = new EmbedBuilder()
      .setTitle(client.user.username + " Bot İstatistikleri")
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setDescription(`**
• Kurucu: \`${client.users.cache.get(config.ownerID)?.tag || "Bulunamadı!"}\`
• Kullanıcı sayısı: \`${client.users.cache.size}\`
• Sunucu sayısı: \`${client.guilds.cache.size}\`
• Kanal sayısı: \`${client.channels.cache.size}\`
• Komut sayısı: \`${client.commands.map(c => c.name).length}\`
• Discord.js Versiyon: \`V14.1.0\`
• Node.js Versiyon: \`${process.version}\`
• Uptime süresi: <t:${Math.floor(Number(Date.now() - client.uptime) / 1000)}:R>
• Ping: \`${client.ws.ping} MS\`
• Ram kullanımı: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`
• OS: \`${process.platform}\`
• Davet Linki: [Tıkla](${config.botInvite})
**`)
      .setColor(Colors.Green)
      .setTimestamp()
    return interaction.reply({ embeds: [embed], components: [link_button] }).then(async Message => {

      const filter = i => i.user.id === interaction.user.id
      let col = await interaction.channel.createMessageComponentCollector({ filter, time: 120000 })

      col.on('collect', async (button) => {
        switch (button.customId) {
          case 'Yenile': {
            const embed2 = new EmbedBuilder()
              .setTitle(client.user.username + " Bot İstatistikleri")
              .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
              .setDescription(`**
• Kurucu: \`${client.users.cache.get(config.ownerID)?.tag || "Bulunamadı!"}\`
• Kullanıcı sayısı: \`${client.users.cache.size}\`
• Sunucu sayısı: \`${client.guilds.cache.size}\`
• Kanal sayısı: \`${client.channels.cache.size}\`
• Komut sayısı: \`${client.commands.map(c => c.name).length}\`
• Discord.js Versiyon: \`V14.1.0\`
• Node.js Versiyon: \`${process.version}\`
• Uptime süresi: <t:${Math.floor(Number(Date.now() - client.uptime) / 1000)}:R>
• Ping: \`${client.ws.ping} MS\`
• Ram kullanımı: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`
• OS: \`${process.platform}\`
• Davet Linki: [Tıkla](${config.botInvite})
**`)
              .setColor(Colors.Green)
              .setTimestamp()
            await interaction.editReply({ content: "**✔️ Yenilendi.**", embeds: [embed2] }).catch(err => { })
            await button.deferUpdate().catch(e => { })
          }
        }
      })
      col.on('end', async (button) => {
        link_button = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel('Yenile')
            .setStyle(ButtonStyle.Success)
            .setCustomId("Yenile")
            .setDisabled(true))
        return interaction.editReply({ content: "**Zamanın doldu!**", components: [link_button] }).catch(err => { })
      })
    }).catch(err => { })
  },
};
