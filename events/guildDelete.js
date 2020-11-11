module.exports = (client, guild) => {

    //Announce in console about the new server join
    console.log(chalk.red("[Guild Remove] " + guild.name + ", Owner: " + guild.owner))

    //Delete guild settings
    settings.delete(guild.id)
};