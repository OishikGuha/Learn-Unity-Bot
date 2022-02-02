/*------------------
THE MAIN SERVER CODE
------------------*/
/*

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
*/
/*---------------
THE MAIN BOT CODE
---------------*/

// main modules

const fs = require("fs")
const Discord = require("discord.js")
const Database = require("@replit/database")
const client = new Discord.Client({partials: ["CHANNEL"], intents: ["DIRECT_MESSAGES", "GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] })

client.commands = new Discord.Collection()

const leftUsers = [];

// main folders
const commands = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commands) {
  const command = require(`./commands/${file}`)

  client.commands.set(command.name, command)
}

// instantiation and database
const db = new Database()

/*db.list().then(keys => {
  for (let i = 0; i < keys.length; i++) {
    db.get(keys[i]).then(value => {
      console.log(keys[i] + ":" + value)
    })
  }
});

db.set("placeholder", 0)
*/
// main code
const prefix = process.env.PREFIX

client.on("ready", () => {
  console.log("started!")
  console.log("------------------------")
})

// welcome the user
client.on('guildMemberAdd', member => {
  console.log(member.displayName + " has Joined the server: " + member.guild.name + "!");

  /*db.get(member.guild.id['general-channel']).then(channel=>{
    let chan = member.guild.channels.cache.get(channel);

    if(chan) {
      chan.send("Welcome **" + member.displayName + "**!")
    }
    else {
      console.log("general channel not defined!")
    }
  })*/
});

client.on('guildMemberRemove', member => {
  console.log(member.displayName + " has Left the server: " + member.guild.name + "!");
  member.createDM().then(channel => {
    const embed = new Discord.MessageEmbed()
      .setTitle("Hi, " + member.user.username + "!")
      .setDescription("We are sorry to see you go! We hope to see you back soon! Meanwhile, please feel free to send your feedback!")
      .setColor('RANDOM')
      .setFooter("Automated message | Only the first message will be counted as feedback");
    channel.send({embeds: [embed]});
  });

  leftUsers.push(member.user.id);
  console.log(leftUsers);
});

client.on("messageCreate", msg => {
  if (msg.channel.type == 'DM')
  {
    console.log("DM Recieved!")

    if (leftUsers.includes(msg.author.id))
    {
      console.log("Feedback Recieved!")

      const feedbackChannel = client.guilds.cache.first().channels.cache.find(channel => channel.id == '924559501695270952');

      if (feedbackChannel)
      {
        const feedbackEmbed = new Discord.MessageEmbed()
          .setAuthor(msg.author.username, msg.author.avatarURL())
          .setTitle("Feedback from " + msg.author.username)
          .setDescription(msg.content)
          .setColor('RANDOM');

        feedbackChannel.send({embeds: [feedbackEmbed]});
      }
      else
      {
        console.log("Feedback channel not found!")
      }
    }
  }

  // if the message starts with a prefix and the message author isn't the bot, then proceed.
  if (msg.content.startsWith(prefix) && msg.author != client.user) {
    // get arguments from the message by splitting it in copy-pasted regex code
    let args = msg.content.slice(prefix.length).split(/ (?=(?:(?:[^"]*"){2})*[^"]*$)/g)
    // fix them arguments
    fixArgs(args)

    // get the first element of the arguments which should be the command
    const command = args[0].toLowerCase()

    // if the command exists in the list, then execute it. if it doesn't, then say that command doesn't exist.
    // also check for the database
    if (client.commands.get(command)) {
      client.commands.get(command).execute(client, msg, args, db)
    } else {
      msg.reply(`"\`${command}\`"` + " doesn't exist!")
    }
  }
})

// client.on("interactionCreate", async(interaction) => {
//   if(interaction.isButton()){
//     if(interaction.customId=="switch_page") {
//       interaction.reply(`${interaction.user}`)
//     }
//   }
// })

function fixArgs(args) {
  for (let i = 0; i < args.length; i++) {
    if (args[i] == '') {
      args.splice(args[i], 1)
    }

    if (args[i].includes('"')) {
      args[i] = args[i].replaceAll('"', '')
    }
  }
}

console.log('========--========')
client.login("OTMzNDY0OTg3NjM1MTYzMTc2.Yeh7Aw.qq0YjDUtFlmaY8Hh333joqcCGwk");
