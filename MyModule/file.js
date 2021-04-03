const fs = require('fs');
const chalk = require('chalk');

//file.js

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : IsFileExist()
// DESCRIPTION : Renvoie true si le fichier existe, sinon false

let IsFileExist= function(PathToFilename){
  return fs.existsSync(PathToFilename);
};
module.exports.IsFileExist = IsFileExist
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : loadJSON()
// DESCRIPTION : Renvoie le json parse si le fichier existe, sinon null

let loadJSON=function(PathToFilename){
  if(IsFileExist(PathToFilename)){return JSON.parse(fs.readFileSync(PathToFilename));}
  else{/*console.log(chalk.yellow(`[loadJSON] Le fichier ${PathToFilename} n'existe pas !`));*/return null;}
};
module.exports.loadJSON = loadJSON
//////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : registerJSON()
// DESCRIPTION : Enregistre le json avec la path et l'arraylist parsed

let registerJSON=function (PathToFilename,donnees){
    if(donnees==null){/*console.log(chalk.yellow(`[registerJSON] Les données sont null`));*/return false;}

    try{
      fs.writeFileSync(PathToFilename, JSON.stringify(donnees));
      /*if(IsFileExist(PathToFilename)){console.log(chalk.yellow(`[registerJSON] Le fichier : ${PathToFilename} a bien été modifier`));}
      else{console.log(chalk.yellow(`[registerJSON] Le fichier : ${PathToFilename} a bien été créé`));}*/
      return true;
    }catch(error){
      //console.log(chalk.yellow(`[registerJSON] Erreur lors de l'écriture du fichier : ${PathToFilename}`));
      //console.error(error);
      return false;
    }
};
module.exports.registerJSON = registerJSON
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOM : deleteFile()
// DESCRIPTION : Supprime un fichier

let deleteFile=function(PathToFilename){
  if(IsFileExist(PathToFilename)){
    fs.unlink(PathToFilename, (err) => {if (err) {throw err;}}); //Déclare une Exception si il n'arrive pas à le supprimer
    console.log(chalk.yellow(`[deleteFile] ${PathToFilename} à bien été supprimé !`));
    return true //Le fichier existe et a bien été supprimer
  }else{
    return false //le fichier n'existe pas et n'as pas pu être supprimer
  }
};
module.exports.deleteFile = deleteFile
//////////////////////////////////////////////////////////////////////////////////////////////////////////
