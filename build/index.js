"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const database_2 = require("./database");
const database_3 = require("./database");
const database_4 = require("./database");
const database_5 = require("./database");
console.log("Hello, faruqi");
(0, database_1.createUser)("u003", "astrodev", "astrodev@email.com", "astrodev99");
console.log((0, database_2.getAllUsers)());
(0, database_3.createProduct)("prod003", "SSD Gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação", "https://picsum.photos/seed/SSD%20gamer/400");
console.log((0, database_4.getAllProducts)());
(0, database_5.searchProductsByName)("gamer");
//# sourceMappingURL=index.js.map