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

// DA PRA FAZER COM ARGV TBM createUser(process.argv[2], process.argv[3], process.argv[4], process.argv[5])
 createUser("u003", "astrodev", "astrodev@email.com", "astrodev99")
 console.log(getAllUsers())

 createProduct("prod003", "SSD Gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação", "https://picsum.photos/seed/SSD%20gamer/400")
 console.log(getAllProducts())
searchProductsByName("gamer")