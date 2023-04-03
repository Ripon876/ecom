const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const { ProductQuery, ProductMutation } = require("./types/product");
const { CustomerQuery, CustomerMutation } = require("./types/customer");
const { SellerQuery, SellerMutation } = require("./types/seller");
const { OrderQuery, OrderMutation } = require("./types/order");

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    ...CustomerQuery,
    ...SellerQuery,
    ...ProductQuery,
    ...OrderQuery,
  }),
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...CustomerMutation,
    ...SellerMutation,
    ...ProductMutation,
    ...OrderMutation,
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
