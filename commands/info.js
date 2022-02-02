module.exports = {
  name: "info",
  description: "shows all the information for this server.",
  execute(client, message, args, db) {

    let switchedPage = false

    let embed1 = new Discord.MessageEmbed()
      .setTitle("Learn Unity Info")
      .addField("**==--main info--==**", `
go to the #old-rules channel for the rules

most of this server is self-explanatory so i will talk about some misc stuff
the #📨jobs-offers and #📧get-a-job are for employers to give job offers and the second one is for the normal person to show off their stuff and get a job

#🎨showcase is just for showcasing or show-offing what you made but there should be no nsfw

the <#805658704769712148> is like the <#805373148458385430>  but with fibbonacci numbers. an example of fibonnaci numbers is:
1
2
1 + 2 = 3
3 + 2 = 5
5 + 3 = 8
8 + 5 = 13
and so on...`)
      .addField("**==--partnership requirements--==**", `
members: 40 (real members, not bots)
must have no nsfw
must be related to coding

yup, that's it!`)
      .addField("**==--Server-special Keywords--==**", `
for now there is only server-special keyword which is:
g/p or gd/pg - which means gamedev/programming`)
      .addField("**==--Staff Recruitment--==**",`
every month we host a staff recruitment event where the candidates who are willing to get into the staff team have to answer questions given in a form.
some questions from the test are gonna be more philosophical than the usual standard test.

if the answers are good, you're in the team as a recruit/trial mod!
after you become a recruit. you still aren't a true moderator yet, and for that you have to pass a training plan given by the admins!

+ we also promote previous staff at that time mostly chosen by the owner`)
      .addField("**==--Teachers--==**",`
Any person can become a teacher in this server. but they may have to pass a short interview to actually teach.

**here are a few rules for teachers:**

1) Do fun topics so more students join in. (kind of optional)

2) Make sure to have a preview video of what you're going to teach before the class starts and post it in 🔔class-announcements a few hours before you start the class.

3) Also mention when the class WILL start in UTC and in your local time.

4) Be expressionate and enthusiastic while teaching for students to remain engaged in the class.`)
.addField("**==--Levelling System--==**", `
Our business Email: learnunityofficial@gmail.com      
      `)
      .addField("**==--Other Stuff--==**", `
**Exceptions: Anyone can post links or images in showcase channels and help channels,these new level rules mainly apply to more general channels.**
═════════════════════════
Level 5: Gains the ability to post images
Level 10: Gains the ability to post links
Level 15: Can change their nicknames
Level 25: Can start new threads
Level 40: Ability to suggest emojis
Level 50: A custom personal role
Level 60: Becomes the Respected Member of The Community (though there are other ways to become one as well)      
      `)
      .setFooter("stay safe!")
    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("switch_page")
        .setLabel("Switch Page")
        .setStyle("PRIMARY")
    )

    message.reply({embeds: [embed1]}).then(message=>embedded_message=message)
  }
}