const Discord = require("discord.js");
const Topics = require("../topics.json");

module.exports = {
    name: 'topic',
    description: "Sends a random topic from the database",

    /***
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     * @param {string[]} args
     */
    execute(client, message, args) {
        if (message.member.roles.cache.has('805170099848872006'))
        {
            const general = message.guild.channels.cache.get(Topics.generalChannel);
            const randomTopic = Topics.topics[Math.floor(Math.random() * Topics.topics.length)];
            general.send("<@&807179957997928458> **Topic:** " + randomTopic);
        }
        else
        {
            message.reply("You do not have the required permissions to use this command!");
        }
    }
}
