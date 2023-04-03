const {
  GraphQLBoolean,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} = require("graphql");

const {
  addCustomer,
  getCustomers,
  getCustomerOrders,
  updateCustomer,
  deleteCustomer,
} = require("../resolvers/customer");
const { ProductType } = require("./product");

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    image: { type: GraphQLString },
    orders: {
      type: new GraphQLList(ProductType),
      resolve: getCustomerOrders,
    },
  }),
});

const CustomerQuery = {
  customers: {
    type: new GraphQLList(CustomerType),
    resolve: getCustomers,
  },
};

const CustomerMutation = {
  addCustomer: {
    type: CustomerType,
    args: {
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      iamge: { type: GraphQLString },
    },
    resolve: addCustomer,
  },
  updateCustomer: {
    type: CustomerType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      image: { type: GraphQLString },
    },
    resolve: updateCustomer,
  },
  deleteCustomer: {
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: deleteCustomer,
  },
};

module.exports = {
  CustomerType,
  CustomerQuery,
  CustomerMutation,
};
