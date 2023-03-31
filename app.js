require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
// const { Neo4jGraphQL } = require("@neo4j/graphql");
const app = express();

app.use(express.json());
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// db connnect
require("./db/db");

app.listen(5000, () => {
  console.log("server running at port ", 5000);
});
