const express = require('express');
const router = express.Router();
const user = require('../models/user_model');
var path = require('path');

router.use(express.static(path.join(__dirname, 'public')));

const multer  = require('multer');
const filePath = path.join(__dirname, '../public/images/');

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
  user.add(request.body, function(err, count) {
    if (err) {
      response.json(err);
    } else {
      response.json(request.body); 
    }
  });
});

router.post('/upload', upload.single('file'), function(req, res) {
  console.log(req.body.username);
  const file = req.file.filename;
  console.log(file);

  res.sendStatus(200);
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

module.exports = router;