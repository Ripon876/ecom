const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
} = require("graphql");
const { ProductType } = require("./product");
const {
  getSellers,
  getSellerProducts,
  addSeller,
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
  getSellers: {
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
};

module.exports = {
  SellerType,
  SellerQuery,
  SellerMutation,
};
