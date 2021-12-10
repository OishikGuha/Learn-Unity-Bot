const database = require("@replit/database")

module.exports = {
  name: "setup",
  description: "set up for the bot.",
  execute(client, message, args, db) { 
    db.get("setupRunning").then(setupRunning => {
      if(setupRunning) {

          // get bot commands channel
          message.reply("please input the bot commands channel.")
          client.on("messageCreate", (msg)=>{
            if(message.author == msg.author) {

              // get channel
              let channel = client.channels.cache.get(msg.content.replace("<", "").replace("#", "").replace(">", ""))

              db.set("setupRunning", false).then(value=>{

                if(channel) {
                  db.set("bot-channel", channel);
                  msg.reply("done setup!")
                }
                else {
                  msg.reply(`\`${msg}\` isn't a channel!`)
                }
            })
          }
        })
      }
    })
  }
}