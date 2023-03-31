const {
  GraphQLBoolean,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} = require("graphql");

const { addCustomer, getCustomers } = require("../resolvers/user");
const { ProductType } = require("./product");

const CustomerType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    image: { type: GraphQLString },
    orders: {
      type: new GraphQLList(ProductType),
      resolve: () => {},
    },
  }),
});

// const UserType = new GraphQLObjectType({
//   name: "User",
//   fields: () => {
//     let type = { type: GraphQLString };
//     return {
//       name: { type: GraphQLString },
//       email: { type: GraphQLString },
//       type,
//       ...(type === "seller"
//         ? {
//             vendor: { type: GraphQLString },
//             products: { type: GraphQLString },
//           }
//         : {}),
//     };
//   },
// });

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
    },
    resolve: addCustomer,
  },
};

module.exports = {
  CustomerType,
  CustomerQuery,
  CustomerMutation,
};
