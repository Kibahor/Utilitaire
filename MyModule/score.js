const custom_file=require('./file.js');
const chalk = require('chalk');
const Discord= require('discord.js');
const {blue}=require('../config.json');

//Score.js

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : SetScore()
// DESCRIPTION : Met à jour le score d'un utilisateur pour un jeu donner

let setScore= function (taggedUser,nom_jeu,score){

  const path=`commands/jeux/score/score.json`;
  let Score=custom_file.loadJSON(path);
  if(Score===null){
    registerNewScoreFile(taggedUser,nom_jeu,score);
    return;
  }else{
    let indice_user=indiceUser(Score,taggedUser.id); //cherche l'indice de l'utilisateur
    if(indice_user === null){registerNewUser(Score,taggedUser,nom_jeu,score);return;}
    let indice_jeux=indiceJeux(Score,indice_user,nom_jeu); //cherche l'indice du jeux
    if(indiceJeux===null){ //si le jeu n'existe pas on le rajoute
      Score.userlist[indice_user].jeux.push({"nom":nom_jeu, "score":score}); //ajoute le score du jeu
      custom_file.registerJSON(path,Score);//on enregistre le fichier
      return;
    }else{
      let newScore;
      let previousScore=Score.userlist[indice_user].jeux[indice_jeux].score; //récupère le score(string) du fichier
      if(previousScore.includes("-")){newScore=-(parseInt(previousScore))+(score);}//si le score est négatif on ajoute un "-" car le parseInt ne récupére pas le "-"
      else{newScore=parseInt(previousScore)+(score);}
      Score.userlist[indice_user].jeux[indice_jeux].score=newScore.toString(); //On reconvertit le score(int) en score (string)
      custom_file.registerJSON(path,Score);//on enregistre le fichier
    }
  }
};

module.exports.setScore= setScore //On l'export pour pouvoir l'utiliser dans d'autre programme
//////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : removeScore()
// DESCRIPTION : [Admin Only] Supprime le score d'un jeu ou de tout les jeux

let removeScore=function (taggedUser,nom_jeux){
  const path=`commands/jeux/score/score.json`;
  let Score=custom_file.loadJSON(path); //Charge le fichier des scores
  if(Score===null){return false;}
  let indice_user=indiceUser(Score,taggedUser.id); //cherche l'indice de l'utilisateur
  if(indice_user === null){return false;}
  if(nom_jeux==="all"){
    Score.userlist.splice(indice_user, 1);
  }else{ //Sinon on charge le fichier score et on supprime le score du jeu
    let indice_jeux=indiceJeux(Score,indice_user,nom_jeux); //cherche l'indice du jeux
    if(indice_jeux===null){return false;} //Le jeu n'as pas été trouvé | Echec de la suppression du score
    else if(Score.userlist[indice_user].jeux.length==1){Score.userlist.splice(indice_user, 1);} //Si le fichier ne contient qu'un seul score
    else{Score.userlist[indice_user].jeux.splice(indice_jeux, 1);} //On supprime le score
  }
  return custom_file.registerJSON(path,Score); //On réenregistre le fichier
};

module.exports.removeScore= removeScore //On l'export pour pouvoir l'utiliser dans d'autre programme
//////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : registerNewScoreFile()
// DESCRIPTION : Créé un fichier de score pour un utilisateur donner

let registerNewScoreFile=function (taggedUser,nom_jeu,score){
  const path=`commands/jeux/score/score.json`;
  let user = {"userlist":[{"user": taggedUser.id,"jeux":[{"nom":nom_jeu, "score":score.toString()}]}]}
  custom_file.registerJSON(path,user);
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : registerNewUser()
// DESCRIPTION : Créé un fichier de score pour un utilisateur donner

let registerNewUser=function (Score,taggedUser,nom_jeu,score){
  const path=`commands/jeux/score/score.json`;
  let user = {"user": taggedUser.id,"jeux":[{"nom":nom_jeu, "score":score.toString()}]}
  Score.userlist.push(user);
  custom_file.registerJSON(path,Score);
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : indiceJeux()
// DESCRIPTION : Permet d'obtenir l'indice d'un jeu

let indiceJeux=function (Score,indice_user,nom_jeu){
  if(Score==null){return null;}
  let indiceJeux=0;
  for(let i=0;i<Score.userlist[indice_user].jeux.length;i++){ //Parcours les jeux
    if(Score.userlist[indice_user].jeux[i].nom===nom_jeu){return indiceJeux;} //Si le nom du jeu correspond au nom_jeu donner en paramétre on renvoie l'indice
    indiceJeux++;
  }
  return null; //Le jeu n'as pas été trouver dans le fichier
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : indiceUser()
// DESCRIPTION : Permet d'obtenir l'indice d'un utilisateur

let indiceUser=function (Score,id){
  if(Score==null){return null;}
  let indiceUser=0;
  for(let i=0;i<Score.userlist.length;i++){
    if(Score.userlist[i].user===id){return indiceUser;}
    indiceUser++;
  }
  return null;
};
module.exports.indiceUser= indiceUser //On l'export pour pouvoir l'utiliser dans d'autre programme
//////////////////////////////////////////////////////////////////////////////////////////////////////////


//[à modifier] Pas forcément nécessaire revoir pour opti prog
//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : listJeux()
// DESCRIPTION : Renvoie la liste des jeux (dans le but de faire un forEach)

let listJeux=function(){
  let listGame=custom_file.loadJSON(`commands/jeux/score/jeux.json`); //On charge le fichier contenant les nom de jeux
  let jeux=[listGame.jeux[0].nom]; //on créé une liste d'array avec le premier nom de jeu
  for(let i=1;i<listGame.jeux.length;i++){ //On parcours les nom de jeux
    jeux.push(listGame.jeux[i].nom); //On ajoute le nom du jeu à la liste jeu
  }
  return jeux; //on renvoie la liste
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////


//[à modifier] Peut-être faire une fonction embed pour regrouper
let showAllScore = function (taggedUser,footer){
  const path=`commands/jeux/score/score.json`;
  let Score=custom_file.loadJSON(path); //Charge le fichier des scores
  if(Score===null){return;}
  let indice_user=indiceUser(Score,taggedUser.id); //cherche l'indice de l'utilisateur
  let reply="";

  for(let i=0;i<Score.userlist[indice_user].jeux.length;i++){reply+=`**${Score.userlist[indice_user].jeux[i].nom}** : ${Score.userlist[indice_user].jeux[i].score}\n`}
  const MsgEmbed = new Discord.MessageEmbed()
    .setThumbnail(taggedUser.displayAvatarURL({ format: "png", dynamic: false }))
    .setTitle('Liste des Scores')
    .setDescription(reply)
    .setColor(blue)
    .setFooter(footer)

  return MsgEmbed;
}
module.exports.showAllScore= showAllScore //On l'export pour pouvoir l'utiliser dans d'autre programme

let showOneScore= function (taggedUser,nom_jeu,footer){
  const path=`commands/jeux/score/score.json`;
  let Score=custom_file.loadJSON(path); //Charge le fichier des scores
  if(Score===null){return;}
  let indice_user=indiceUser(Score,taggedUser.id); //cherche l'indice de l'utilisateur
  let indice_jeux=indiceJeux(Score,indice_user,nom_jeu); //cherche l'indice du jeux

  let reply=`**${Score.userlist[indice_user].jeux[indice_jeux].nom}** : ${Score.userlist[indice_user].jeux[indice_jeux].score}\n`;//[à modifier] Afficher le score avec les emoji chiffre

  const MsgEmbed = new Discord.MessageEmbed()
    .setThumbnail(taggedUser.displayAvatarURL({ format: "png", dynamic: false }))
    .setTitle(`Score de \`${nom_jeu}\``)
    .setDescription(reply)
    .setColor(blue)
    .setFooter(footer)

  return message.channel.send(MsgEmbed);
}
module.exports.showOneScore= showOneScore //On l'export pour pouvoir l'utiliser dans d'autre programme

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : registerNewGame()
// DESCRIPTION : Ajoute un jeu dans le fichier jeux.json

/*
  let registerNewGame= function (nom_jeu){
  let listGame=file.loadJSON(`./commands/jeux/score/jeux.json`);
  //vérifier que le jeu n'existe pas déjà
  let arraygame=listJeux();
  arraygame.forEach((nom, name) => {
    if(name===nom_jeu){return;}
  });
  listGame.jeux.push({"nom": nom_jeu});
  file.registerJSON(`./commands/jeux/score/jeux.json`,listGame);
};
module.exports.registerNewGame = registerNewGame
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////
