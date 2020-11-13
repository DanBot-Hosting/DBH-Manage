exports.run = async (client, message, args) => {
    message.channel.send('Checking if this account is linked \n\n*This could take a few seconds*').then((msg) => 
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
            let embed = new Discord.MessageEmbed()
                .setColor(`GREEN`)
                .addField(`__**Username**__`, response.data.username)
                .addField(`__**Linked Date (DD/MM/YY)**__`, response.data.linkDate)
                .addField(`__**Linked Time**__`, response.data.linkTime)
        msg.edit("This account is linked!", embed)
        }
    }).catch(error => {
        msg.edit("Error: DanBot Hosting bot is offline. Please try again later!")
    }));
};