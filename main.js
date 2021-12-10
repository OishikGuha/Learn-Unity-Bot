// main modules

const fs = require("fs")
const dotenv = require("dotenv")
const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

client.commands = new Discord.Collection()

// main folders
const commands = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commands) {
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
}

dotenv.config()
const prefix = process.env.PREFIX

client.on("ready", () => {
    console.log("started!")
    const channel = client.channels.cache.get("779019452330410058")
    channel.send("**started!**")
})

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
        if (client.commands.get(command)) {
            client.commands.get(command).execute(client, msg, args)
        } else {
            msg.reply(`"\`${command}\`"` + " doesn't exist!")
        }
    }
})

function fixArgs(args) {
    for (let i = 0; i < args.length; i++) {
        if (args[i] == '') {
            args.splice(args[i], 1)
        }

        if (args[i].includes('"')) {
            console.log("contains: " + args[i])
            args[i] = args[i].replaceAll('"', '')
            console.log("contains2: " + args[i])
        }
    }
}

client.login(process.env.TOKEN)