exports.run = async (client, message, args) => {
    if (message.author.id == "137624084572798976") {
        if (args[0].toLowerCase() == "create") {
            let target = message.guild.members.get(args[0].match(/[0-9]{18}/)[0])

            //Do server creation things
            if (!args[0]) {
                message.channel.send(helpEmbed)
                return;
            }

            let helpEmbed = new Discord.RichEmbed()
            .setColor(`RED`).setDescription(`List of servers: (use ${config.DiscordBot.Prefix}server create <type> <name>)`)
            .addField(`__**Minecraft:**__`, "Forge \nPaper \nBedrock \nPocketmineMP", true)
            .addField(`__**Grand Theft Auto:**__`, "FiveM \nalt:V \nmultitheftauto \nRage.MP \nSA-MP", true)
            .addField(`__**Bots:**__`, "NodeJS \nPython \nJava \naio", true)
            .addField(`__**Source Engine:**__`, "GMod \nCS:GO \nARK:SE", true)
            .addField(`__**Voice Servers:**__`, "TS3 \nMumble", true)
            .addField(`__**SteamCMD:**__`, "Rust", true)
            .addField(`__**Databases:**__`, "MongoDB \nRedis \nPostgres", true)
            .setFooter("Example: " + config.DiscordBot.Prefix + "server create NodeJS Testing Server")

            const serverName = message.content.split(' ').slice(3).join(' ') || "change me! (Settings -> SERVER NAME)";

            let types = {
                nodejs: data.nodejs,
                python: data.python,
                aio: data.aio,
                java: data.java,
                paper: data.paper,
                forge: data.forge,
                fivem: data.fivem,
                "alt:v": data.altv,
                multitheftauto: data.multitheftauto,
                "rage.mp": data.ragemp,
                "sa-mp": data.samp,
                bedrock: data.bedrock,
                pocketminemp: data.pocketminemp,
                gmod: data.gmod,
                "cs:go": data.csgo,
                "ark:se": data.arkse,
                ts3: data.ts3,
                mumble: data.mumble,
                rust: data.rust,
                mongodb: data.mongodb,
                redis: data.redis,
                postgres: data.postgres,
            }
    
    
            if (args[0] == "n4") {
                if (Object.keys(types).includes(args[1].toLowerCase())) {
        
                    axios({
                        url: "http://danbot.host/external/fetch",
                        method: 'GET',
                        followRedirect: true,
                        maxRedirects: 5,
                        headers: {
                            "password": config.Misc.externalPassword
                        },
                        data: {
                            "user": target
                        }
                    }).then(response => {
                        if (response.data.error == "No account found for that user!") {
                            msg.edit('That user does not have an account')
                        } else {
                            let data = serverCreateSettings.createParams(serverName, response.data.consoleID);
                    if (args[1] == "aio" | args[1] == "java") {
                        serverCreateSettings.createServer(types[args[1].toLowerCase()])
                            .then(response => {
                                let embed = new Discord.RichEmbed()
                                    .setColor(`GREEN`)
                                    .addField(`__**Status:**__`, response.statusText)
                                    .addField(`__**Created for user ID:**__`, response.data.consoleID)
                                    .addField(`__**Server name:**__`, serverName)
                                    .addField(`__**Type:**__`, args[1].toLowerCase())
                                    .addField(`__**Created for user:**__`, )
                                message.channel.send(embed)
                            }).catch(error => {
                                message.channel.send(new Discord.RichEmbed().setColor(`RED`).addField(`__**FAILED:**__`, error))
                            })
                    } else {
                        serverCreateSettings.createServer(types[args[1].toLowerCase()])
                            .then(response => {
                                let embed = new Discord.RichEmbed()
                                    .setColor(`GREEN`)
                                    .addField(`__**Status:**__`, response.statusText)
                                    .addField(`__**Created for user ID:**__`, response.data.consoleID)
                                    .addField(`__**Server name:**__`, serverName)
                                    .addField(`__**Type:**__`, args[1].toLowerCase())
                                message.channel.send(embed)
                            }).catch(error => {
                                message.channel.send(new Discord.RichEmbed().setColor(`RED`).addField(`__**FAILED:**__`, error))
                                cooldown[message.author.id].nCreate = Date.now() + (10 * 1000)
                            })
                    }
                }})
                }
                message.channel.send(helpEmbed)
            } else if (args[0] == "normal") {
                if (Object.keys(types).includes(args[1].toLowerCase())) {
        
                    axios({
                        url: "http://danbot.host/external/fetch",
                        method: 'GET',
                        followRedirect: true,
                        maxRedirects: 5,
                        headers: {
                            "password": config.Misc.externalPassword
                        },
                        data: {
                            "user": target
                        }
                    }).then(response => {
                        if (response.data.error == "No account found for that user!") {
                            msg.edit('That user does not have an account')
                        } else {
                            let data = serverCreateSettings.createParams(serverName, response.data.consoleID);
                    if (args[1] == "aio" | args[1] == "java") {
                        serverCreateSettings.createServer(types[args[1].toLowerCase()])
                            .then(response => {
                                let embed = new Discord.RichEmbed()
                                    .setColor(`GREEN`)
                                    .addField(`__**Status:**__`, response.statusText)
                                    .addField(`__**Created for user ID:**__`, response.data.consoleID)
                                    .addField(`__**Server name:**__`, serverName)
                                    .addField(`__**Type:**__`, args[1].toLowerCase())
                                    .addField(`__**Created for user:**__`, )
                                message.channel.send(embed)
                            }).catch(error => {
                                message.channel.send(new Discord.RichEmbed().setColor(`RED`).addField(`__**FAILED:**__`, error))
                            })
                    } else {
                        serverCreateSettings.createServer(types[args[1].toLowerCase()])
                            .then(response => {
                                let embed = new Discord.RichEmbed()
                                    .setColor(`GREEN`)
                                    .addField(`__**Status:**__`, response.statusText)
                                    .addField(`__**Created for user ID:**__`, response.data.consoleID)
                                    .addField(`__**Server name:**__`, serverName)
                                    .addField(`__**Type:**__`, args[1].toLowerCase())
                                message.channel.send(embed)
                            }).catch(error => {
                                message.channel.send(new Discord.RichEmbed().setColor(`RED`).addField(`__**FAILED:**__`, error))
                                cooldown[message.author.id].nCreate = Date.now() + (10 * 1000)
                            })
                    }
                }})
                }
                message.channel.send(helpEmbed)
            }
        }
    } else {
        message.channel.send('For now this is a owner only command')
    }
};