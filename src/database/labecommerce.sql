-- Active: 1688999163272@@127.0.0.1@3306


CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    create_at TEXT NOT NULL
);

INSERT INTO users (id, name, email, password, create_at)
VALUES
("u001", "Fulano", "fulano@email.com", "fulano123", dateTime ('now')),
("u002", "Beltrana", "beltrana@email.com", "beltrana00", dateTime ('now')),
("u003", "astrodev", "astrodev@email.com", "astrodev99", dateTime ('now'));

SELECT * FROM users;

CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO products (id, name, price, description, image_url)
VALUES
("prod001", "Mouse Gamer", 250.00, "Melhor mouse do mercado", "https://picsum.photos/seed/Mouse%20gamer/400"),
("prod002", "Monitor", 900.00, "Monitor LED Full HD 24 polegadas", "https://picsum.photos/seed/Monitor/400"),
("prod003", "SSD Gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leite e gravação", "https://picsum.photos/seed/SSD%20gamer/400"),
("prod004", "Teclado", 135.90, "Excelente teclado para trabalho e jogos", "https://picsum.photos/seed/Teclado/400"),
("prod005", "Mousepad", 79.99, "Mousepad com led 900x300mm", "https://picsum.photos/seed/Mousepad/400");

SELECT * FROM products;

-- Aprofundamento sql, desenvolvendo funcionalidades

-- Get All Users

SELECT * FROM users;

-- Get All Products 

SELECT * FROM products;

-- Get All Products com filtro

SELECT * FROM products
WHERE name LIKE "%gamer%";

-- Create user

INSERT INTO users (id, name, email, password, create_at)
VALUES("u004", "bananinha", "bananinha@email.com", "bananinha123", dateTime ('now'));

-- Create product

INSERT INTO products (id, name, price, description, image_url)
VALUES("prod006", "bananinha", 5.99, "uma bananinha", "imagineumabananinha.com");

-- Delete users By Id

DELETE FROM users
WHERE id = "u002";

-- Delete products By Id

DELETE FROM products
WHERE id = "prod003";

-- Edit products By Id

UPDATE products
SET 
name = "Fonte",
price = 500,
description = "Fonte de energia",
image_url = "https://picsum.photos/seed/Fonte/400"
WHERE id = "prod006";