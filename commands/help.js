exports.run = async (client, message, args) => {
    const prefix = settings.fetch(message.guild.id).prefix
    const embed = new Discord.MessageEmbed()
        .addField('**Server commands**', `\`${prefix}list-servers\` | List all the servers you own \n\`${prefix}server-status\` | Checks a servers status and gives you power options`, true)
        .addField('**Misc commands**', `\`${prefix}uptime\` | See bot uptime. \n\`${prefix}check\` | Checks if you are linked to an account`, true)
    message.channel.send(embed)
};