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
import { db } from "./database/knex";
import { resourceLimits } from "worker_threads";

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

// JÁ REFATORADO
app.get("/users", async (req: Request, res: Response) => {
    try {
        const idToFind = req.query.id as string

        if (idToFind !== undefined) {
            if (idToFind.length < 1) {
                res.statusCode = (400)
                throw new Error("'Id' deve ter pelo menos 1 caractere")
            }
        }

        if(idToFind) {
            const result = await db.select(
                "users.id",
                "users.name",
                "users.email",
                "users.password",
                "users.created_at AS createdAt"
            ).from("users").where("id", "LIKE", `%${idToFind}%`)
            res.status(200).send(result)
        } else {
            const users = await db.select(
                "users.id",
                "users.name",
                "users.email",
                "users.password",
                "users.created_at AS createdAt"
            ).from("users")
            res.status(200).send(users)
        }

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})
// JÁ REFATORADO
app.get("/products", async (req: Request, res: Response) => {
    try {
        const nameToFind = req.query.name as string
        if (nameToFind !== undefined) {
            if (nameToFind.length < 1) {
                res.statusCode = (400)
                throw new Error("'Name' deve ter pelo menos 1 caractere")
            }
        }

        if(nameToFind) {
            const result = await db.select(
                "products.id",
                "products.name",
                "products.price",
                "products.description",
                "products.image_url AS imageUrl"
            ).from("products").where("name", "LIKE", `%${nameToFind}%`)
            res.status(200).send(result)
        } else {
            const products = await db.select(
                "products.id",
                "products.name",
                "products.price",
                "products.description",
                "products.image_url AS imageUrl"
            ).from("products")
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

// JÁ REFATORADO
app.post("/users", async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const email = req.body.email as string
        const password = req.body.password as string

        if (typeof id !== "string") {
            res.statusCode = (400)
            throw new Error("'id' deve ser do tipo string")
        }

        const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
        if (typeof name !== "string" || !name.match(nameRegex)) {
            res.statusCode = (400)
            throw new Error("'name' deve ser do tipo string e deve conter apenas letras")
        }

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (typeof email !== "string" || !email.match(emailRegex)) {
            res.statusCode = (400)
            throw new Error("'email' deve ter o formato adequado")
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/
        if (typeof password !== "string" || !password.match(passwordRegex)) {
            res.statusCode = (400)
            throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
        }

        const [userIdExists] = await db("users").where({id: id})
        const [userEmailExists] = await db("users").where({email: email})

        if (userIdExists) {
            res.statusCode = (400)
            throw new Error("'id' já cadastrado")
        }

        if (userEmailExists) {
            res.statusCode = (400)
            throw new Error("'email' já cadastrado")
        }

        await db.insert({
            id,
            name,
            email,
            password,
            created_at: new Date().toLocaleString("pt-br")
        }).into("users")

        res.status(201).send({ message: "Cadastrado realizado com sucesso"})

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }

})

//JÁ REFATORADO
app.post("/products", async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const price = req.body.price as number
        const description = req.body.description as string
        const imageUrl = req.body.imageUrl as string

        if (typeof id !== "string") {
            res.statusCode = (400)
            throw new Error("'id' deve ser do tipo string")
        }

        if (typeof name !== "string") {
            res.statusCode = (400)
            throw new Error("'name' deve ser do tipo string")
        }

        if (typeof price !== "number") {
            res.statusCode = (400)
            throw new Error("'number' deve ser do tipo number")
        }

        if (typeof description !== "string") {
            res.statusCode = (400)
            throw new Error("'description' deve ser do tipo string")
        }

        if (typeof imageUrl !== "string") {
            res.statusCode = (400)
            throw new Error("'imageUrl' deve ser do tipo string")
        }

        const [productIdExists] = await db("products").where({id: id})

        if (productIdExists) {
            res.statusCode = (400)
            throw new Error("'id' já cadastrado")
        }

        await db.insert({
            id,
            name,
            price,
            description,
            image_url: imageUrl
        }).into("products")

        res.status(201).send({ message: "Produto cadastrado com sucesso"})
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }

})

// Create Purchase 
app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const id = req.body.id 
        const buyer = req.body.buyer 
        const products = req.body.products

        if(typeof id !== "string") {
            res.status(400)
            throw new Error("'id' precisa ser uma string")
        }

        if(typeof buyer !== "string") {
            res.status(400)
            throw new Error("'buyer' precisa ser uma string")
        }

        const [purchase] = await db("purchases").where({id})
        const [user] = await db("users").where({id: buyer})

        if(purchase) {
            res.status(400)
            throw new Error("Esse pedido já existe")
        }

        if(!user) {
            res.status(400)
            throw new Error("Usuário não cadastrado")
        }

        const resultProducts = []
        let totalPrice = 0
        for(let prod of products) {
            const [product] = await db("products").where({id: prod.id})
            if(!product) {
                res.status(400)
                throw new Error(`${prod.id} não encontrado`)
            }
            resultProducts.push({...product, quantity: prod.quantity})
        }

        for(let product of resultProducts) {
            totalPrice += product.price * product.quantity
        }

        const newPurchase = {
            id,
            buyer,
            total_price: totalPrice,
            created_at: new Date().toLocaleString("pt-br")
        }
        await db('purchases').insert(newPurchase)

        for(let product of products) {
            const newPurchaseProducts = {
                purchase_id: id,
                product_id: product.id,
                quantity: product.quantity
            }
            await db('purchases_products').insert(newPurchaseProducts)
        }

        res.status(201).send({message: "Pedido realizado com sucesso"})

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

// JÁ REFATORADO
app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [userIndex] = await db.select("*").from("users").where({id: idToDelete})

        if (userIndex < 0 || !userIndex) {
            res.statusCode = (404)
            throw new Error("Usuário não encontrado")
        }
        
        await db.delete().from("users").where({id: idToDelete})
        res.status(200).send({ message: "Usuário apagado com sucesso"})

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }

})

// JÁ REFATORADO
app.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [productIndex] = await db.select("*").from("products").where({id: idToDelete})

        if (productIndex < 0 || !productIndex) {
            res.statusCode = (404)
            throw new Error("Produto não encontrado")
        }

        await db.delete().from("products").where({id: idToDelete})
        res.status(200).send({ message: "Produto apagado com sucesso"})

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

// JÁ REFATORADO
app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [purchase] = await db("purchases_products").where({purchase_id: idToDelete})
        const [purc] = await db("purchases").where({id: idToDelete})

        if(purc) {
            await db("purchases").del().where({id: idToDelete})
        }else {
            res.status(404)
            throw new Error("'id' do pedido não encontrado")
        }
        if(purchase) {
            await db("purchases_products").del().where({purchase_id: idToDelete})
        }else {
            res.status(404)
            throw new Error("'id' do pedido não encontrado")
        }
        res.status(200).send({message : "Pedido cancelado com sucesso"})

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const idToFind = req.params.id
       
        const [productIdExists] = await db.select("*").from("products").where({id: idToFind})

        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newDescription = req.body.description as string | undefined
        const newImageUrl = req.body.imageUrl as string | undefined
        const newPrice = req.body.price as number | undefined

        if (newId !== undefined) {

            if (typeof newId !== "string") {
                res.statusCode = (400)
                throw new Error("'id' deve ser do tipo string")
            }
        }

        if (newName !== undefined) {

            if (typeof newName !== "string") {
                res.statusCode = (400)
                throw new Error("'name' deve ser do tipo string")
            }
        }

        if (newDescription !== undefined) {

            if (typeof newDescription !== "string") {
                res.statusCode = (400)
                throw new Error("'description' deve ser do tipo string")
            }
        }

        if (newImageUrl !== undefined) {

            if (typeof newImageUrl !== "string") {
                res.statusCode = (400)
                throw new Error("'imageUrl' deve ser do tipo string")
            }
        }

        if (newPrice !== undefined) {

            if (typeof newPrice !== "number") {
                res.statusCode = (400)
                throw new Error("'number' deve ser do tipo number")
            }
        }

         if (productIdExists) {    
            await db.update({
                id: newId || productIdExists.id,
                name: newName || productIdExists.name,
                price: isNaN(Number(newPrice)) ? productIdExists.price : newPrice as number,
                description: newDescription || productIdExists.description,
                image_url: newImageUrl || productIdExists.image_url
            }).from("products").where({id: idToFind})
            
        } else {
            res.statusCode = (400)
            throw new Error("Produto não cadastrado, cadastre antes de editar")
        }

        res.status(200).send({ message: "Produto atualizado com sucesso" })
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// Aprofundamento knex

app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const idToFind = req.params.id

        const [purchaseIdExists] = await db.select("*").from("purchases").where({id: idToFind})

        if (purchaseIdExists) {
            const [result] = await db("purchases")
                .select(
                    "purchases.id AS purchaseId",
                    "purchases.buyer AS buyerId",
                    "users.name AS buyerName",
                    "users.email AS buyerEmail",
                    "purchases.total_price AS totalPrice",
                    "purchases.created_at AS createdAt", 
                )
                .innerJoin("users",
                    "purchases.buyer",
                    "=",
                    "users.id"
                )
                .where("purchases.id", "=", `${idToFind}`)

            const products = await db("purchases_products")
            .select(
                "products.id AS id",
                "products.name AS name",
                "products.price AS price",
                "products.description AS description",
                "products.image_url AS imageUrl",
                "purchases_products.quantity AS quantity"
            )
            .innerJoin(
                "products",
                "purchases_products.product_id",
                "=",
                "products.id"
            )
            .where("purchases_products.purchase_id", "=", `${idToFind}`)

            res.status(200).send({...result, products})
        }else {
            res.status(404)
            throw new Error("'id' não encontrada")
        }
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

