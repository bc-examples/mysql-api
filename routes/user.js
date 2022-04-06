const express = require('express');
const router = express.Router();
const user = require('../models/user_model');
var path = require('path');


const filePath = path.join(__dirname, '../public/images/');
const multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePath)
  },
  filename: function (req, file, cb) {

      cb(null,  file.originalname );

  }
});

const multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePath)
  },
  filename: function (req, file, cb) {

      cb(null,  file.originalname );

  }
});

router.get('/:id?',
 function(request, response) {
  if (request.params.id) {
    user.getById(request.params.id, function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  } else {
    user.get(function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult);
      }
    });
  }
});

const upload = multer({ storage: storage})

router.post('/',upload.single('file'),
function(request, response) {
  console.log(request.file.filename);
  user.add(request.body, request.file.filename, function(err, count) {
    if (err) {
      response.json(err);
    } else {
      response.json(request.body); 
    }
  });
});
router.delete('/:id', 
function(request, response) {
  user.delete(request.params.id, function(err, count) {
    if (err) {
      response.json(err);
    } else {
      response.json(count);
    }
  });
});


router.put('/:id', 
function(request, response) {
  user.update(request.params.id, request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

router.get('/myborrows/:username',
function(request, response){
  user.getMyBorrows(request.params.username, function(err,dbResult){
    if (err){
      response.json(err);
    }
    else{
      response.json(dbResult);
    }
  });
});

module.exports = router;