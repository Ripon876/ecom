const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
} = require("graphql");
const { ProductType } = require("./product");
const {
  getSellers,
  getSellerProducts,
  addSeller,
  updateSeller,
} = require("../resolvers/seller");

const SellerType = new GraphQLObjectType({
  name: "Seller",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    image: { type: GraphQLString },
    products: {
      type: new GraphQLList(ProductType),
      resolve: getSellerProducts,
    },
  }),
});

const SellerQuery = {
  sellers: {
    type: new GraphQLList(SellerType),
    resolve: getSellers,
  },
};

const SellerMutation = {
  addSeller: {
    type: SellerType,
    args: {
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      image: { type: GraphQLString },
    },
    resolve: addSeller,
  },
  updateSeller: {
    type: SellerType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      image: { type: GraphQLString },
    },
    resolve: updateSeller,
  },
};

module.exports = {
  SellerType,
  SellerQuery,
  SellerMutation,
};
