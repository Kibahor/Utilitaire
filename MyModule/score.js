const custom_file=require('./file.js');
const chalk = require('chalk');

//Score.js

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : SetScore()
// DESCRIPTION : Met à jour le score d'un utilisateur pour un jeu donner

let setScore= function (taggedUser,nom_jeu,score){

  const path=`commands/jeux/score/${taggedUser.username}.json`;
  let userScore=custom_file.loadJSON(path);
  if(userScore==null){
    registerNewScoreFile(taggedUser,nom_jeu,score);
  }else{
    let indice=indiceJeux(userScore,nom_jeu); //cherche l'indice du jeux
    if(indice==null){ //si le jeu n'existe pas on le rajoute
      userScore.jeux.push({"nom":nom_jeu, "score":score}); //ajoute le score du jeu
    }else{
      let previousScore=userScore.jeux[indice].score; //récupère le score(string) du fichier
      if(previousScore.includes("-")){let newScore=-(parseInt(previousScore))+(score);}//si le score est négatif on ajoute un "-" car le parseInt ne récupére pas le "-"
      let newScore=parseInt(previousScore)+(score);
      userScore.jeux[indice].score=newScore.toString(); //On reconvertit le score(int) en score (string)
      custom_file.registerJSON(path,userScore);//on enregistre le fichier
      console.log(chalk.yellow(`[JEUX] [Score ${nom_jeu}] ./commands/jeux/score/${taggedUser.username}.json à été modifié`));
    }
  }
};

module.exports.setScore= setScore //On l'export pour pouvoir l'utiliser dans d'autre programme
//////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : removeScore()
// DESCRIPTION : [Admin Only] Supprime le score d'un jeu ou de tout les jeux

let removeScore=function (taggedUser,nom_jeux){
  const path=`commands/jeux/score/${taggedUser.username}.json`;
  if(nom_jeux==="all"){ //Si supprimer tout les scores (all), sa revient à supprimer le fichier

    return custom_file.deleteFile(path); //On vérifie que le fichier à bien été supprimer

  }else{ //Sinon on charge le fichier score et on supprime le score du jeu

    let userScore=custom_file.loadJSON(path); //Charge le fichier des scores

    let indice=indiceJeux(userScore,nom_jeux); //Cherche l'indice du jeux concerner
    if(indice==null){return false;} //Le jeu n'as pas été trouvé | Echec de la suppression du score

    if(userScore.jeux.length==1){ //Si le fichier ne contient qu'un seul score
      return custom_file.deleteFile(path);
    }

    delete userScore.jeux[indice]; //On supprime le score
    //console.log(chalk.yellow(`[JEUX] [Score ${nom_jeu}] ./commands/jeux/score/${taggedUser.username}.json à été modifié`));
    return custom_file.registerJSON(path,userScore); //On réenregistre le fichier
  }
};

module.exports.removeScore= removeScore //On l'export pour pouvoir l'utiliser dans d'autre programme
//////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : registerNewScoreFile()
// DESCRIPTION : Créé un fichier de score pour un utilisateur donner

let registerNewScoreFile=function (taggedUser,nom_jeu,score){
  const path=`commands/jeux/score/${taggedUser.username}.json`;
  let user = {"user": taggedUser.username,
              "jeux":[
                {"nom":nom_jeu, "score":score.toString()}
              ]
            };
  custom_file.registerJSON(path,user);
  console.log(chalk.yellow(`[JEUX] ${path} à bien été créé !`));
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : indiceJeux()
// DESCRIPTION : Permet d'obtenir l'indice d'un jeu

let indiceJeux=function (userScore,nom_jeu){
  if(userScore==null){return null;}
  let indice=0;
  for(let i=0;i<userScore.jeux.length;i++){ //Parcours les jeux
    if(userScore.jeux[i].nom===nom_jeu){return indice;} //Si le nom du jeu correspond au nom_jeu donner en paramétre on renvoie l'indice
    indice++;
  }
  //console.log(chalk.yellow("[indiceJeux] Le score n'existe pas !"));
  return null; //Le jeu n'as pas été trouver dans le fichier
};
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
  console.log(chalk.yellow(`[JEUX] [Ajout d'un jeu] ./commands/jeux/score/jeux.json à bien été modifié !`));
};
module.exports.registerNewGame = registerNewGame
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////
