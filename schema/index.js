const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const { ProductQuery, ProductMutation } = require("./types/product");
const { CustomerQuery, CustomerMutation } = require("./types/customer");

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    ...CustomerQuery,
    ...ProductQuery,
  }),
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...CustomerMutation,
    ...ProductMutation,
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
