const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../resolvers/product");

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    title: { type: GraphQLString },
    image: { type: GraphQLString },
    price: { type: GraphQLFloat },
    discount: { type: GraphQLFloat },
  }),
});

// queries
const ProductQuery = {
  products: {
    type: new GraphQLList(ProductType),
    resolve: getProducts,
  },
};

// mutations
const ProductMutation = {
  addProduct: {
    type: ProductType,
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      image: { type: new GraphQLNonNull(GraphQLString) },
      price: { type: new GraphQLNonNull(GraphQLFloat) },
      discount: { type: new GraphQLNonNull(GraphQLFloat) },
    },
    resolve: addProduct,
  },
  updateProduct: {
    type: ProductType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      title: { type: GraphQLString },
      image: { type: GraphQLString },
      price: { type: GraphQLFloat },
      discount: { type: GraphQLInt },
    },
    resolve: updateProduct,
  },
  deleteProduct: {
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: deleteProduct,
  },
};

module.exports = {
  ProductQuery,
  ProductType,
  ProductMutation,
};
