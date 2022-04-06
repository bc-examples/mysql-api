const db = require('../database');
const bcrypt = require('bcryptjs');

const saltRounds=10;
const user={
  get: function(callback) {
    return db.query('select * from user_table', callback);
  },
  getById: function(id, callback) {
    return db.query('select * from user_table where id_user=?', [id], callback);
  },
  add: function(user, image_name, callback) {
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
      return db.query('insert into user_table (username, image_name, password) values(?,?, ?)',
      [user.username, image_name, hash], callback);
    });
  },
  delete: function(id, callback) {
    return db.query('delete from user_table where id_user=?', [id], callback);
  },
  update: function(id, user, callback) {
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
      return db.query('update user_table set username=?, password=? where id_user=?',
      [user.username, hash, id], callback);
    });
  },
  getUserdata: function(username, callback){
    return db.query('select image_name from user_table where username=?',[username], callback);
  }

}
          
module.exports = user;