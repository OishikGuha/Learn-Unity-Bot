module.exports = {
  name: 'getdata',
  description: "Gets data from the replit db",
  execute(client, message, args, db) {
    db.list().then((keys) => 
    {
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
}