import { users } from "./database";
import { products } from "./database";
import { createUser } from "./database";
import { getAllUsers } from "./database";
import { createProduct } from "./database";
import { getAllProducts } from "./database";
import { searchProductsByName } from "./database";

console.log("Hello, faruqi")
// console.log(users)
// console.log(products)
 createUser({id: "u003", name: "astrodev", email: "astrodev@email.com", password: "astrodev99", createdAt: new Date().toISOString() })
 getAllUsers()

 createProduct({id: "prod003", name: "SSD Gamer", price: 349.99, description: "Acelere seu sistema com velocidades incríveis de leitura e gravação", imageUrl: "https://picsum.photos/seed/SSD%20gamer/400"})
 getAllProducts()
searchProductsByName("gamer")