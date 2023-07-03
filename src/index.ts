import { users } from "./database";
import { products } from "./database";
import { createUser } from "./database";
import { getAllUsers } from "./database";
import { createProduct } from "./database";
import { getAllProducts } from "./database";
import { searchProductsByName } from "./database";
import express, {Request, Response} from "express"
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

    if(nameToFind) {
        const result: TProducts[] = products.filter(
            (product) => (product.name.toLowerCase().includes(nameToFind.toLowerCase()))
        )
        res.status(200).send(result)
    }else {
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

    res.status(201).send("Cadastro realizado com sucesso")
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

