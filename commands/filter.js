const { ApplicationCommandOptionType } = require('discord.js');
module.exports = {
  name: "filtre",
  description: "Müziğinize filtre ekleyin.",
  permissions: "0x0000000000000800",
  options: [{
    name: 'filtre',
    description: 'Bir filtre seçin. (bassboost, 8D, nightcore, mono, karaoke)',
    type: ApplicationCommandOptionType.String,
    required: true
  }],
  run: async (client, interaction) => {

    const queue = client.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing) return interaction.reply({ content: `Hiçbir müzik oynatılmıyor!. ❌`, ephemeral: true }).catch(e => { })
    const filtre = interaction.options.getString('filtre')

    if (!filtre) return interaction.reply({ content: `Lütfen geçerli bir filtre geçin. ❌\n\`bassboost, 8D, nightcore\``, ephemeral: true }).catch(e => { })


    const filters = ["bassboost", "8D", "nightcore", "mono", "karaoke"];
    //other filters: https://discord-player.js.org/docs/main/master/typedef/AudioFilters 

    const filter = filters.find((x) => x.toLowerCase() === filtre.toLowerCase());

    if (!filter) return interaction.reply({ content: `Böyle bir filtre bulamadım. ❌\n\`bassboost, 8D, nightcore\``, ephemeral: true }).catch(e => { })
    const filtersUpdated = {};
    filtersUpdated[filter] = queue["_activeFilters"].includes(filter) ? false : true;
    await queue.setFilters(filtersUpdated);

    interaction.reply({ content: `Filtre ayarlandı: **${filter}**, Filtre durumu: **${queue["_activeFilters"].includes(filter) ? 'Active' : 'Inactive'}** ✅\n **Unutmayın, müzik uzunsa filtre uygulama süresi buna göre uzayabilir..**` }).catch(e => { })
  },
};
