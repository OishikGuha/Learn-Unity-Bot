module.exports = {
  name:"general",
  description: "a command for defining the general channel",
  execute(client, message, args, db) {

    if(args.length > 1) {
      let guild = message.member.guild;
      db.get(guild.id).then(data=>{
        db.get(data['staff-role']).then(value=>{
          if(message.member.roles.cache.some(role=>role.name===value.name) || message.member.id === '534753711915008001') {

            let channelId = args[1].replace("<", "").replace(">", "").replace("#", "")
            channel = guild.channels.cache.get(channelId)
            if(channel) {
              db.set(data['general-channel'], channelId).then(()=>{
                message.reply("Completed! Here is the channel ID: " + channelId)
              });
            }
            else {
              message.reply("not a valid channel!")
            }

          }
          else {
            message.reply("user not authorized.")
          }
        });
      });
    }
    else {
      message.reply("this command needs one argument!")
    }
  }
}