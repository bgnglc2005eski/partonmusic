const { QueueRepeatMode } = require('discord-player');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require("croxydb");
module.exports = {
  name: "döngü",
  description: "Döngü modunu açıp kapatırsınız.",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {

    const queue = client.player.getQueue(interaction.guild.id);
    let cmds = db.get("loop." + interaction.user.id + interaction.guild.id + interaction.channel.id)
    if (!queue || !queue.playing) return interaction.reply({ content: `Hiçbir müzik oynatılmıyor!. ❌`, ephemeral: true }).catch(e => { })
    if (cmds) return interaction.reply({ content: `Burada zaten aktif bir komutunuz var. ❌\nhttps://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${cmds}`, ephemeral: true }).catch(e => { })

    let button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Döngü")
        .setStyle(ButtonStyle.Success)
        .setCustomId("loop"))

    const embed = new EmbedBuilder()
      .setColor("007fff")
      .setTitle('Döngü sistemi')
      .setDescription(`**${queue.current.title}** döngüye alındı.`)
      .setTimestamp()
      .setFooter({ text: `Made by qHerox ❤️` })
    interaction.reply({ embeds: [embed], components: [button], fetchReply: true }).then(async Message => {
      await db.set("loop." + interaction.user.id + interaction.guild.id + interaction.channel.id, Message.id)
      const filter = i => i.user.id === interaction.user.id
      let col = await interaction.channel.createMessageComponentCollector({ filter, time: 120000 });

      col.on('collect', async (button) => {
        if (button.user.id !== interaction.user.id) return

        switch (button.customId) {
          case 'loop':
            if (queue.repeatMode === 1) return interaction.reply({ content: `Önce mevcut müziğin döngü modunu devre dışı bırakmalısınız **(/loop)** ❌`, ephemeral: true }).catch(e => { })
            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);
            interaction.editReply({ content: success ? `Döngü modu: **${queue.repeatMode === 0 ? 'Inactive' : 'Active'}**, Tüm müzik durmadan devam edicek. 🔁` : `Bir şeyler ters gitti. ❌` }).catch(e => { })
            await button.deferUpdate();
            break
        }
      })
      col.on('end', async (button) => {
        await db.delete("loop." + interaction.user.id + interaction.guild.id + interaction.channel.id)
        button = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Success)
            .setLabel("Döngü")
            .setCustomId("loop")
            .setDisabled(true))

        const embed = new EmbedBuilder()
          .setColor("007fff")
          .setTitle('Döngü Modu - Bitti')
          .setDescription(`Seçmek için zamanınız kaldı.`)
          .setTimestamp()
          .setFooter({ text: `Made by qHerox ❤️` })

        await interaction.editReply({ embeds: [embed], components: [button] }).catch(e => { });
      })
    }).catch(e => { })
  }
}
