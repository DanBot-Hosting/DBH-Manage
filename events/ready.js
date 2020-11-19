const exec = require('child_process').exec;
const DanBotHosting = require("danbot-hosting");
module.exports = async (client, guild, files) => {

    //Login message
    console.log(chalk.magenta('[DISCORD] ') + chalk.green(client.user.username + " has logged in!"));

    //Auto Activities List
    const activities = [{
            "text": "users manage their server",
            "type": "WATCHING"
        }
    ];
    setInterval(() => {
        const activity = activities[Math.floor(Math.random() * activities.length)];
        client.user.setActivity(activity.text, {
            type: activity.type
        });
    }, 30000);

    //Automatic 30second git pull.
    setInterval(() => {
        exec(`git pull`, (error, stdout) => {
            let response = (error || stdout);
            if (!error) {
                if (response.includes("Already up to date.")) {
                    //console.log('Bot already up to date. No changes since last pull')
                } else {
                    client.channels.get('766068015686483989').send('**[AUTOMATIC]** \nNew update on GitHub. Pulling. \n\nLogs: \n```' + response + "```" + "\n\n\n**Restarting bot**")
                    setTimeout(() => {
                        process.exit();
                    }, 1000)
                };
            }
        })
    }, 30000)

    //Post to DBH
    const API = new DanBotHosting.Client(config.Misc.DBHkey, client);
 
    // Start posting
    let initalPost = await API.autopost();
 
    if (initalPost) {
        console.log(initalPost);
    }
}