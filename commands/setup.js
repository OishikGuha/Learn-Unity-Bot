const db = require("@replit/database")

module.exports = {
  name: "setup",
  description: "the setup for the bot",
  execute(client, message, args, db) {
    if(message.member.id === '534753711915008001') {
      if(args.length > 1) {
        let roleId = args[1].replace("<", "").replace(">", "").replace("@", "").replace("&","")
        let role = message.member.roles.cache.get(roleId)

        let memberServer = message.member.guild
        // console.log(role.name)
        if(role !== undefined) {
          db.get(memberServer.id).then(value => {
            db.set(value["staff-role"], role).then(()=>{
              console.log(value.keys)
              message.reply("Setup complete! and here is the role: " + role.name)
            })
          })
        }
        else if(role === undefined) {
          message.reply(args[1] + " doesn't exist!")
        }
      }
    }
  }
}