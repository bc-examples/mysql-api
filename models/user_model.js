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
  add: function(user, callback) {
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
      return db.query('insert into user_table (username, password) values(?,?)',
      [user.username, hash], callback);
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
  getMyBorrows: function(uname, callback){
    return db.query('SELECT id_borrows, name,author,DATE_FORMAT(borrow_date,"%d.%m.%Y") as date FROM book INNER JOIN borrows ON book.id_book=borrows.id_book  INNER JOIN user_table ON user_table.id_user=borrows.id_user  WHERE username=?',[uname], callback);
  }

}
          
module.exports = user;