require("@replit/database")
// generate different databases for different servers
db.list().then(keys => {
  if (keys.length < 2) {
    for (let i = 0; i < client.guilds.cache.size; i++) {
      db.set(client.guilds.cache.at(i).id, {})
    }
  }
})

console.log("------------------------")
db.list().then(keys => {
  for (let i = 0; i < keys.length; i++) {
    console.log(keys[i])
  }
});