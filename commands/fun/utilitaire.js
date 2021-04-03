module.exports = {
  name:'utilitaire',
  aliases: 'util',
  category:'Fun',
  description: 'Affiche une phrase parmis une liste de phrase prédifinie',
  usage: '+utilitaire',
  args: false,
  execute(message){
    const Discord = require('discord.js');
    const {blue}= require('../../config.json');

    const TAB=[
      {"phrase":"Fuck <@339780915196592129>","image":"","video":""},
      {"phrase":"<@350147522032828418> Votre insignifiance m'étonnes","image":"","video":""},
      {"phrase":"Je m'en fout","image":"","video":""},
      {"phrase":"La vie c'est la mort aussi","image":"","video":""},
      {"phrase":"Ce commentaire extrêmement long, à pour seul et unique but de te faire perdre ton temps !nSoit Heureux d'avoir inutilement perdu du temps à lire cette longue phrase !","image":"","video":""},
      {"phrase":"Malgré la complexité induite, je vous demande de comprendre précisément les hypothèses de bon sens, si l'on veut s'en sortir un jour.","image":"","video":""},
      {"phrase":"Cette phrase est fausse","image":"","video":""},
      {"phrase":"Pour réagir face à l'impasse de ce début de siècle, nous sommes contraints de remodeler précisément les ouvertures de bon sens, en prenant toutes les précautions qui s'imposent.","image":"","video":""},
      {"phrase":"Si vous voulez mon avis concernant cette inflexion de l'époque actuelle, je suggère fortement d’anticiper la plus grande partie des issues de bon sens, si l'on veut s'en sortir un jour.","image":"","video":""},
      {"phrase":"Du fait de la crise qui nous occupe, je vous demande de revoir certaines problématiques imaginables, pour longtemps.","image":"","video":""},
      {"phrase":"<:exclamation:811748558033649696> Théotime.exe à cesser de fonctionné","image":"","video":""},
      {"phrase":"Dans le but de pallier à la difficulté de ce début de siècle, je préconise un audit afin d’uniformiser l'ensemble des synergies emblématiques, parce que nous le valons bien.","image":"","video":""},
      {"phrase":"<@808474473023275048> Quelqu'un a compris à quoi sert ce salon ?","image":"","video":""}, //attention si on veut généraliser pour les autre serveur
      {"phrase":"Pedro le Mexicain","image":"","video":""},
      {"phrase":"MAIS MOI J'VEUX FAIRE L'AMOUR","image":"","video":""},
      {"phrase":"Hello World !\nhttps://www.youtube.com/watch?v=AMShoQ_qdc0&feature=emb_logo","image":"","video":""},
      {"phrase":"C'est la **Mer Noire**!","image":"","video":""},
      {"phrase":"Whesh là qu'est-ce-que tu fous là, tu n'as rien d'autre à faire ?","image":"","video":""},
      {"phrase":"Comme une célèbre personne a dit un jour :\n*\"Je suis plus à l'aise pour doigter que pour utiliser ma gorge\"*\n**PEDRO** - 12/10/2020","image":"","video":""},
      {"phrase":"un chat n'est pas un chien, et un chien n'est guère un humain non plus; du coup un chat est un humain ?","image":"","video":""},

      {"phrase":"","image":"https://media1.tenor.com/images/c343ee6559fd719d3c1599ca76fa5124/tenor.gif?itemid=15550944","video":""},
      {"phrase":"","image":"https://media1.tenor.com/images/46d73c3cc50fa32e0e1d8c2a38007477/tenor.gif?itemid=7513882","video":""},
      {"phrase":"","image":"https://media1.tenor.com/images/11130c73567ece219b61ad291dbb3ce7/tenor.gif?itemid=18738402","video":""},
      {"phrase":"","image":"https://media.discordapp.net/attachments/758648144204136500/799366129691918336/0181e28.jpg","video":""},
      {"phrase":"","image":"https://media1.tenor.com/images/51b4e198459c2b7c5861fda42cd084b2/tenor.gif?itemid=15229886","video":""},
      {"phrase":"","image":"https://cdn.discordapp.com/attachments/813753518799192095/814869922517221387/muffin___asdfmovie_by_danielgreys_d9kyduh-pre.png","video":""},
      {"phrase":"","image":"https://cdn.discordapp.com/emojis/800463859278020618.png","video":""},
      {"phrase":"","image":"https://cdn.discordapp.com/attachments/767792590179270686/816333944957304872/unknown.png","video":""},
      {"phrase":"","image":"https://cdn.discordapp.com/attachments/763680117762686988/816332448870694922/unknown.png","video":""},


      {"phrase":"Créé par Pedro","image":"https://media.discordapp.net/attachments/776392193375207445/813762110969610251/JeSuisDesole.png","video":""},
      {"phrase":"Tu es très intelligent !","image":"https://cdn.discordapp.com/attachments/813753518799192095/814774566840565760/28.png","video":""},
      {"phrase":"<@339780915196592129> est un fetichiste des pied et il paraît même qu'il aime se déguiser en mexicain","image":"https://cdn.drawception.com/images/panels/2015/10-6/mkCq4jqy6f-2.png","video":""},
      {"phrase":"Où est charlie ?","image":"https://cdn.discordapp.com/attachments/590877085191372812/799974278003032075/waldo_Where_is_he.png","video":""},

      {"phrase":"Tout est dit dans la vidéo","image":"","video":"https://cdn.discordapp.com/attachments/751487151702540368/818787674906296320/sonic_hates_u_1.mp4"},
    ]

    const random=Math.floor(Math.random() * TAB.length);
    if(TAB[random].video!=""){
      return message.channel.send(TAB[random].phrase+"\n"+TAB[random].video);
    }

    const MsgEmbed = new Discord.MessageEmbed()
        .setTitle("Utilitaire")
        .setDescription(TAB[random].phrase)
        .setColor(blue)
        .setTimestamp()
        .setImage(TAB[random].image)
        .setFooter('Error 404')
    return message.channel.send(MsgEmbed);
  }
}
