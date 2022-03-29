const db = require('../database');

const borrows = {
  getById: function(id, callback) {
    return db.query('select id_borrows,id_book,id_user,DATE_FORMAT(borrow_date,"%d.%m.%Y : %h.%i.%s") as borrow_date from borrows where id_borrows=?', [id], callback);
  },
  getAll: function(callback) {
    return db.query('select id_borrows,id_book,id_user,DATE_FORMAT(borrow_date,"%d.%m.%Y : %h.%i.%s") as borrow_date from borrows', callback);
  },
  add: function(borrows, callback) {
    return db.query(
      'insert into borrows (id_book,id_user,borrow_date) values(?,?,?)',
      [borrows.id_book, borrows.id_user, borrows.borrow_date],
      callback
    );
  },
  delete: function(id, callback) {
    return db.query('delete from borrows where id_borrows=?', [id], callback);
  },
  update: function(id, borrows, callback) {
    return db.query(
      'update borrows set id_book=?,id_user=?, borrow_date=? where id_borrows=?',
      [borrows.id_book, borrows.id_user, borrows.borrow_date, id],
      callback
    );
  }
};
module.exports = borrows;