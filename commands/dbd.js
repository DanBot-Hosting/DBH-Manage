const serverCreateSettings = require('../../../createData');

exports.run = async (client, message, args) => {
    if (message.channel.id === "773357374328012840") {
        axios({
            url: "http://danbot.host/external/fetch",
            method: 'GET',
            followRedirect: true,
            maxRedirects: 5,
            headers: {
                "password": config.Misc.externalPassword
            },
            data: {
                "user": message.author.id
            }
        }).then(response => {
            let helpEmbed = new Discord.MessageEmbed()
                .setColor(`RED`).setDescription(`List of servers: (use ${config.DiscordBot.Prefix}server create <type> <name>)`)
                .addField(`__**Minecraft:**__`, "Forge \nPaper \nBedrock \nPocketmineMP", true)
                .addField(`__**Bots:**__`, "NodeJS \nPython \nJava \naio \nRedDiscordBot", true)
                .addField(`__**Voice Servers:**__`, "TS3 \nMumble", true)
                .addField(`__**Databases:**__`, "MongoDB \nRedis \nPostgres", true)
                .addField(`__**WebHosting:**__`, "Nginx", true)
                .setFooter("Example: " + config.DiscordBot.Prefix + "dbd.js create NodeJS Testing Server")

            const serverName = message.content.split(' ').slice(3).join(' ') || "change me! (Settings -> SERVER NAME)";
            let consoleID = response.data;


            if (consoleID == null) {
                message.channel.send("Oh no, Seems like you do not have an account linked to your discord ID.\n" +
                    "If you have not made an account yet please check out `" +
                    config.DiscordBot.Prefix + "user new` to create an account \nIf you already have an account link it using `" +
                    config.DiscordBot.Prefix + "user link`");
                return;
            }
            let data = serverCreateSettings.createParams(serverName, consoleID.consoleID);

            if (!args[0]) {
                //No args
                let embed = new Discord.MessageEmbed()
                    .addField('__**Commands**__', 'Create a server: `' + config.DiscordBot.Prefix + 'dbd.js create type servername` \nServer Types: `' + config.DiscordBot.Prefix + 'dbd.ks create list`')
                message.channel.send(embed)

            } else if (args[0].toLowerCase() === "create") {

                //Do server creation things
                if (!args[1]) {
                    message.channel.send(helpEmbed)
                    return;
                }

                let types = {
                    nginx: data.nginx,
                    reddisordbot: data.reddiscordbot,
                    nodejs: data.nodejs,
                    python: data.python,
                    aio: data.aio,
                    java: data.java,
                    ts3: data.ts3,
                    mumble: data.mumble,
                    mongodb: data.mongodb,
                    redis: data.redis,
                    postgres: data.postgres,
                }

                if (Object.keys(types).includes(args[1].toLowerCase())) {

                    if (args[1] === "aio" | args[1] === "java") {
                        serverCreateSettings.createServer(types[args[1].toLowerCase()])
                            .then(response => {
                                let embed = new Discord.MessageEmbed()
                                    .setColor(`GREEN`)
                                    .addField(`__**Status:**__`, response.statusText)
                                    .addField(`__**Created for user ID:**__`, consoleID.consoleID)
                                    .addField(`__**Server name:**__`, serverName)
                                    .addField(`__**Type:**__`, args[1].toLowerCase())
                                    .addField(`__**WARNING**__`, `**DO NOT USE JAVA TO RUN GAMESERVERS. IF THERE IS A GAME YOU ARE WANTING TO HOST AND IT DOES NOT HAVE A SERVER PLEASE MAKE A TICKET**`)
                                message.channel.send(embed)
                            }).catch(error => {
                            message.channel.send(new Discord.MessageEmbed().setColor(`RED`).addField(`__**FAILED:**__`, "Please contact a host admin. \n\nError: `" + error + "`"))
                        })
                    } else {
                        serverCreateSettings.createServer(types[args[1].toLowerCase()])
                            .then(response => {
                                let embed = new Discord.MessageEmbed()
                                    .setColor(`GREEN`)
                                    .addField(`__**Status:**__`, response.statusText)
                                    .addField(`__**Created for user ID:**__`, consoleID.consoleID)
                                    .addField(`__**Server name:**__`, serverName)
                                    .addField(`__**Type:**__`, args[1].toLowerCase())
                                message.channel.send(embed)
                            }).catch(error => {
                            message.channel.send(new Discord.MessageEmbed().setColor(`RED`).addField(`__**FAILED:**__`, "Please contact a host admin. \n\nError: `" + error + "`"))
                        })
                    }
                    return;
                }
                message.channel.send(helpEmbed)

            }
        })
    }
}