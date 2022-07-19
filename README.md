** Em desenvolvimento .. **
#Como executar a aplicação no estado atual:
pre-requisitos:
- docker e docker-compose
- quarkus
- npm e node

1. Rodar o container com o banco SQL configurado utilizando os scripts da pasta /sql. comando:
`docker-compose up`

2. Acessar o diretório do backend (backend/quarkus-reactive-sql-client/)
comando:
`mvn quarkus:dev`


3. Acessar o diretório do frontend (frontend/react-autoflex/), instalar as dependências.
comando:
`npm install`
`npm start`

4. a aplicação ficará disponível em http://localhost:8080/ .

Nota: foi adicionada política de CORS ao backend em application.properties para rodar localmente.

### Estágio de desenvolvimento:
#### Tabelas SQL
<input type="checkbox" checked> Banco SQL - Tabelas
<input type="checkbox" checked> Banco SQL - Regras de negócio Tabelas
<input type="checkbox" checked> Banco SQL - Insert de dados para testes

<input type="checkbox" checked> docker-compose para banco de dados

#### Backend
<input type="checkbox" checked> Backend - Build
<input type="checkbox" checked> Backend - endpoints Product
<input type="checkbox" checked> Backend - endpoints Material
<input type="checkbox" checked> Backend - endpoints Ingredient
<input type="checkbox" checked> Backend - exceptions
<input type="checkbox"> Backend - Testes [INCOMPLETOS, falta subir banco em memória]

<input type="checkbox" > docker-compose para backend

#### Frontend
<input type="checkbox" checked> Frontend - Build
<input type="checkbox" checked> Frontend - Jquery
<input type="checkbox" checked> Frontend - Redux Provider
<input type="checkbox" checked> Frontend - API services


<input type="checkbox" checked> Frontend - Componente de navegação NavbarComponent
<input type="checkbox" > Frontend - Footer
<input type="checkbox" > Frontend - page Product (falta configurar ação de put(editar) e respectiva interface)
<input type="checkbox" > Frontend - page Material (falta configurar ação de put(editar) e respectiva interface)
<input type="checkbox" checked> Frontend - page Welcome ('/')


<input type="checkbox" checked> Frontend - component ProductCard
<input type="checkbox" > Frontend - component IngredientCard (falta configurar ação de put(editar) e respectiva interface)

<input type="checkbox"> Frontend - style (css)

<input type="checkbox"> some Frontend Tests (Cypress)

<input type="checkbox" > docker-compose para frontend


# Teste Prático - Autoflex

## Descrição do problema:

Uma indústria que produz produtos diversos, necessita controlar o estoque dos insumos (matérias-primas) necessárias para a produção dos itens que fabrica. Para isso será necessário o desenvolvimento de um sistema que permita manter o controle dos produtos e das matérias-primas que são utilizadas para a produção de cada produto.

Para o produto devem ser armazenados, além do código, o nome e o valor.

Para as matérias-primas, além do código, também devem armazenados o nome e quantidade em estoque. Obviamente, deverá ser feito a associação dos produtos e das matérias primas que o compõem, com as respectivas quantidades necessárias de cada matéria prima para produzir o produto.

Além da manutenção dos cadastros, deseja-se saber quais produtos (e quais quantidades) podem ser produzidos com as matérias-primas em estoque, e o valor total que será obtido com a produção sugerida pelo sistema.

A priorização de quais produtos devem ser sugeridos pelo sistema, deve ser pelos produtos de maior valor, uma vez que uma determinada matéria-prima pode ser utilizada em mais de um produto.

# Requisitos:

## - Requisitos não funcionais

RNF001 – O sistema deverá ser desenvolvido para a plataforma WEB, sendo possível a execução nos principais navegadores (Chrome, Firefox, Edge).

RNF002 – O sistema deverá ser construído utilizando o conceito de API, ou seja, separar o back-end do front-end.

RNF003 – As telas desenvolvidas no front-end devem utilizar os recursos de responsividade.

RNF004 – A persistência de dados deve ser realizada em Sistema Gerenciador de Banco de Dados, com a possibilidade de utilizar Postgres, MySql ou Oracle. Caso tenha instalado o Oracle, a sugestão é utilizá-lo.

RNF005 – O back-end (API) deve ser desenvolvido utilizando algum framework, como Spring, Quarkus ou similar. Caso você conheça Quarkus, a sugestão é que aplique já que é uma das tecnologias utilizadas no Autoflex.

RNF006 – O front-end pode ser desenvolvido utilizando qualquer linguagem ou framework que possibilite o atendimento dos requisitos. Caso você conheça React e Redux, a sugestão é que aplique já que são tecnologias utilizadas no Autoflex.

RNF007 – Tanto a codificação do back-end, front-end, tabelas e colunas do banco de dados devem ser desenvolvidas utilizando a língua inglesa.

## - Requisitos funcionais

RF001 – Desenvolver no back-end as funcionalidades CRUD para manter o cadastro de produtos.

RF002 – Desenvolver no back-end as funcionalidades CRUD para manter o cadastro de matérias primas.

RF003 – Desenvolver no back-end as funcionalidades CRUD para associar matérias-primas aos produtos.

RF004 – Desenvolver no back-end as funcionalidades para a consulta dos produtos que podem ser produzidos com as matérias-primas disponíveis em estoque.

RF005 – Desenvolver no front-end uma interface gráfica que possibilite realizar as operações CRUD para manter o cadastro de produtos.

RF006 – Desenvolver no front-end uma interface gráfica que possibilite realizar as operações CRUD para manter o cadastro de matérias primas.

RF007 – Desenvolver no front-end uma interface gráfica que possibilite realizar as operações CRUD para associar matérias-primas aos produtos. Não há a necessidade de ser uma tela separada, podendo ser inserida a interface no cadastro de produtos.

RF008 – Desenvolver no front-end uma interface gráfica que possibilite listar quais produtos (e quais quantidades) podem ser produzidos com as matérias-primas disponíveis em estoque.

## Desejável:

- Desenvolvimento de testes unitários para o back-end e para o front-end

- Desenvolvimento de testes de integração. Caso tenha conhecimento da tecnologia Cypress, a sugestão é utilizá-la já que utilizamos no Autoflex.



### Atenção 🚩

A entrega deste teste prático deverá ser da seguinte forma:

Postar os códigos publicamente em sua conta do GitHub e nos passar o link de acesso.

Opcionalmente, caso você consiga fazer o build da aplicação, poderá também informar o link de acesso.

Após o repasse dos códigos, é possível entrarmos em contato para agendarmos uma entrevista com nossa equipe técnica.


Boa sorte! 🍀
