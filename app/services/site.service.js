var siteModel = require("../models/site.model.js");


var siteService = {
    getAllSiteById: getAllSiteById,
    addSite: addSite,
    //updateSite:updateSite,
    //deleteSite:deleteSite
}

function getAllSiteById(id) {
  return new Promise((resolve, reject) => {
    siteModel.getAllSiteById(id).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    })
  });
}


function addSite(userData) {
  return new Promise((resolve, reject) => {
        siteModel.addSite(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}


//function updateSite(id,userData,callback) {
//    return new Promise((resolve,reject) => {
//        siteModel.updateSite(id,userData).then((data)=>{
//            resolve(data);
//        }).catch((err) => {
//            reject(err);
//        })
//    })
     
//}

//function deleteSite(id) {
//    return new Promise((resolve,reject) => {
//        siteModel.deleteSite(id).then((data)=>{
//            resolve(data);
//        }).catch((err) => {
//            reject(err);
//        })
//    })
//}



module.exports = siteService;

