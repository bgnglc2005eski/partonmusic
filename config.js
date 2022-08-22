module.exports = {
    TOKEN: "MTAxMTM0MjUyNTEyNDA2MzI1Mg.GZrpY7.7ZC6WbiqXulvW_ePHt4MFDvenDlaad3d5RT2tk",
    ownerID: "921823508672180255", //write your discord user id.
    botInvite: "https://discord.com/api/oauth2/authorize?client_id=1011342525124063252&permissions=8&scope=bot%20applications.commands", //write your discord bot invite.
    status: '❤️ qHerox',
    commandsDir: './commands', //Please don't touch

    opt: {
        DJ: {
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'skip', 'stop', 'volume'] //Please don't touch
        },

        voiceConfig: {
            leaveOnEnd: false, //If this variable is "true", the bot will leave the channel the music ends.
            autoSelfDeaf: false, //IF YOU WANT TO DEAF THE BOT, set false to true.

            leaveOnTimer: { //The leaveOnEnd variable must be "false" to use this system.
                status: true, //If this variable is "true", the bot will leave the channel when the bot is offline.
                time: 20000, //1000 = 1 second
            }
        },

        maxVol: 200, //You can specify the maximum volume level.
        loopMessage: false,

        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio', //Please don't touch
                highWaterMark: 1 << 25 //Please don't touch
            }
        }
    }
}
