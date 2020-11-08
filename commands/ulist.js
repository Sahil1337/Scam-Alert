const { MessageEmbed } = require("discord.js");
const Scam = require("../Schema/ScamSchema");
let tool = require("lodash");

module.exports.run = async (client, message, args) => {
  let ErrorEmbed = new MessageEmbed()
    .setTitle(`:x: Error`)
    .setDescription(`<a:bach_gaye:771967681665433612> | **No Scammers Found**`)
    .setColor(`RANDOM`)
    .setTimestamp()
    .setFooter(`ScamAlert | Official`);

  Scam.find({ Collection: "ScamCollection" }, async (err, data) => {
    if (err) return message.channel.send(err);
    if (!data) return message.channel.send(ErrorEmbed);

    if (data && data.length) {
      let array = await Promise.all(
        data.map(
          (m) =>
            `<a:nitro2:766229891188260884> **__Name__** : \`${m.ScammerName}\` | **__ID__** : \`${m.ScammerID}\` | **__Server Details__** : \`${m.ServerDetails}\` | **__Case UID__** : \`${m.CaseUID}\``
        )
      );
      array = await tool.chunk(array);
      array = await Promise.all(
        array.map((uScam) => {
          let ScamEmbed = new MessageEmbed()
            .setTitle(`Scammers List`)
            .setDescription(`${uScam.join("\n\n")}`)
            .setColor("RANDOM")
            .setFooter(
              `${message.author.username} You Can Get Details About The Case By Doing a!caseinfo <uid>`
            );
          message.channel.send(ScamEmbed);
        })
      );
    }
  });
};
module.exports.help = {
  name: "ulist",
  aliases: ["scam-list", "list"],
};
