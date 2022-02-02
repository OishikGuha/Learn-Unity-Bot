var axios = require("axios");

module.exports = {
  name: "quote",
  description: "generates a random quote",
  execute(client, message, args, db) {
    var options = {
      method: 'GET',
      url: 'https://goquotes-api.herokuapp.com/api/v1/random?count=1',
    };

    axios.request(options).then(function (response) {
      let data = response.data.quotes[0].text
      let author = response.data.quotes[0].author
      console.log("a quote was requested!");
      message.channel.send(data + "\n-" + author)
    }).catch(function (error) {
      console.error(error);
    });
  }
}