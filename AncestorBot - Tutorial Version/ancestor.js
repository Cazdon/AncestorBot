const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    // Lists that the bot is logged in
    console.log("Connected as" + client.user.tag)

    // List servers the bot is connected to
    console.log("Servers:")
    client.guilds.forEach((guild) => {
       console.log(" - " + guild.name)

        // List all channels
       guild.channels.forEach((channel) => {
           console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
       })
    })
    
    // Post a message to a channel
    var generalChannel = client.channels.get("560864345920110604")
    generalChannel.send("Do you remember our venerable house? Opulent and imperial?")

    // Provide a path to a local file and post the file
    const localFileAttachment = new Discord.Attachment('C:\\workspace\\bot side project\\Ancestor Bot\\stress.png')
    generalChannel.send(localFileAttachment)

    // Provide a URL to a web file and post the file
    const webAttachment = new Discord.Attachment('https://gamepedia.cursecdn.com/darkestdungeon_gamepedia/4/43/Irrational.png')
    generalChannel.send(webAttachment)

    // Set bot status to: "Playing with JavaScript"
    client.user.setActivity("with JavaScript")

    // Alternatively, you can set teh activity to any of the folllowing:
    // PLAYING, STREAMING, LISTENING, WATCHING
    // For example:
    // client.user.setActivity("TV", {type: "WATCHING"})
})

client.on('message', (receivedMessage) => { 
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
        return
    }

    // Check if the bot's user was tagged in the message.
    if (receivedMessage.content.includes(client.user.toString())) {
        // Send acknowledgement message
        receivedMessage.channel.send(receivedMessage.author.toString() + " has mentioned me by name.")

        return
    }

    //If the message is a command, use the process Command
    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage)
    }

    // Reads any message in any channel it has access to, and then posts the sender and the message.
    receivedMessage.channel.send("Message received from : " + receivedMessage.author.toString() + " : " + receivedMessage.content)

})

//The main processor of commands.
function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the excalamtion is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be arguments

    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "multiply") {
        multiplyCommand(arguments, receivedMessage)
    } else if (primaryCommand == "ping") {
        pingCommand(arguments, receivedMessage)
    } else {
        receivedMessage.channel.send("I don't understand the command. Try `!help` or `!multiply`")
    }
}
//The help command should list all the commands available without an argument, and accept a command as an argument to display said commands usage.
function helpCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.channelsend("It looks like you might need help with " + arguments)
    } else {
        receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
    }
}
//Takes any number of passed in arguments that are numbers, and multiplies them.
function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough values to multiply. Try !`multiply 2 4 10` or `!multiply 5.2 7`")
        return
    }
    let product = 1
    arguments.forEach((value) =>  {
        product = product * parseFloat(value)
    })
    if (isNaN(product)) {
        receivedMessage.channel.send("Please input numbers instead.")
    } else {
        receivedMessage.channel.send("The product of " + arguments + " multiplied together is: " + product.toString())
    }
}

//Returns Pong! to the user.
function pingCommand(arguments, receivedMessage) {
    receivedMessage.channel.send("Pong!");
}

//Oh dear, this token is out in the open for all to see. Should probably do something about that.
bot_secret_token = "YourBotTokenHere"

client.login(bot_secret_token)