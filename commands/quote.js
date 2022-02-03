var axios = require("axios");
var talkedRecently = require("../TempDataBase.json")["usersWhoQuoted"]

module.exports = {
  name: "quote",
  description: "generates a random quote",
  execute(client, message, args, db) {
    username = message.author.username

    // for cooldown
    if(talkedRecently.includes(username)) {
      message.reply(`sorry ${username} you are in a 25 second cooldown!`)
    }
    else {
      talkedRecently.push(username)
      console.log(talkedRecently)

      // Uses the api to send the quote.
      var options = {
        method: 'GET',
        url: 'https://goquotes-api.herokuapp.com/api/v1/random?count=1',
      };

      axios.request(options).then(function (response) {
        let data = response.data.quotes[0].text
        let author = response.data.quotes[0].author
        console.log("a quote was requested!");
        message.channel.send("\"" + data + "\"\n-" + author + "\n *Requested by: <@" + message.author.id + ">*")
      }).catch(function (error) {
        console.error(error);
      });

      setTimeout(()=>{
        talkedRecently.splice(talkedRecently.indexOf(username),1)
        console.log(talkedRecently)
      }, 25000)
    }

  }
}