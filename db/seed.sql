DROP TABLE IF EXISTS history;
DROP TABLE IF EXISTS portfolio;
DROP TABLE IF EXISTS balance;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(255),
    hash varchar(255),
    email varchar(255)
);

CREATE TABLE balance (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    balance FLOAT
);

CREATE TABLE portfolio (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    ticker varchar(255),
    name varchar(255),
    exchange varchar(255),
    shares FLOAT,
    price FLOAT,
    position FLOAT GENERATED ALWAYS AS (shares * price) STORED
);

CREATE TABLE history (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    ticker varchar(255),
    action varchar(255),
    shares FLOAT,
    price FLOAT,
    datetime DATE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, hash, email)
VALUES 
('user1', '$pbkdf2-sha256$29000$NuZ8730PYUwJoRTi/B.jVA$DTvAfa3HLFh8dpgzGQO7yKN7ZciSM/HL5kQr7w6VYY0', 'user1@test.com'),
('user2','$pbkdf2-sha256$29000$NuZ8730PYUwJoRTi/B.jVA$DTvAfa3HLFh8dpgzGQO7yKN7ZciSM/HL5kQr7w6VYY0','user2@test.com'),
('user3','$pbkdf2-sha256$29000$NuZ8730PYUwJoRTi/B.jVA$DTvAfa3HLFh8dpgzGQO7yKN7ZciSM/HL5kQr7w6VYY0','user3@test.com')
;

INSERT INTO balance (user_id, balance)
VALUES 
(1, 10000),
(2, 5000),
(3, 7654)
;

INSERT INTO portfolio (user_id, ticker, name, exchange, shares, price)
VALUES 
(1, 'AAPL', 'Apple, Inc.', 'NASDAQ', 10, 110.25),
(2,'ACET','Adicet Bio Inc', 'NASDAQ', 6, 50.50),
(1, 'ACCO', 'ACCO Brands Corporation', 'NYSE', 12, 75),
(2,'ACBI', 'Atlantic Capital Bancshares Inc', 'NASDAQ', 5, 30)
(3,'MSFT', 'Microsoft Corporation','NASDAQ', 100, 50),
(3,'TSLA', 'Tesla Inc','NASDAQ',2,45.3)
;

INSERT INTO history (user_id, ticker, action, shares, price)
VALUES 
(1, 'AAPL', 'buy', 10, 110.25),
(2,'ACET', 'buy', 6, 50.50),
(1,'ACCO','buy',12,75),
(2,'ACBI','buy',5,30),
(3,'MSFT',100,50),
(3,'TSLA',2,45.3)
;

    