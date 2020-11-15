/*
🟢
🔄
🔴
*/
var pretty = require('prettysize');
exports.run = async (client, message, args) => {
    if(!args[0]) {
        let embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .addField("__**Server Status**__", "What server would you like to view? \nCommand Format: `" + config.DiscordBot.Prefix + "server-status serverid")
        message.channel.send(embed)
    } else {
        message.channel.send('Fetching `' + args[0] + '`. \n\n*This could take a few seconds*').then((msg) => {
            axios({
                url: config.Pterodactyl.hosturl + "/api/client/servers/" + args[0],
                method: 'GET',
                followRedirect: true,
                maxRedirects: 5,
                headers: {
                    'Authorization': 'Bearer ' + config.Pterodactyl.apikeyclient,
                    'Content-Type': 'application/json',
                    'Accept': 'Application/vnd.pterodactyl.v1+json',
                }
            }).then(response => {
                axios({
                    url: config.Pterodactyl.hosturl + "/api/client/servers/" + args[0] + "/resources",
                    method: 'GET',
                    followRedirect: true,
                    maxRedirects: 5,
                    headers: {
                        'Authorization': 'Bearer ' + config.Pterodactyl.apikeyclient,
                        'Content-Type': 'application/json',
                        'Accept': 'Application/vnd.pterodactyl.v1+json',
                    }
                }).then(resources => {
                    let embedstatus = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .addField('**Status**', resources.data.attributes.current_state, true)
                        .addField('**CPU Usage**', resources.data.attributes.resources.cpu_absolute + '%')
                        .addField('**RAM Usage**', pretty(resources.data.attributes.resources.memory_bytes) + '  out of UNLIMITED MB')
                        .addField('**DISK Usage**', pretty(resources.data.attributes.resources.disk_bytes) + '  out of UNLIMITED MB')
                        .addField('**NET Usage**', 'UPLOADED: ' + pretty(resources.data.attributes.resources.network_tx_bytes) + ', DOWNLOADED: ' + pretty(resources.data.attributes.resources.network_rx_bytes))
                        .addField('**NODE**', response.data.attributes.node)
                        .addField('**FULL ID**', response.data.attributes.uuid)
                        .addField('\u200b', '\u200b')
                        .setTitle('🟢 Start | 🔄 Restart | 🔴 Stop \nReactions work for 20seconds.')
                    msg.edit("<@" + message.author.id + ">", embedstatus)
                    setTimeout(() => {
                        msg.react('🟢')
                        setTimeout(() => {
                            msg.react('🔄')
                            setTimeout(() => {
                                msg.react('🔴')
                            }, 200)
                        }, 200)
                    }, 200)


                    const filter = (reaction, user) => (['🟢', '🔄', '🔴'].includes(reaction.emoji.name) && user.id === message.author.id);
                    const collector = msg.createReactionCollector(filter, {time: 20000});
                    collector.on('collect', async (reaction, user) => {
                        if (reaction.emoji.name == "🟢") {
                            axios({
                                url: config.Pterodactyl.hosturl + "/api/client/servers/" + args[0] + "/power",
                                method: 'POST',
                                followRedirect: true,
                                maxRedirects: 5,
                                headers: {
                                    'Authorization': 'Bearer ' + config.Pterodactyl.apikeyclient,
                                    'Content-Type': 'application/json',
                                    'Accept': 'Application/vnd.pterodactyl.v1+json',
                                },
                                data: { "signal" : "start" },
                            }).then(response => {
                                message.channel.send(args[0] + ' server started!').then((msg2) => {
                                    setTimeout(() => {
                                        msg2.delete()
                                    }, 2000)
                                })
                            });
                        } else if (reaction.emoji.name == "🔄") {
                            axios({
                                url: config.Pterodactyl.hosturl + "/api/client/servers/" + args[0] + "/power",
                                method: 'POST',
                                followRedirect: true,
                                maxRedirects: 5,
                                headers: {
                                    'Authorization': 'Bearer ' + config.Pterodactyl.apikeyclient,
                                    'Content-Type': 'application/json',
                                    'Accept': 'Application/vnd.pterodactyl.v1+json',
                                },
                                data: { "signal" : "kill"},
                            }).then(response => {
                                setTimeout(() => {
                                    axios({
                                        url: config.Pterodactyl.hosturl + "/api/client/servers/" + args[0] + "/power",
                                        method: 'POST',
                                        followRedirect: true,
                                        maxRedirects: 5,
                                        headers: {
                                            'Authorization': 'Bearer ' + config.Pterodactyl.apikeyclient,
                                            'Content-Type': 'application/json',
                                            'Accept': 'Application/vnd.pterodactyl.v1+json',
                                        },
                                        data: { "signal" : "start"},
                                    }).then(response => {
                                        message.channel.send(args[0] + ' server restarted!').then((msg2) => {
                                            setTimeout(() => {
                                                msg2.delete()
                                            }, 2000)
                                        })
                                    });
                                }, 500)
                            });
                        } else if (reaction.emoji.name == "🔴") {
                            axios({
                                url: config.Pterodactyl.hosturl + "/api/client/servers/" + args[0] + "/power",
                                method: 'POST',
                                followRedirect: true,
                                maxRedirects: 5,
                                headers: {
                                    'Authorization': 'Bearer ' + config.Pterodactyl.apikeyclient,
                                    'Content-Type': 'application/json',
                                    'Accept': 'Application/vnd.pterodactyl.v1+json',
                                },
                                data: { "signal" : "kill" },
                            }).then(response => {
                                message.channel.send(args[0] + ' server stopped!').then((msg2) => {
                                    setTimeout(() => {
                                        msg2.delete()
                                    }, 2000)
                                })
                            });
                        }
                    });

                    collector.on('end', () => {
                        msg.reactions.removeAll();
                    });
                });
            }).catch(error => {
                msg.edit("Error: Can't find a server with that ID!")
            })
        })
    }
};

/*

if (!args[1]) {
                let embed = new Discord.RichEmbed()
                    .setColor(`GREEN`)
                    .addField(`__**Server Status**__`, 'What server would you like to view? Please type: `' + config.DiscordBot.Prefix + 'server status serverid`', true)
                message.channel.send(embed)
            } else {
                message.channel.send('Fetching server...')
                axios({
                    url: config.Pterodactyl.hosturl + "/api/client/servers/" + args[1],
                    method: 'GET',
                    followRedirect: true,
                    maxRedirects: 5,
                    headers: {
                        'Authorization': 'Bearer ' + config.Pterodactyl.apikeyclient,
                        'Content-Type': 'application/json',
                        'Accept': 'Application/vnd.pterodactyl.v1+json',
                    }
                }).then(response => {
                    axios({
                        url: config.Pterodactyl.hosturl + "/api/client/servers/" + args[1] + "/resources",
                        method: 'GET',
                        followRedirect: true,
                        maxRedirects: 5,
                        headers: {
                            'Authorization': 'Bearer ' + config.Pterodactyl.apikeyclient,
                            'Content-Type': 'application/json',
                            'Accept': 'Application/vnd.pterodactyl.v1+json',
                        }
                    }).then(resources => {
                        let embedstatus = new Discord.RichEmbed()
                            .setColor('GREEN')
                            .addField('**Status**', resources.data.attributes.current_state, true)
                            .addField('**CPU Usage**', resources.data.attributes.resources.cpu_absolute + '%')
                            .addField('**RAM Usage**', pretty(resources.data.attributes.resources.memory_bytes) + '  out of UNLIMITED MB')
                            .addField('**DISK Usage**', pretty(resources.data.attributes.resources.disk_bytes) + '  out of UNLIMITED MB')
                            .addField('**NET Usage**', 'UPLOADED: ' + pretty(resources.data.attributes.resources.network_tx_bytes) + ', DOWNLOADED: ' + pretty(resources.data.attributes.resources.network_rx_bytes))
                            .addField('**NODE**', response.data.attributes.node)
                            .addField('**FULL ID**', response.data.attributes.uuid)
                            .addField('\u200b', '\u200b')
                            .addField('**LIMITS (0 = unlimited)**', 'MEMORY: ' + response.data.attributes.limits.memory + 'MB \nDISK: ' + response.data.attributes.limits.disk + 'MB \nCPU: ' + response.data.attributes.limits.cpu)
                            .addField('**MISC LIMITS**', 'DATABASES: ' + response.data.attributes.feature_limits.databases + '\nBACKUPS: ' + response.data.attributes.feature_limits.backups)
                        message.reply(embedstatus)
                    })});
            }

*/