exports.run = async (client, message, args) => {
    const prefix = settings.fetch(message.guild.id).prefix
    const embed = new Discord.MessageEmbed()
        .addField('**Server commands**', `\`${prefix}list\` | List all the servers you own`, true)
        .addField('**Misc commands**', `\`${prefix}uptime\` | See bot uptime.`, true)
    message.channel.send(embed)
};