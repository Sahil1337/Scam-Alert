const Scam = require("../Schema/ScamSchema");
const discord = require("discord.js");
let UID = require("../Tools/ScamUID.js");
const { owner } = require("../Tools/config");

module.exports.run = async (client, message) => {
  if (owner.includes(message.author.id)) {
    const filter = (m) => m.author.id === message.author.id;

    let CaseUID;
    let Name;
    let ID;
    let Server;
    let reason;
    let reporter;
    let attachments;

    CaseUID = UID.number(6);

    message.channel.send(
      "<:Green:765920149071986728>  **Please Tell The Scammer ID**"
    );
    let collector = new discord.MessageCollector(message.channel, filter, {
      max: 1,
    });
    collector.on("collect", async (message, col) => {
      ID = message.content;
      if (isNaN(ID))
        return message.channel.send(`**Please Provide A Valid ID**`);
      let FindInIDs = await Scam.findOne({ ScammerID: ID });
      if (FindInIDs)
        return message.channel.send(`**Kiddo Already On ScamList**`);
      collector.stop();

      message.channel.send(
        "<:Green:765920149071986728> **Please Tell The Scammer UserName**"
      );
      let collector2 = new discord.MessageCollector(message.channel, filter, {
        max: 1,
      });
      collector2.on("collect", (message, col) => {
        Name = message.content;
        collector2.stop();

        message.channel.send(
          "<:Green:765920149071986728> **Please Tell The Scammer Server Name , ID**"
        );
        let collector3 = new discord.MessageCollector(message.channel, filter, {
          max: 1,
        });
        collector3.on("collect", (message, col) => {
          Server = message.content;
          collector3.stop();

          message.channel.send(
            "<:Green:765920149071986728> **Please Explain How The Scam Happend**"
          );
          let collector4 = new discord.MessageCollector(
            message.channel,
            filter,
            { max: 1 }
          );
          collector4.on("collect", (message, col) => {
            reason = message.content;
            collector4.stop();

            message.channel.send(
              "<:Green:765920149071986728> **Can You provide Some Screen Shots ( Links Of Screen Shot )**"
            );
            let collector5 = new discord.MessageCollector(
              message.channel,
              filter,
              { max: 1 }
            );
            collector5.on("collect", (message, col) => {
              attachments = message.content;
              if (!attachments.startsWith("https://"))
                return message.channel.send(
                  `**This Was Not A Correct Link Of AttachMent Please Run The Command Again** `
                );
              collector5.stop();

              message.channel.send(
                "<:Green:765920149071986728> **Okay Ty !! For Reporting A Scammer , Can You Tell Me The UserName Of The Kind Reporter**"
              );
              let collector6 = new discord.MessageCollector(
                message.channel,
                filter,
                { max: 1 }
              );
              collector6.on("collect", (message, col) => {
                reporter = message.content;
                collector6.stop();

                let data = new Scam({
                  Collection: "ScamCollection",
                  ScammerID: ID,
                  ScammerName: Name,
                  CaseUID: CaseUID,
                  ServerDetails: Server,
                  ScamReason: reason,
                  Attachment: attachments,
                  Reporter: reporter,
                });
                data.save();

                let Success = new discord.MessageEmbed()
                  .setTitle("ADDED SCAMMER TO LIST")
                  .setColor("RANDOM")
                  .setFooter("ScamAlert | Official").setDescription(`
        __**Case UID**__ - \`${CaseUID}\`

        
<a:bellz:766229837890453535> **__Reporter__** : \`${reporter}\`
        
<a:planet:766229810417500180> **__Scammer__** : \`${Name}\`
        
<a:planet:766229810417500180> **__Scammer ID__** : \`${ID}\`
        
<a:planet:766229810417500180> **__Description__** : \`Can Be Found By Doing a!caseinfo <UID>\`

<a:planet:766229810417500180> **__Attachments__** : \`Can Be Found By Doing a!caseinfo <UID>\`
        
<a:planet:766229810417500180> **__Scammer Server__** : \`${Server}\`
        `);
                message.channel.send(Success);
              });
            });
          });
        });
      });
    });
  }
};
module.exports.help = {
  name: "uadd",
  aliases: ["useradd"],
};
