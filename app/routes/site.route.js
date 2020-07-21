const siteService = require('../services/site.service');
var schema = require('../schema/siteValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');


function init(router) {
    router.route('/sites/list/')
        .get(getAllSiteById);
  router.route('/sites')
    .post(addSite);
}


function getAllSiteById(req,res) {

  let userId = { "userId": parseInt(req.query.user, 10) };

  var json_format = iValidator.json_schema(schema.getSchema,userId,"site");
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  siteService.getAllSiteById(userId).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.send(err);
    });
}

function addSite(req,res) {
  var userData = req.body;
  userData['userId'] = parseInt(req.query.user, 10);
  
  //Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, userData, "site");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }

  siteService.addSite(userData).then((data) => {
    if (data) {
      res.json({
        "status": "success"
      });
    }
  }).catch((err) => {
    res.json(err);
  });

}


//function updateSite(req,res) {
//   var userData=req.body;
//   var id = req.params.id;
//   siteService.updateSite(id,userData).then((data)=>{
//      res.json(data);
//  }).catch((err)=>{
//      res.json(err);
//   });
//}



module.exports.init = init;



