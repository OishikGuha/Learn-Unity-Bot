/*------------------
THE MAIN SERVER CODE
------------------*/

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

/*---------------
THE MAIN BOT CODE
---------------*/

// main modules

const fs = require("fs")
const Discord = require("discord.js")
const Database = require("@replit/database")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] })

client.commands = new Discord.Collection()

// main folders
const commands = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commands) {
  const command = require(`./commands/${file}`)

  client.commands.set(command.name, command)
}

// instantiation and database
const db = new Database()

db.list().then(keys => {
  for (let i = 0; i < keys.length; i++) {
    db.get(keys[i]).then(value => {
      console.log(keys[i] + ":" + value)
    })
  }
});

db.set("placeholder", 0)

// main code
const prefix = process.env.PREFIX

client.on("ready", () => {
  console.log("started!")
  console.log("------------------------")
})

// welcome the user
client.on('guildMemberAdd', member => {
  console.log(member.displayName + " has Joined the server: " + member.guild.name + "!");

  db.get(member.guild.id['general-channel']).then(channel=>{
    let chan = member.guild.channels.cache.get(channel);

    if(chan) {
      chan.send("Welcome **" + member.displayName + "**!")
    }
    else {
      console.log("general channel not defined!")
    }
  })
});

client.on("messageCreate", msg => {
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
client.login(process.env.TOKEN)
