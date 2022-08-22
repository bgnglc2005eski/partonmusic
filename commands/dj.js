const { ApplicationCommandOptionType } = require('discord.js');
const db = require('croxydb');
module.exports = {
    name: "dj",
    description: "DJ rolünü ayarlamanıza veya sıfırlamanıza izin verir.",
    permissions: "0x0000000000000020",
    options: [{
        name: "ayarla",
        description: "Bir DJ rolü seçmenizi sağlar.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
            {
                name: 'rol',
                description: 'Bir DJ rolü girin.',
                type: ApplicationCommandOptionType.Role,
                required: true
            }
        ]
    },
    {
        name: "sıfırla",
        description: "DJ rolünü sıfırlamanızı sağlar.",
        type: ApplicationCommandOptionType.Subcommand,
        options: []
    }
    ],
    run: async (client, interaction) => {

        let stp = interaction.options.getSubcommand()
        if (stp === "set") {
            const role = interaction.options.getRole('role')
            if (!role) return interaction.reply("Bir DJ rolü belirtmezseniz, komutu kullanamazsınız!").catch(e => { });

            await db.set(`dj-${interaction.guild.id}`, role.id)
            return await interaction.reply({ content: "DJ rolü başarıyla <@&" + role + "> olarak ayarlandı.", ephemeral: true }).catch(e => { });

        }
        if (stp === "reset") {
            const data = db.get(`dj-${interaction.guild.id}`)

            if (data) {
                await db.delete(`dj-${interaction.guild.id}`)
                return await interaction.reply({ content: "DJ rolü başarıyla silindi.", ephemeral: true }).catch(e => { });
            } else {
                return await interaction.reply({ content: "DJ rolü zaten ayarlı değildi.", ephemeral: true }).catch(e => { });
            }

        }
    },
};
