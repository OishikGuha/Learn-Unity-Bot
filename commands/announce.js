module.exports = {
  name: "announce",
  description: "a command to announce to various channels",
  execute(client, message, args, db) {

    let guild = message.member.guild

    // if there are more than 2 arguments, then it will proceed. if it doesn't have, then it will reply to the user about it.
    db.get(guild.id).then(data=>{
      db.get(data["staff-role"]).then(value => {
        if(message.member.roles.cache.some(role => role.name === value.name)) {
          if (args.length > 2) {
            let sentMessage;

            // get the channel but remove all the extra characters
            const channel = client.channels.cache.get(args[1].replace("<", "").replace(">", "").replace("#", ""))

            // if channel exists, then send message to the given channel and reply to the user that the message has been sent.
            if (channel) {
              sentMessage = channel.send(args[2])
              message.reply("reply sent in " + `${channel}`)
            } else {
              // if it doesn't exist, then reply to the user that the given channel doesn't exist
              message.reply(`${args[2]} doesn't exist!`)
            }
          } 
          else {
            message.reply("There should be two arguments: `channel` and `message`")
          }
        }
        else {
          message.reply("user not authorized.")
        }
      })
    })
  }
}