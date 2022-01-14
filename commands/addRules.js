const Discord = require('discord.js');

module.exports = {
  name: "addrules",
  description: "parameters: channel \n this comand add rules to the given channel. only available to the owner.",
  execute(client, message, args, db) {
    message.reply(args)
    let guild = message.member.guild;

    db.get(guild.id).then(data => {
      if(message.member.id === "534753711915008001") {

        // get the channel but remove all the extra characters
        const channel = client.channels.cache.get(args[1].replace("<", "").replace(">", "").replace("#", ""))

        if(channel !== undefined) {
          let embed = new Discord.MessageEmbed()
          .setTitle("**Rules**")
          .addField("1)","No inappropriate nicknames or profil pictures.")
          .addField("2)", "Don't be toxic.")
          .addField("3)","Act well and civil in voice chats and text channels.")
          .addField("4)","Follow discord TOS.")
          .addField("5)","No mature (18+) content.")
          .addField("6)","Profanities are allowed, but only for humour. breaking this and continuously spamming profanities will get you kicked.")
          .addField("7)","No racism allowed (for example, saying \"the n word\" will get you instantly kicked).")
          .addField("8)","Don't send links with malware or else will it result in an immediate and permanent ban.")
          .addField("9)","Don't post server advertisements in 🎨showcase (other kinds of advertisements are allowed).")
          .addField("10)", "Don't start complaining for pings if you have any of these roles challenger, student, notifications-on, teacher or anyone in staff.")
          .addField("11)","No exploitation of the server. ")
          .addField("12)","No cross posting around channels. ")
          .addField("13)","Ping the mods if nobody follows these rules.")
          .addField("14)","Only English allowed except in 🗑off-topic  and 🌍other-languages .")
          .addField("15)","No staff impersonation.");

          channel.send({embeds:[embed]})
        }
        else {
          message.reply(`"{args[1]}" doesn't exist!`);
        }
      }
    })    
  }
}