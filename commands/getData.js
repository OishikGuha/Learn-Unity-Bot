module.exports = {
  name: 'getdata',
  description: "Gets data from the replit db",
  execute(client, message, args, db) {
    // get the server the message is in
    let memberServer = message.member.guild
    // get the database of that message's server
    db.get(memberServer.id).then(serverData => {
      // get the staff role from it's database
      db.get(serverData["staff-role"]).then(value=> {
        if(message.member.roles.cache.some(role => role.name === value.name)) {
          db.list().then((keys) => {
            db.list().then(keys => {
              for(let i = 0; i < keys.length; i++) {
                db.get(keys[i]).then(value=>{
                  message.reply(
                  "------------------" + 
                  "\n key: " + keys[i] 
                  + "\n value: " + value + 
                  "\n ------------------")
                })   
              }
            })
          })
        }
        else {
          message.reply("user not authorized.")
        }
      })
    })
  }
}