const express = require('express');
const router = express.Router();
const user = require('../models/user_model');
var path = require('path');


const filePath = path.join(__dirname, '../public/images/');

router.get('/:username',
function(request, response){
  console.log("here");
  user.getUserData(request.params.username, function(err,dbResult){
    if(err){
      response.json(err);
    }
    else{
      response.json(dbResult[0]);
      console.log(dbResult);
    }
  });
}
);

module.exports=router;