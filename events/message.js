module.exports = (client, message) => {
        if (settings.get(message.guild.id) == null) {
            settings.set(message.guild.id, {
                "prefix": config.defaultSettings.Prefix
            });
        } else {
                const prefix = settings.get(message.guild.id).prefix;
                if (message.content.indexOf(prefix) !== 0) return;
                const args = message.content.slice(prefix.length).trim().split(/ +/g);
                const commandargs = message.content.split(' ').slice(1).join(' ');
                const command = args.shift().toLowerCase();
                if (message.author.id === "137624084572798976") {
                console.log(`[${message.author.username}] [${message.author.id}] >> ${prefix}${command} ${commandargs}`);
                try {
                    let commandFile = require(`../commands/${command}.js`);
                    commandFile.run(client, message, args);
                } catch (err) {
                    if (err instanceof Error && err.code === "MODULE_NOT_FOUND") {
                        return;
                    }
                }
            } else if (command === "dbd") {
                console.log(`[${message.author.username}] [${message.author.id}] >> ${prefix}${command} ${commandargs}`);
                try {
                    let commandFile = require(`../commands/${command}.js`);
                    commandFile.run(client, message, args);
                } catch (err) {
                    if (err instanceof Error && err.code === "MODULE_NOT_FOUND") {
                        return;
                    }
                }
            }
        }
};