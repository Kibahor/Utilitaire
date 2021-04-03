const Discord = require('discord.js');
const {red,blue}=require('../config.json');
//EMBED

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : ToEmbed()
// DESCRIPTION : Renvoie le message en embed
let ToEmbed= function(message){
    let MsgEmbed = new Discord.MessageEmbed()
      .setColor(blue)
      .setDescription(message)
    return MsgEmbed;
};
module.exports.ToEmbed = ToEmbed
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : ToEmbed1()
// DESCRIPTION : Renvoie le message + titre en embed
let ToEmbed1= function(title,message){
    let MsgEmbed = new Discord.MessageEmbed()
      .setColor(blue)
      .setTitle(title)
      .setDescription(message)
    return MsgEmbed;
};
module.exports.ToEmbed1 = ToEmbed1
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : ToEmbedWarning()
// DESCRIPTION : Renvoie le message en embed (couleur: rouge + exclamation emoji)
let ToEmbedWarning= function(message){
    let MsgEmbed = new Discord.MessageEmbed()
      .setColor(red)
      .setDescription("<:exclamation:811748558033649696>"+ message)
    return MsgEmbed;
};
module.exports.ToEmbedWarning = ToEmbedWarning
//////////////////////////////////////////////////////////////////////////////////////////////////////////
