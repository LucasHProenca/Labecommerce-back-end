import { TUsers } from "./types";
import { TProducts } from "./types";

export const users: TUsers[] = [
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
]

export const createUser = (user: TUsers) => {
    users.push(user)
    console.log(user)
}

export const getAllUsers = () => {
    console.log(users)
}

export const products: TProducts[] = [
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
]

export const createProduct = (product: TProducts) => {
    products.push(product)
    console.log(product)
}

export const getAllProducts = () => {
    console.log(products)
}

export const searchProductsByName = (name: string) => {
    const lista = []
        const novaLista = products.filter((product) => {
            if(name && product.name.toLowerCase().includes(name.toLowerCase())){
                return product
            }
        })
        lista.push(novaLista)
        console.log(lista)
   
}