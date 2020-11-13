exports.run = async (client, message, args) => {
    message.channel.send('Loading the servers you own!').then((msg) => {
        var arr = [];
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
            if (response.data.error == "No account found for that user!") {
                msg.edit('This account is not linked. Want to link it? Find out how here!')
            } else {
                axios({
                    url: config.Pterodactyl.hosturl + "/api/application/users/" + response.data.consoleID + "?include=servers",
                    method: 'GET',
                    followRedirect: true,
                    maxRedirects: 5,
                    headers: {
                        'Authorization': 'Bearer ' + config.Pterodactyl.apikey,
                        'Content-Type': 'application/json',
                        'Accept': 'Application/vnd.pterodactyl.v1+json',
                    }
                }).then(response => {
                    const preoutput = response.data.attributes.relationships.servers.data
                    arr.push(...preoutput)
                    console.log(preoutput)
                    setTimeout(() => {
                        var clean = arr.map(e => "Server Name: `" + e.attributes.name + "`, Server ID: `" + e.attributes.identifier + "`\n")
                        let embed = new Discord.MessageEmbed()
                            .addField('The servers you own: ', clean)
                        msg.edit("", embed)
                    }, 2000)
                })
            }
        });
    })  
};