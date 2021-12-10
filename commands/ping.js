module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    execute(client, message, args) {
        message.reply('calculating ping...').then(resultMessage => {
          const ping = resultMessage.createdTimestamp - message.createdTimestamp;
          message.reply(`ping: ${ping}ms`);
        })
    }
}