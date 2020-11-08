const Scam = require('../Schema/ScamSchema');
const discord = require('discord.js');

module.exports.run = async(client, message, args) => {
    let CaseInfo = args[0];
    if(!CaseInfo)return message.channel.send(`**Please Provide The Case UID**`)

    let UidInfo = await Scam.findOne({ CaseUID: CaseInfo })
    if(!UidInfo)return message.channel.send(`**No Case Found With The Provided UID**`)

    let embed = new discord.MessageEmbed()
    .setTitle(`Scam Details`)
    .setDescription(`
-----------------------------------------------------------------------

<a:bellz:766229837890453535> **__Case Reporter Was__** : \`${UidInfo.Reporter}\`

<a:planet:766229810417500180> **__Reported Person Name / Scammer Was__** : \`${UidInfo.ScammerName}\`

<a:planet:766229810417500180> **__Reported Person ID / Scammer ID Was__** : \`${UidInfo.ScammerID}\`

<a:planet:766229810417500180> **__The Description Provided__** : \`${UidInfo.ScamReason}\`

<a:planet:766229810417500180> **__Scammer Server Details__** : \`${UidInfo.ServerDetails}\`

<a:planet:766229810417500180> **__Some Attachments__** : ${UidInfo.Attachment}

-----------------------------------------------------------------------
`)         
       .setColor("RANDOM")
       .setFooter(`ScamAlert | Official`)
    message.channel.send(embed)
}
module.exports.help = {
    name: "caseinfo",
    aliases: ['case-info', 'uidinfo', 'uid-info']
}
