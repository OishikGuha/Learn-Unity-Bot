
const Database = require("@replit/database")

const db = new Database()

db.list().then(keys => {
  for(let i = 0; i < keys.length; i++) {
    db.delete(keys[i]).then(()=>{console.log("deleted: " + keys.length + " objects!")})
  }
});
