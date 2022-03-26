const db = require('../database');

const login={
  checkPassword: function(username, callback) {
      return db.query('SELECT password FROM user_table WHERE username = $1',[username], callback); 
    }
};
          
module.exports = login;