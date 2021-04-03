//https://evdokimovm.github.io/javascript/nodejs/2016/06/13/NodeJS-How-to-Use-Functions-from-Another-File-using-module-exports.html
const fs = require('fs');
const Discord=require('discord.js')

const blue='#3e77f5';
const red='#c40c0c';

let IsFileExist= function(PathToFilename){
    try{//Si le fichier existe on return true
      let fichier=fs.readFileSync(PathToFilename);
      return true
    }catch(error){//Si il y a une erreur il n'existe pas,donc on return false
      return false;
    }
};

let ToEmbed= function(message){
    let MsgEmbed = new Discord.MessageEmbed()
      .setColor(blue)
      .setDescription(message)
    return MsgEmbed;
};

let ToEmbed1= function(title,message){
    let MsgEmbed = new Discord.MessageEmbed()
      .setColor(blue)
      .setTitle(title)
      .setDescription(message)
    return MsgEmbed;
};

let ToEmbedWarning= function(message){
    let MsgEmbed = new Discord.MessageEmbed()
      .setColor(red)
      .setDescription("<:exclamation:811748558033649696>"+ message)
    return MsgEmbed;
};

module.exports.IsFileExist = IsFileExist
module.exports.ToEmbed = ToEmbed
module.exports.ToEmbed1 = ToEmbed1
module.exports.ToEmbedWarning = ToEmbedWarning
