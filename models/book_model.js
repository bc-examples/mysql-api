const db = require('../database');

const book = {
  getById: function(id, callback) {
    return db.query('select * from book_table where id_book=$1', [id], callback);
  },
  getAll: function(callback) {
    return db.query('select * from book_table', callback);
  },
  add: function(book, callback) {
    return db.query(
      'insert into book_table (name,author,isbn) values($1,$2,$3)',
      [book.name, book.author, book.isbn],
      callback
    );
  },
  delete: function(id, callback) {
    return db.query('delete from book_table where id_book=$1', [id], callback);
  },
  update: function(id, book, callback) {
    return db.query(
      'update book_table set name=$1,author=$2, isbn=$3 where id_book=$4',
      [book.name, book.author, book.isbn, id],
      callback
    );
  }
};
module.exports = book;