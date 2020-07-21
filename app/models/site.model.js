var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
const bcrypt = require('bcrypt');

var siteModel = {
   getAllSiteById: getAllSiteById,
   addSite:addSite,
   //updateSite:updateSite,
   //deleteSite:deleteSite,
}


function getAllSiteById(user) {
    return new Promise((resolve,reject) => {
        db.query("SELECT * FROM websites WHERE userId ="+user.userId,(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
       });
    });  
}

function addSite(user) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        console.log(user);
        db.query("INSERT INTO websites(userId,website,username,password) VALUES('" + user.userId + "','" + user.website + "','" + user.username + "','" + user.password + "')", (error, rows, fields) => {
          if (error) {
            dbFunc.connectionRelease;
            reject(error);
          } else {
            dbFunc.connectionRelease;
            resolve(rows);
          }
        });
      });
    });
  });
}


//function updateSite(id,user) {
//    return new Promise((resolve,reject) => {
//        db.query("UPDATE websites set username='"+user.username+"',website='"+user.website+"',password='"+user.password+"' WHERE userId='"+user.userId+"'",(error,rows,fields)=>{
//            if(!!error) {
//                dbFunc.connectionRelease;
//                reject(error);
//            } else {
//                dbFunc.connectionRelease;
//                resolve(rows);
//            }
//       });    
//    })
//}

//function deleteSite(id) {
//   return new Promise((resolve,reject) => {
//        db.query("DELETE FROM websites WHERE userId='"+user.userId+"' AND website='"+user.website+"'"" ,(error,rows,fields)=>{
//            if(!!error) {
//                dbFunc.connectionRelease;
//                reject(error);
//            } else {
//                dbFunc.connectionRelease;
//                resolve(rows);
//            }
//       });    
//    });
//}


module.exports = siteModel;