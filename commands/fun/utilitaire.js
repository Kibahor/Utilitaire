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
      {"phrase":"Fuck <@339780915196592129>","image":""},
      {"phrase":"<@350147522032828418> Votre insignifiance m'étonnes","image":""},
      {"phrase":"Je m'en fout","image":""},
      {"phrase":"La vie c'est la mort aussi","image":""},
      {"phrase":"Ce commentaire extrêmement long, à pour seul et unique but de te faire perdre ton temps !nSoit Heureux d'avoir inutilement perdu du temps à lire cette longue phrase !","image":""},
      {"phrase":"Malgré la complexité induite, je vous demande de comprendre précisément les hypothèses de bon sens, si l'on veut s'en sortir un jour.","image":""},
      {"phrase":"Cette phrase est fausse","image":""},
      {"phrase":"Pour réagir face à l'impasse de ce début de siècle, nous sommes contraints de remodeler précisément les ouvertures de bon sens, en prenant toutes les précautions qui s'imposent.","image":""},
      {"phrase":"Si vous voulez mon avis concernant cette inflexion de l'époque actuelle, je suggère fortement d’anticiper la plus grande partie des issues de bon sens, si l'on veut s'en sortir un jour.","image":""},
      {"phrase":"Du fait de la crise qui nous occupe, je vous demande de revoir certaines problématiques imaginables, pour longtemps.","image":""},
      {"phrase":"<:exclamation:811748558033649696> Théotime.exe à cesser de fonctionné","image":""},
      {"phrase":"Dans le but de pallier à la difficulté de ce début de siècle, je préconise un audit afin d’uniformiser l'ensemble des synergies emblématiques, parce que nous le valons bien.","image":""},
      {"phrase":"<@808474473023275048> Quelqu'un a compris à quoi sert ce salon ?","image":""}, //attention si on veut généraliser pour les autre serveur
      {"phrase":"Pedro le Mexicain","image":""},
      {"phrase":"MAIS MOI J'VEUX FAIRE L'AMOUR","image":""},
      {"phrase":"Hello World !\nhttps://www.youtube.com/watch?v=AMShoQ_qdc0&feature=emb_logo","image":""},
      {"phrase":"C'est la **Mer Noire**!","image":""},
      {"phrase":"Whesh là qu'est-ce-que tu fous là, tu n'as rien d'autre à faire ?","image":""},
      {"phrase":"Comme une célèbre personne a dit un jour :\n*\"Je suis plus à l'aise pour doigter que pour utiliser ma gorge\"*\n**PEDRO** - 12/10/2020","image":""},
      {"phrase":"un chat n'est pas un chien, et un chien n'est guère un humain non plus; du coup un chat est un humain ?","image":""},

      {"phrase":"","image":"https://media1.tenor.com/images/c343ee6559fd719d3c1599ca76fa5124/tenor.gif?itemid=15550944"},
      {"phrase":"","image":"https://media1.tenor.com/images/46d73c3cc50fa32e0e1d8c2a38007477/tenor.gif?itemid=7513882"},
      {"phrase":"","image":"https://media1.tenor.com/images/11130c73567ece219b61ad291dbb3ce7/tenor.gif?itemid=18738402"},
      {"phrase":"","image":"https://media.discordapp.net/attachments/758648144204136500/799366129691918336/0181e28.jpg"},
      {"phrase":"","image":"https://media1.tenor.com/images/51b4e198459c2b7c5861fda42cd084b2/tenor.gif?itemid=15229886"},
      {"phrase":"","image":"https://cdn.discordapp.com/attachments/813753518799192095/814869922517221387/muffin___asdfmovie_by_danielgreys_d9kyduh-pre.png"},
      {"phrase":"","image":"https://cdn.discordapp.com/emojis/800463859278020618.png"},

      {"phrase":"Créé par Pedro","image":"https://media.discordapp.net/attachments/776392193375207445/813762110969610251/JeSuisDesole.png"},
      {"phrase":"Tu es très intelligent !","image":"https://cdn.discordapp.com/attachments/813753518799192095/814774566840565760/28.png"},
      {"phrase":"<@339780915196592129> est un fetichiste des pied et il paraît même qu'il aime se déguiser en mexicain","image":"https://cdn.drawception.com/images/panels/2015/10-6/mkCq4jqy6f-2.png"},
      {"phrase":"Où est charlie ?","image":"https://cdn.discordapp.com/attachments/590877085191372812/799974278003032075/waldo_Where_is_he.png"}

    ]

    const random=(Math.floor((Math.random() * TAB.length) + 1));
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
