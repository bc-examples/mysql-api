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
