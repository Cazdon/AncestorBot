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
})

client.on('message', (receivedMessage) => { 
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
        return
    }

    //If the message is a command, use the process Command
    if (receivedMessage.content.startsWith("a!")) {
        processCommand(receivedMessage)
    }
})

//The main processor of commands.
function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the excalamtion is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be arguments

    if (primaryCommand == "resolve") {
        resolveCommand(arguments, receivedMessage)
    } else if (primaryCommand == "quote") {
        
    }
     else {
        receivedMessage.channel.send("I don't understand the command. Try `a!resolve`")
    }
}


function resolveCommand(arguments, receivedMessage) {
    const virtueChance = 0.25;

    let resolveRoll = Math.random();

    if (resolveRoll <= virtueChance) {
        receivedMessage.channel.send("Virtue!")
        let virtueRoll = Math.random();
        //courageous
        if (virtueRoll >= 0.0 && virtueRoll <= 0.2) {
            receivedMessage.channel.send("Courageous!")
        }
        //vigorous
        else if (virtueRoll >= 0.2 && virtueRoll <= 0.4) {
            receivedMessage.channel.send("Vigorous!")
        }
        //focused
        else if (virtueRoll >= 0.4 && virtueRoll <= 0.6) {
            receivedMessage.channel.send("Focused!")
        }
        //powerful
        else if (virtueRoll >= 0.6 && virtueRoll <= 0.8) {
            receivedMessage.channel.send("Powerful!")
        }
        //stalwart
        else if (virtueRoll >= 0.8 && virtueRoll <= 1.0) {
            receivedMessage.channel.send("Stalwart!")
        }
    } else {
        receivedMessage.channel.send("Affliction!")
        let afflictionRoll = Math.random();
        //Abusive
        if (afflictionRoll >= 0.00 && afflictionRoll <= 0.14) {
            receivedMessage.channel.send("Abusive!")
        }
        //Fearful
        else if (afflictionRoll >= 0.14 && afflictionRoll <= 0.28) {
            receivedMessage.channel.send("Fearful!")
        }
        //Paranoid
        else if (afflictionRoll >= 0.28 && afflictionRoll <= 0.42) {
            receivedMessage.channel.send("Paranoid!")
        }
        //Hopeless
        else if (afflictionRoll >= 0.42 && afflictionRoll <= 0.56) {
            receivedMessage.channel.send("Hopeless!")
        }
        //Selfish
        else if (afflictionRoll >= 0.56 && afflictionRoll <= 0.70) {
            receivedMessage.channel.send("Selfish!")
        }
        //Masochistic
        else if (afflictionRoll >= 0.70 && afflictionRoll <= 0.84) {
            receivedMessage.channel.send("Masochistic!")
        }
        //Irrational
        else if (afflictionRoll >= 0.84 && afflictionRoll <= 1.00) {
            receivedMessage.channel.send("Irrational!")
        }
    }
}



bot_secret_token = "YourBotTokenHere"

client.login(bot_secret_token)