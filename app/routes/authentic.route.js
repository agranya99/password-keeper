const authenticService = require('../services/authentic.service');
var schema = require('../schema/loginValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');


const jwt = require('jsonwebtoken');

function init(router) {
    router.route('/user/auth')
        .post(authentic); 
    router.route('/user')
          .post(signup); 
}

function authentic(req,res) {
  var authenticData=req.body;
  
  //Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, authenticData, "authentic");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }

   authenticService.authentic(authenticData).then((data) => {
   if(data) {
      var username = data.username;
      const token = jwt.sign({username},'my_secret_key',{ expiresIn: 60*60*24 });
      res.json({
        "success":true,
        "userId":data[0].userId,
        "token":token
      });
    }
  }).catch((err) => {
    res.json(err);
  });

}


function signup(req,res) {
  var signUpData=req.body;
  
  //Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, signUpData, "signUpData");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }

   authenticService.signup(signUpData).then((data) => {
    if(data) {
       res.json({
         "status": "success"
       });
     }
   }).catch((err) => {
     res.json(err);
   });

}



module.exports.init = init;



