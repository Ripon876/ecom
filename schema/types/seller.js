const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
} = require("graphql");

const {
  getSellers,
  getSellerProducts,
  addSeller,
  updateSeller,
  deleteSeller,
} = require("../resolvers/seller");

const SellerType = new GraphQLObjectType({
  name: "Seller",
  fields: () => {
    const { ProductType } = require("./product");
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      image: { type: GraphQLString },
      products: {
        type: new GraphQLList(ProductType),
        resolve: getSellerProducts,
      },
    };
  },
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
  deleteSeller: {
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: deleteSeller,
  },
};

module.exports = {
  SellerType,
  SellerQuery,
  SellerMutation,
};
