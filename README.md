# Labecommerce-back-end

// Além disso, você deve criar um README.md para seu repositório, explicando a API Labecommerce. Nesse README, inclua o link para a coleção de requisições do passo a.

![17](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/afe9406a-8a0c-4c9d-b46b-9a322abacfb0)

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-como-executar-o-projeto">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#-autor">Autor</a> • 
</p>

## 💻 Sobre o projeto

🛸 Toy Star - Essa API foi desenvolvida como um facilitador para cadastrar produtos e clientes para a loja Toy Star, que é um e-commerce personalizado de brinquedos da franquia Star Wars, com isso, oferecemos produtos em todas as faixas de preço e gosto, visando atender desde o pequeno fã até o colecionador fanático.
Porém, não é restrita a apenas o uso da nossa loja, uma vez que é possível cadastrar seus próprios produtos e clientes, assim como organizar e cancelar pedidos de quaisquer seguimentos.

Projeto desenvolvido durante o **Bootcamp Web Full-Stack** da [Labenu](https://www.labenu.com.br/curso-de-programacao-web-full-stack-integral).
Esse bootcamp é uma experiência online é um programa com mais de 1000 horas de experiência prática em desenvolvimento Full-stack e projetos individuais.

---

## ⚙️ Funcionalidades

- [x] Empresas ou empreendedores individuais podem cadastrar seus produtos e compradores na API utilizando todas as requisições que temos a oferecer:
  - [x] getAllUsers
  - [x] getAllProducts
  - [x] createUser
  - [x] createProduct  
  - [x] deleteUserById
  - [x] deleteProductById
  - [x] editProductById
  - [x] createPurchase
  - [x] getPurchaseById
  - [x] deletePurchaseById

---

## 🚀 Como executar a api

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina o [Postman](https://www.postman.com/downloads/), é possível também utilizar a API pela versão web do Postman, no entanto, utilizaremos a versão para desktop para minimizar quaisquer chances de problemas.
Feito isso acesse a documentação da [API](https://documenter.getpostman.com/view/27682612/2s93zFWJwG) e clique em "Run in Postman" localizado no canto superior direito para abrir dentro do app.

### Requisições

#### getAllUsers
A requisição getAllUsers tem duas funcionalidades diferentes:

Caso nada seja escrito após "/users", será retornada a lista completa de usuários cadastrados, como podemos ver no exemplo "getAllUsersF1";

![getAllUsersF1Request](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/5424d632-891a-4d76-862c-4a27fae223c3)

![getAllUsersF1Response](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/63d219a8-b2a8-405f-b005-3043c6e65b5a)

Caso um usuário não cadastrado seja enviado como paramêtro, por exemplo, "/users?id=u010", será retornada uma lista vazia que é referenciada por [ ];
Caso não seja inserido um "id" completo, será retornado todos os usuários que contenham os paramêtros inseridos;
Caso um usuário cadastrado seja enviado como paramêtro, apenas ele será retornado, como podemos ver no exemplo "getAllUsersF2".

![getAllUsersF2Request](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/e8d3b8cf-918d-49f6-a937-b0892360b25c)

![getAllUsersF2Response](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/5e8859c4-1e98-4dac-9401-e1155e977167)


#### getAllProducts
A requisição getAllProducts tem duas funcionalidades diferentes:

Caso nada seja escrito após "/products", será retornada a lista completa de produtos cadastrados, como podemos ver no exemplo "getAllProductsF1";

![getAllProductsF1Request](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/b7c9ffc1-b7f0-42b8-bcc0-b7cfe95f097d)

![getAllProductsF1Response](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/1e4b9f30-ef7a-4bc0-b5a6-f2359482a260)

Caso um produto não cadastrado seja enviado como paramêtro, por exemplo, "/products?name=escovaDeDente", será retornada uma lista vazia que é referenciada por [ ];
Caso não seja inserido um "name" completo, será retornado todos os produtos que contenham os paramêtros inseridos;
Caso um produto cadastrado seja enviado como paramêtro, apenas ele será retornado, como podemos ver no exemplo "getAllProductsF2".

![getAllProductsF2Request](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/6635c622-f9fc-4fe6-b290-3cdf7d3350e9)

![getAllProductsF2Response](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/9c7d0ad8-7a01-4919-9052-ac87c5047e8f)


#### createUser
A requisição createUser tem apenas uma funcionalidade, porém alguns dados precisam ser inseridos no corpo da requisição, são esses:

"id",
"name",
"email",
"password".
Contudo, foram implementadas as seguintes restrições:
Caso o "id" já tenha sido cadastrado por outro usuário, não será possível concluir o cadastro;
Caso o "email" já tenha sido cadastrado por outro usuário ou, não possua o formato de email "@email.com" não será possível concluir o cadastro;
É obrigatório que o "password" tenha entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial.

![createUserRequest](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/42d905d3-2277-4a42-9eaa-03613f6a557c)

![createUserResponse](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/69e437d2-97bf-46da-b0b4-02feb482afbd)


##### createProduct
A requisição createProduct tem apenas uma funcionalidade, porém alguns dados precisam ser inseridos no corpo da requisição, são esses:

"id",
"name",
"price",
"description",
"imageUrl".
Contudo, foi implementada a seguinte restrição:
Caso o "id" já tenha sido cadastrado por outro usuário, não será possível concluir o cadastro.

![createProductRequest](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/cd7de88a-e7d8-4430-9441-b01852dbfe86)

![createProductResponse](https://github.com/LucasHProenca/Labecommerce-back-end/assets/106993403/b2bcdcbe-eeac-423a-a44d-9a3541dca6c6)

