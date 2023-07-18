-- Active: 1688999163272@@127.0.0.1@3306


CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

INSERT INTO users (id, name, email, password, created_at)
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

INSERT INTO users (id, name, email, password, created_at)
VALUES("u004", "bananinha", "bananinha@email.com", "bananinha123", dateTime ('now'));

-- Create product

INSERT INTO products (id, name, price, description, image_url)
VALUES("prod006", "bananinha", 5.99, "uma bananinha", "imagineumabananinha.com");

-- Delete users By Id

DELETE FROM users
WHERE id = "u002";

-- Delete products By Id

DELETE FROM purchases
WHERE id = "purc010";

-- Edit products By Id

UPDATE products
SET 
name = "Fonte",
price = 500,
description = "Fonte de energia",
image_url = "https://picsum.photos/seed/Fonte/400"
WHERE id = "prod006";

-- Relações Sql I

CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id)
     ON UPDATE CASCADE
     ON DELETE CASCADE
);

INSERT INTO purchases(id, buyer, total_price, created_at)
VALUES
('purc001', 'u001', 600.00, dateTime ('now')),
('purc002', 'u001', 200.00, dateTime ('now')),
('purc003', 'u003', 850.00, dateTime ('now')),
('purc004', 'u003', 350.00, dateTime ('now')),
('purc005', 'u004', 400.00, dateTime ('now')),
('purc006', 'u004', 399.90, dateTime ('now'));

SELECT * FROM purchases;

UPDATE purchases
SET total_price = 329.99
WHERE id = 'purc005';

SELECT 
purchases.id AS purchase_id,
purchases.buyer AS buyer_id,
users.name AS buyer_name,
users.email,
purchases.total_price,
purchases.created_at
FROM purchases
INNER JOIN users
ON purchases.buyer = users.id;

-- Relações sql ii

CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES
('purc001', 'prod006', 2),
('purc002', 'prod001', 3),
('purc003', 'prod002', 1),
('purc004', 'prod004', 2),
('purc005', 'prod001', 1),
('purc005', 'prod005', 1),
('purc006', 'prod001', 1),
('purc006', 'prod002', 1),
('purc006', 'prod004', 1),
('purc006', 'prod005', 1),
('purc006', 'prod006', 1);

INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES
('purc003', 'prod002', 2);


UPDATE purchases_products
SET product_id = 'prod010'
WHERE product_id = 'prod001';


UPDATE purchases
SET id = 'purc010'
WHERE id = 'purc006';

DELETE FROM purchases_products
WHERE purchase_id = 'purc006';

SELECT * FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;


-- Tabela igual a acima só que mais bonita.
SELECT 
purchases_products.purchase_id AS purchaseId,
purchases_products.product_id AS productId,
products.name,
products.price,
purchases_products.quantity,
purchases.buyer,
users.name,
purchases_products.quantity * products.price AS subTotal,
purchases.total_price,
purchases.created_at
FROM purchases_products
INNER JOIN products
ON purchases_products.product_id = products.id
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN users
ON purchases.buyer = users.id;

DROP TABLE purchases_products;






