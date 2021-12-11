Discord = require("discord.js")

module.exports = {
  name: "help",
  description: "help command",
  execute(client, message, args, db) {
    let embed = new Discord.MessageEmbed().setTitle("Help").setDescription("List of Commands:")

    client.commands.forEach((v, k)=>{
      embed.addField(k, v.description)
    })

    message.reply({ embeds: [embed] })
  }
}