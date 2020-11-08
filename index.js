//importing modules etc...
const Discord = require("discord.js");
const client = new Discord.Client({
  ws: {
        intents: [
          "DIRECT_MESSAGES",
          "DIRECT_MESSAGE_REACTIONS",
          "GUILDS",
          "GUILD_MEMBERS",
          "GUILD_MESSAGES",
          "GUILD_MESSAGE_REACTIONS",
        ],
  }
});
const config = require("./Tools/config");
const database = require("./Tools/database");
const fs = require("fs");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

//Commands
fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter((f) => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find any commands");
    return;
  }
  jsfile.forEach((f) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} Loaded`);
    client.commands.set(props.help.name, props);
  });
});

//Client Events
fs.readdir("./events/", (err, files) => {
  if (err) return console.log(err);
  files.forEach((f) => {
    const event = require(`./events/${f}`);
    let eventName = f.split(".")[0];
    console.log(`Event Loaded: ${f}`);
    client.on(eventName, event.bind(null, client));
  });
});

client.login(config.token);
