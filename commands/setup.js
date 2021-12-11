const db = require("@replit/database")

module.exports = {
  name: "setup",
  description: "the setup for the bot",
  execute(client, message, args, db) {
    let role = message.member.roles.cache.get(args[1].replace("<", "").replace(">", "").replace("@", "").replace("&",""))

    if(role !== undefined) {
      db.set("staff-role", role).then(()=>{
        message.reply("Setup complete!")
      })
    }
    else if(role === undefined) {
      message.reply(args[1] + " doesn't exist!")
    }
  }
}