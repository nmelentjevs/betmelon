#!/bin/sh

-- initdb -D /var/lib/postgres/data

-- pg_ctl -D "/var/lib/postgres/data" -o "-c listen_addresses=''" -w start

-- psql -U postgres -d postgres -c "CREATE USER betsheets;"

-- psql -U postgres -v ON_ERROR_STOP=1 -d postgres -c "CREATE DATABASE betsheets;"

-- \c betsheets


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
title VARCHAR(50),
is_bet BOOLEAN,
is_correct BOOLEAN
);
ALTER TABLE predictions ALTER COLUMN is_bet SET DEFAULT false;
INSERT INTO predictions(text,author,country,league,teams,title,match_date) VALUES ('Barcelona wins easily', 'king111', 'Spain', 'La Liga', 'Barcelona vs Real Madrid', 'Barcelona wins easily', '07.09.2019');
CREATE TABLE bets(
id SERIAL UNIQUE,
username VARCHAR(50),
country VARCHAR(25),
league VARCHAR(25),
home VARCHAR(25),
away VARCHAR(25),
bet VARCHAR(50),
bet_type VARCHAR(50),
score VARCHAR(10),
imaginary BOOLEAN,
result VARCHAR(10),
bet_amount VARCHAR(15),
comments VARCHAR(100),
is_prediction BOOLEAN,
match_date DATE,
date_aded TIMESTAMP DEFAULT Now()
);
ALTER TABLE bets ALTER COLUMN is_prediction SET DEFAULT false;
CREATE TABLE likes(
post_id INT,
liker_username VARCHAR(50)
);
CREATE TABLE dislikes(
post_id INT,
disliker_username VARCHAR(50)
);
GRANT ALL PRIVILEGES ON DATABASE betsheets TO betsheets;

-- # stop internal postgres server
-- pg_ctl -v ON_ERROR_STOP=1 -D "/var/lib/postgres/data" -m fast -w stop

-- exec "$@"