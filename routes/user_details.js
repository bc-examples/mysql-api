const express = require('express');
const router = express.Router();
const user = require('../models/user_model');
var path = require('path');


const filePath = path.join(__dirname, '../public/images/');

router.get('/:username',
function(request, response){
  console.log("here");
  user.getUserdata(request.params.username, function(err,dbResult){
    if(err){
      response.json(err);
    }
    else{
      response.json(dbResult);
    }
  });
}
);

module.exports=router;