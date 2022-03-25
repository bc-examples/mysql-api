# mysql-api

## Asennus 

<ul>
<li>Kloonaa sovellus komennolla git clone https://github.com/bc-examples/mysql-api.git</li>
<li>cd mysql-api</li>
<li>npm install</li>
<li>Luo tiedosto .env, jonka sisältö
<pre>
PORT=3001
SQL_SERVER = 'mysql://netuser:netpass@localhost:3306/netdb'
</pre>
</li>
<li>Suorita mysql-clientissa seuraavat
<pre>
CREATE DATABASE netdb;
CREATE USER 'netuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'netpass';
GRANT ALL on netdb.* to 'netuser'@'localhost';

USE netdb;

CREATE TABLE book(
id_book INT primary key auto_increment,
name VARCHAR(255),
author VARCHAR(255),
isbn VARCHAR(20)
);

INSERT INTO book(name,author,isbn) VALUES('PHP Basic','Bob Jones','123-456-789-111-x');
INSERT INTO book(name,author,isbn) VALUES('Statistics','Lisa Smith','222-333-444-555-y');

CREATE TABLE user_table(
  id_user INT primary key auto_increment,
  username VARCHAR(20),
  password VARCHAR(255),
  UNIQUE (username)
);
</pre>
<li>Käynnistä sovellus (npm start tai nodemon ./bin/www)
</ul>

### borrows-taulu

Oheisella koodilla voi lisätä tietokantaan borrows-taulu 
<pre>
 CREATE TABLE `borrows` (
  `id_borrows` int NOT NULL AUTO_INCREMENT,
  `id_book` int DEFAULT NULL,
  `id_user` int DEFAULT NULL,
  `borrow_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_borrows`),
  KEY `book_borrows_idx` (`id_book`),
  KEY `user_borrows_idx` (`id_user`),
  CONSTRAINT `book_borrows` FOREIGN KEY (`id_book`) REFERENCES `book` (`id_book`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user_borrows` FOREIGN KEY (`id_user`) REFERENCES `user_table` (`id_user`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB;
</pre>
