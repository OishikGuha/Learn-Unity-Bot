var unirest = require("unirest");

module.exports = {
  name: "quote",
  description: "generates a random quote",
  execute(client, message, args, db) {
    var unirest = require("unirest");

    var req = unirest("POST", "https://andruxnet-random-famous-quotes.p.rapidapi.com/");

    req.query({
      "cat": "movies",
      "count": "10"
    });

    req.headers({
      "x-rapidapi-key": "7852ca23a6mshc869aaac77dccefp16088fjsn494442bc826c",
      "x-rapidapi-host": "andruxnet-random-famous-quotes.p.rapidapi.com",
      "useQueryString": true
    });


    req.end(function (res) {
      if (res.error) throw new Error(res.error);

      console.log(res.body);
    });
  }
}