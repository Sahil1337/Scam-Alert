const Scam = require('../Schema/ScamSchema');
const discord = require('discord.js');
let UID = require('../Tools/ScamUID.js')

module.exports.run = async(client, message, args) => {

let element = args[0];
if(!element)return message.channel.send(`**Please Provide The Case UID To Remove From ScamList**`)
Scam.findOneAndDelete({ CaseUID: element }, (err, data) => {
   if(err)return message.channel.send(err)
   if(!data)return message.channel.send(`**No Case Or Scammer Found With This UID**`)

   let embed = new discord.MessageEmbed()
   .setTitle(`Removed Case From ScamList`)
   .setColor("RANDOM")
   .setFooter('ScamAlert | Official')
   .setDescription(`
__Case UID__ : ${element}

**Now The Case Has Been Removed From The ScamList**`)
message.channel.send(embed)
})
    
}
module.exports.help = {
    name: "remove",
    aliases: ['user-remove']
}
