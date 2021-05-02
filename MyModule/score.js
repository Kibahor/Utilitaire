const Discord= require('discord.js');
const chalk = require('chalk');
const custom_file=require('./file.js');
const custom_embed=require('./embed.js');
const {blue}=require('../config.json');

const path=`data/score.json`;
//Score.js

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : SetScore()
// DESCRIPTION : Met à jour le score d'un utilisateur pour un jeu donner

let setScore= function (taggedUser,nom_jeu,score){

  let Score=custom_file.loadJSON(path);
  if(Score===null){
    registerNewScoreFile(taggedUser,nom_jeu,score);
    return;
  }else{
    let indice_user=indiceUser(Score,taggedUser.id); //cherche l'indice de l'utilisateur
    if(indice_user === null){registerNewUser(Score,taggedUser,nom_jeu,score);return;}
    let indice_jeux=indiceJeux(Score,indice_user,nom_jeu); //cherche l'indice du jeux

    if(indiceJeux===null){ //si le jeu n'existe pas on le rajoute
      if(score<0){score=0}
      Score.userlist[indice_user].jeux.push({"nom":nom_jeu, "score":score}); //ajoute le score du jeu
      custom_file.registerJSON(path,Score);//on enregistre le fichier
      return;

    }else{

      let newScore;
      let previousScore=parseInt(Score.userlist[indice_user].jeux[indice_jeux].score); //récupère le score(string) du fichier
      if((previousScore+score)<0 || previousScore<0){newScore=0;}//Pour corriger les scores négatif déjà existant
      else{newScore=previousScore+score;}
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
  let Score=custom_file.loadJSON(path); //Charge le fichier des scores
  if(Score===null){return false;}
  let indice_user=indiceUser(Score,taggedUser.id); //cherche l'indice de l'utilisateur
  if(indice_user === null){return false;} //Si l'utilisateur n'existe pas
  if(nom_jeux==="all"){ //Supprimer tout les scores
    Score.userlist.splice(indice_user, 1); //On supprime l'utilisateur en entier
  }else{ //Supprimer un jeux spécifique
    let indice_jeux=indiceJeux(Score,indice_user,nom_jeux); //cherche l'indice du jeux
    if(indice_jeux===null){return false;} //Le jeu n'as pas été trouvé | Echec de la suppression du score
    else if(Score.userlist[indice_user].jeux.length==1){Score.userlist.splice(indice_user, 1);} //Si le fichier ne contient qu'un seul score
    else{Score.userlist[indice_user].jeux.splice(indice_jeux, 1);} //On supprime le score du jeu
  }
  return custom_file.registerJSON(path,Score); //On réenregistre le fichier
};

module.exports.removeScore= removeScore //On l'export pour pouvoir l'utiliser dans d'autre programme
//////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : registerNewScoreFile()
// DESCRIPTION : Créé un fichier de score pour un utilisateur donner

let registerNewScoreFile=function (taggedUser,nom_jeu,score){
  if(score<0){score=0}
  let user = {"userlist":[{"user": taggedUser.id,"jeux":[{"nom":nom_jeu, "score":score.toString()}]}]}
  custom_file.registerJSON(path,user);
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : registerNewUser()
// DESCRIPTION : Créé un fichier de score pour un utilisateur donner

let registerNewUser=function (Score,taggedUser,nom_jeu,score){
  if(score<0){score=0}
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : showAllScore()
// DESCRIPTION : Renvoie un embed avec tout les score d'un utilisateur

let showAllScore = function (taggedUser,footer){
  let Score=custom_file.loadJSON(path); //Charge le fichier des scores
  if(Score===null){return null;}
  let indice_user=indiceUser(Score,taggedUser.id); //cherche l'indice de l'utilisateur
  if(indice_user===null){return null;}
  let reply="";

  for(let i=0;i<Score.userlist[indice_user].jeux.length;i++){reply+=`❯ **${Score.userlist[indice_user].jeux[i].nom.charAt(0).toUpperCase()+Score.userlist[indice_user].jeux[i].nom.slice(1)}** : ${Score.userlist[indice_user].jeux[i].score}\n`} //On parcourt le fichier et on l'ajoute à reply

  const MsgEmbed = new Discord.MessageEmbed()
    .setTitle('Liste des Scores')
    .setDescription(reply)
    .setColor(blue)
    .setFooter(footer)

  return MsgEmbed;
}
module.exports.showAllScore= showAllScore //On l'export pour pouvoir l'utiliser dans d'autre programme
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : showOneScore()
// DESCRIPTION : Renvoie un embed avec le score d'un utilisateur pour un utilisateur

let showOneScore= function (taggedUser,nom_jeu,footer){
  let Score=custom_file.loadJSON(path); //Charge le fichier des scores
  if(Score===null){return null;}
  let indice_user=indiceUser(Score,taggedUser.id); //cherche l'indice de l'utilisateur
  if(indice_user===null){return null;}
  let indice_jeux=indiceJeux(Score,indice_user,nom_jeu); //cherche l'indice du jeux
  if(indice_jeux===null){return custom_embed.ToEmbedWarning(`Le jeu \`${nom_jeu}\` n'existe pas !`);}

  let reply=`${Score.userlist[indice_user].jeux[indice_jeux].score}\n`;//[à modifier] Afficher le score avec les emoji chiffre

  const MsgEmbed = new Discord.MessageEmbed()
    .setTitle("Score")
    .setDescription(`❯ **${nom_jeu.charAt(0).toUpperCase() + nom_jeu.slice(1)} :** ${reply}`)
    .setColor(blue)
    .setFooter(footer)

  return MsgEmbed;
}
module.exports.showOneScore= showOneScore //On l'export pour pouvoir l'utiliser dans d'autre programme
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : listJeux()
// DESCRIPTION : Renvoie la liste des jeux
/*
let listJeux=function(){
  listjeux=["chifoumi"];
  return listjeux;
};
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////

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
