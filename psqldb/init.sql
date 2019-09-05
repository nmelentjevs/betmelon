CREATE USER betsheets;
CREATE DATABASE betsheets;
\c betsheets
CREATE TABLE users (
id SERIAL UNIQUE, 
name VARCHAR(50),
email VARCHAR(50),
registered_on TIMESTAMPTZ DEFAULT Now(),
confirmed BOOLEAN,
uuid VARCHAR(100),
username VARCHAR(25),
password VARCHAR(100),
sheet_id VARCHAR(100)
);
INSERT INTO users(name,email,username,password,sheet_id) VALUES ('test', 'test@gmail.com', 'test', 'test', 'test');
INSERT INTO users(name,email,username,password,sheet_id) VALUES ('syune', 'syune@gmail.com', 'syune', '123456', 'test');
INSERT INTO users(name,email,username,password,sheet_id) VALUES ('king111', 'king111@gmail.com', 'king111', '123456', 'test');
INSERT INTO users(name,email,username,password,sheet_id) VALUES ('kingusha', 'kingusha@gmail.com', 'kingusha', '123456', 'test');
CREATE TABLE predictions(
id SERIAL UNIQUE,
text VARCHAR(500),
wrote_on TIMESTAMPTZ DEFAULT Now(),
edited_on DATE,
liked INT,
disliked INT,
author VARCHAR(50),
country VARCHAR(50),
league VARCHAR(50),
teams VARCHAR(50),
match_date DATE,
title VARCHAR(50)
);
INSERT INTO predictions(text,author,country,league,teams,title,match_date) VALUES ('test', 'test', 'test', 'test', 'test', 'test', '10.10.10');
CREATE TABLE likes(
post_id INT,
liker_username VARCHAR(50)
);
CREATE TABLE dislikes(
post_id INT,
disliker_username VARCHAR(50)
);
GRANT ALL PRIVILEGES ON DATABASE betsheets TO betsheets;