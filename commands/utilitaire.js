module.exports = {
  name:'utilitaire',
  aliases: 'util',
  description: 'Affiche une phrase parmis une liste de phrase prédifinie',
  usage: '+utilitaire',
  args: false,
  execute(message){
    const Discord = require('discord.js');
    const NBMESSAGE=26;
    let phrase='';
    let image='';
    switch(Math.floor((Math.random() * NBMESSAGE) + 1)) {
      case 1: phrase='Fuck <@339780915196592129>'; break;
      case 2: phrase='<@350147522032828418> Votre insignifiance m\'étonnes'; break;
      case 3: phrase='Je m\'en fout'; break;
      case 4: phrase='La vie c\'est la mort aussi'; break;
      case 5: phrase='Ce commentaire extrêmement long, à pour seul et unique but de te faire perdre ton temps !\nSoit Heureux d\'avoir inutilement perdu du temps à lire cette longue phrase !'; break;
      case 6: phrase='Malgré la complexité induite, je vous demande de comprendre précisément les hypothèses de bon sens, si l\'on veut s\'en sortir un jour.'; break;
      case 7: phrase='Cette phrase est fausse'; break;
      case 8: image="https://media.discordapp.net/attachments/758648144204136500/799366129691918336/0181e28.jpg"; break;
      case 9: phrase='Pour réagir face à l\'impasse de ce début de siècle, nous sommes contraints de remodeler précisément les ouvertures de bon sens, en prenant toutes les précautions qui s\'imposent.'; break;
      case 10: phrase='Si vous voulez mon avis concernant cette inflexion de l\'époque actuelle, je suggère fortement d’anticiper la plus grande partie des issues de bon sens, si l\'on veut s\'en sortir un jour.'; break;
      case 11: phrase='Du fait de la crise qui nous occupe, je vous demande de revoir certaines problématiques imaginables, pour longtemps.'; break;
      case 12: image="https://cdn.discordapp.com/emojis/800463859278020618.png"; break;
      case 13: phrase='Où est charlie ?'; image="https://cdn.discordapp.com/attachments/590877085191372812/799974278003032075/waldo_Where_is_he.png"; break;
      case 14: phrase='Théotime.exe à cesser de fonctionné'; break;
      case 15: phrase='Dans le but de pallier à la difficulté de ce début de siècle, je préconise un audit afin d’uniformiser l\'ensemble des synergies emblématiques, parce que nous le valons bien.'; break;
      case 16: image="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1143ef9c-e357-4ed6-a531-dcef1ebc1961/d9kyduh-d86d90cf-fcb9-4ab8-8db6-9e181ca998d1.png/v1/fill/w_806,h_992,strp/muffin___asdfmovie_by_danielgreys_d9kyduh-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMjYwIiwicGF0aCI6IlwvZlwvMTE0M2VmOWMtZTM1Ny00ZWQ2LWE1MzEtZGNlZjFlYmMxOTYxXC9kOWt5ZHVoLWQ4NmQ5MGNmLWZjYjktNGFiOC04ZGI2LTllMTgxY2E5OThkMS5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.WoQgxMqsEzsPAUdy6ADo5v1kkBXrLKTWhoiut1lYIRc"; break;
      case 17: phrase='<@799769588949712897> Quelqu\'un a compris à quoi sert ce salon ?'; break;
      case 18: phrase='Pedro le Mexicain'; break
      case 19: image='https://tenor.com/view/chicken-censored-weird-gif-15229886'; break;
      case 20: phrase='MAIS MOI J\'VEUX FAIRE L\'AMOUR'; break;
      case 21: phrase='<@339780915196592129> est un fetichiste des pied et il paraît même qu\'il aime se déguiser en mexicain';image="https://cdn.drawception.com/images/panels/2015/10-6/mkCq4jqy6f-2.png"; break;
      case 22: phrase='Hello World !\nhttps://www.youtube.com/watch?v=AMShoQ_qdc0&feature=emb_logo'; break;
      case 23: phrase='Whesh là qu\'est-ce-que tu fous là, tu n\'as rien d\'autre à faire ?'; break;
      case 24: phrase='C\'est la **Mer Noire**!'; break;
      case 25: phrase='Comme une célèbre personne a dit un jour :\n*"Je suis plus à l\'aise pour doigter que pour utiliser ma gorge"*\n**PEDRO** - 12/10/2020'; break;
      case 26: phrase='un chat n\'est pas un chien, et un chien n\'est guère un humain non plus; du coup un chat est un humain ?'; break;
    }

    MsgEmbed = new Discord.MessageEmbed()
      .setTitle("Utilitaire")
      .setDescription(phrase)
      .setColor('#3669d9')
      .setTimestamp()
      .setImage(image)
      .setFooter('Error 404')
    return message.channel.send(MsgEmbed);

  }
}
