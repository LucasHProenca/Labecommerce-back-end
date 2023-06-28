"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.getAllProducts = exports.createProduct = exports.products = exports.getAllUsers = exports.createUser = exports.users = void 0;
exports.users = [
    {
        id: "u001",
        name: "Fulano",
        email: "fulano@email.com",
        password: "fulano123",
        createdAt: new Date().toISOString()
    },
    {
        id: "u002",
        name: "Beltrana",
        email: "beltrana@email.com",
        password: "beltrana00",
        createdAt: new Date().toISOString()
    }
];
const createUser = (user) => {
    exports.users.push(user);
    console.log(user);
};
exports.createUser = createUser;
const getAllUsers = () => {
    console.log(exports.users);
};
exports.getAllUsers = getAllUsers;
exports.products = [
    {
        id: "prod001",
        name: "Mouse Gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        id: "prod002",
        name: "Monitor",
        price: 900,
        description: "Monitor LED Full HD 24 polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400"
    }
];
const createProduct = (product) => {
    exports.products.push(product);
    console.log(product);
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    console.log(exports.products);
};
exports.getAllProducts = getAllProducts;
const searchProductsByName = (name) => {
    const lista = [];
    const novaLista = exports.products.filter((product) => {
        if (name && product.name.toLowerCase().includes(name.toLowerCase())) {
            return product;
        }
    });
    lista.push(novaLista);
    console.log(lista);
};
exports.searchProductsByName = searchProductsByName;
//# sourceMappingURL=database.js.map