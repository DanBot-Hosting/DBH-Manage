const exec = require('child_process').exec;
exports.run = (client, message, args) => {
  if (message.author.id == "137624084572798976") {

    const start = process.hrtime();

    exec(`${args.join(" ")}`, (error, stdout) => {

      let response = (error || stdout);
      
      if (response.length > 1024) console.log(response), response = 'Output too long.';
      const end = process.hrtime(start);

      message.channel.send("", {
        embed: new Discord.MessageEmbed()
          .setDescription("```" + response + "```")
          .setTimestamp()
          .setColor("RANDOM")
      })

    });

  }
}