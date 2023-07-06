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

    try {

        res.status(200).send(users)

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

app.get("/products", (req: Request, res: Response) => {
    try {
        const nameToFind = req.query.name as string
        if(nameToFind !== undefined) {
            if(nameToFind.length < 1) {
                res.statusCode = (400)
                throw new Error("'Name' deve ter pelo menos 1 caractere")
            }
        }
    
        if (nameToFind) {
            const result: TProducts[] = products.filter(
                (product) => (product.name.toLowerCase().includes(nameToFind.toLowerCase()))
            )
            res.status(200).send(result)
        } else {
            res.status(200).send(products)
        }
        
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

app.post("/users", (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const email = req.body.email as string
        const password = req.body.password as string

        if(typeof id !== "string") {
            res.statusCode = (400)
            throw new Error("'id' deve ser do tipo string")
        }

        const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
        if(typeof name !== "string" || !name.match(nameRegex)){
            res.statusCode = (400)
            throw new Error("'name' deve ser do tipo string e deve conter apenas letras")
        }
    
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if(typeof email !== "string" || !email.match(emailRegex)) {
            res.statusCode = (400)
            throw new Error("'email' deve ter o formato adequado")
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/
        if(typeof password !== "string" || !password.match(passwordRegex)) {
            res.statusCode = (400)
            throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
        }

        const clientExistsId = users.find((client) => client.id === id)
        const clientExistsEmail = users.find((client) => client.email === email)

        if(clientExistsId) {
            res.statusCode = (400)
            throw new Error("'id' já cadastrado")
        }

        if(clientExistsEmail) {
            res.statusCode = (400)
            throw new Error("'email' já cadastrado")
        }

        const newUser: TUsers = {
            id,
            name,
            email,
            password,
            createdAt: new Date().toISOString()
        }
    
        users.push(newUser)
        res.status(201).send({ message: "Cadastro realizado com sucesso", users })
        
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }

})

app.post("/products", (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const price = req.body.price as number
        const description = req.body.description as string
        const imageUrl = req.body.imageUrl as string

        if(typeof id !== "string") {
            res.statusCode = (400)
            throw new Error("'id' deve ser do tipo string")
        }

        if(typeof name !== "string"){
            res.statusCode = (400)
            throw new Error("'name' deve ser do tipo string")
        }

        if(typeof price !== "number"){
            res.statusCode = (400)
            throw new Error("'number' deve ser do tipo number")
        }

        if(typeof description !== "string") {
            res.statusCode = (400)
            throw new Error("'description' deve ser do tipo string")
        }

        if(typeof imageUrl !== "string"){
            res.statusCode = (400)
            throw new Error("'imageUrl' deve ser do tipo string")
        }

        const productExists = products.find((product) => product.id === id)

        if(productExists) {
            res.statusCode = (400)
            throw new Error("'id' já cadastrado")
        }
    
        const newProduct: TProducts = {
            id,
            name,
            price,
            description,
            imageUrl
        }
    
        products.push(newProduct)
    
        res.status(201).send({message :"Produto Cadastrado com sucesso", products})
        
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }

})

app.delete("/users/:id", (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
    
        const userIndex = users.findIndex((user) => user.id === idToDelete)

        if (userIndex < 0) {
            res.statusCode = (404)
            throw new Error("Usuário não encontrado")
        }
        users.splice(userIndex, 1)
        res.status(200).send({ message: "User apagado com sucesso", users })
        
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }

})

app.delete("/products/:id", (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
    
        const productIndex = products.findIndex((product) => product.id === idToDelete)
    
        if (productIndex < 0) {
            res.statusCode = (404)
            throw new Error("Produto não encontrado")
        }
        products.splice(productIndex, 1)
        res.status(200).send({ message: "Produto apagado com sucesso", products })
        
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

app.put("/products/:id", (req: Request, res: Response) => {
    try {
        const idToFind = req.params.id
        const product = products.find((product) => product.id === idToFind)
    
        if(!product) {
            res.statusCode = (400)
            throw new Error("Produto não cadastrado")
        }
    
        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newDescription = req.body.description as string | undefined
        const newImageUrl = req.body.imageUrl as string | undefined
        const newPrice = req.body.price as number | undefined

        if(newId !== undefined) {
            
            if(typeof newId !== "string") {
                res.statusCode = (400)
                throw new Error("'id' deve ser do tipo string")
            }
        }

        if(newName !== undefined) {
            
            if(typeof newName !== "string") {
                res.statusCode = (400)
                throw new Error("'name' deve ser do tipo string")
            }
        }

        if(newDescription !== undefined) {
            
            if(typeof newDescription !== "string") {
                res.statusCode = (400)
                throw new Error("'description' deve ser do tipo string")
            }
        }

        if(newImageUrl !== undefined) {
            
            if(typeof newImageUrl !== "string") {
                res.statusCode = (400)
                throw new Error("'imageUrl' deve ser do tipo string")
            }
        }

        if(newPrice !== undefined) {
            
            if(typeof newPrice !== "number") {
                res.statusCode = (400)
                throw new Error("'number' deve ser do tipo string")
            }
        }
    
        if (product) {
            product.id = newId || product.id
            product.name = newName || product.name
            product.description = newDescription || product.description
            product.imageUrl = newImageUrl || product.imageUrl
            product.price = isNaN(Number(newPrice)) ? product.price : newPrice as number
        }
        res.status(200).send({ message: "Produto atualizado com sucesso", product })
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

