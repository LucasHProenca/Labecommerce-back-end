import { users } from "./database";
import { products } from "./database";
import { createUser } from "./database";
import { getAllUsers } from "./database";
import { createProduct } from "./database";
import { getAllProducts } from "./database";
import { searchProductsByName } from "./database";
import express, { Request, Response } from "express"
import cors from "cors"
import { TProducts, TUsers } from "./types";

console.log("Hello, faruqi")
// console.log(users)
// console.log(products)
// DA PRA FAZER COM ARGV TBM createUser(process.argv[2], process.argv[3], process.argv[4], process.argv[5])
createUser("u003", "astrodev", "astrodev@email.com", "astrodev99")
console.log(getAllUsers())

createProduct("prod003", "SSD Gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação", "https://picsum.photos/seed/SSD%20gamer/400")
console.log(getAllProducts())
searchProductsByName("gamer")

const app = express()

app.use(express.json())

app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Outra coisa")
})

app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(products)
})

app.get("/product", (req: Request, res: Response) => {
    const nameToFind = req.query.name as string

    if (nameToFind) {
        const result: TProducts[] = products.filter(
            (product) => (product.name.toLowerCase().includes(nameToFind.toLowerCase()))
        )
        res.status(200).send(result)
    } else {
        res.status(200).send(products)
    }
})

app.post("/users", (req: Request, res: Response) => {
    const id = req.body.id as string
    const name = req.body.name as string
    const email = req.body.email as string
    const password = req.body.password as string

    const newUser: TUsers = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    }

    users.push(newUser)

    res.status(201).send({message: "Cadastro realizado com sucesso", users})
})

app.post("/products", (req: Request, res: Response) => {
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const description = req.body.description as string
    const imageUrl = req.body.imageUrl as string

    const newProduct: TProducts = {
        id,
        name,
        price,
        description,
        imageUrl
    }

    products.push(newProduct)

    res.status(201).send("Produto Cadastrado com sucesso")
})

app.delete("/users/:id", (req: Request, res: Response) => {
    const idToDelete = req.params.id

    const userIndex = users.findIndex((user) => user.id === idToDelete)

    if (userIndex >= 0) {
        users.splice(userIndex, 1)
    }

    res.status(200).send({ message: "User apagado com sucesso", users })
})

app.delete("/products/:id", (req: Request, res: Response) => {
    const idToDelete = req.params.id

    const productIndex = products.findIndex((product) => product.id === idToDelete)

    if (productIndex >= 0) {
        products.splice(productIndex, 1)
    }

    res.status(200).send({ message: "User apagado com sucesso", products })
})

app.put("/products/:id", (req: Request, res: Response) => {
    const idToFind = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newDescription = req.body.description as string | undefined
    const newImageUrl = req.body.imageUrl as string | undefined
    const newPrice = req.body.price as number | undefined

    const product = products.find((product) => product.id === idToFind)

    if (product) {
        product.id = newId || product.id
        product.name = newName || product.name
        product.description = newDescription || product.description
        product.imageUrl = newImageUrl || product.imageUrl
        product.price = isNaN(Number(newPrice))? product.price : newPrice as number
    }
    

    res.status(200).send({message: "Produto atualizado com sucesso", product})
})

