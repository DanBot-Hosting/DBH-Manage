module.exports = (client, guild) => {

    //Announce in console about the new server join
    console.log(chalk.green("[New Guild] " + guild.name + ", Owner: " + guild.owner))

    //Set the guild settings.
    settings.set(guild.id, {
        "prefix": config.defaultSettings.Prefix
    });
};