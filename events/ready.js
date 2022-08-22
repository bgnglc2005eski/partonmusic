const config = require("../config.js");
module.exports = async (client) => {

    const { REST } = require("@discordjs/rest");
    const { Routes } = require("discord-api-types/v10");
    const rest = new REST({ version: "10" }).setToken(config.TOKEN || process.env.TOKEN);
    (async () => {
        try {
            await rest.put(Routes.applicationCommands(client.user.id), {
                body: await client.commands,
            });
            console.log("Uygulama başarıyla yüklendi. [/] komutları aktif.");
        } catch (err) {
            console.log("Error reloading application [/] commands: " + err);
        }
    })();

    console.log(client.user.username + " ismiyle bağlandım.");
    client.user.setStatus('IDLE');
    client.user.setActivity(config.status)

}
