const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
} = require("graphql");

const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
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
// reviews: {
//   type: new GraphQLList(Review),
//   resolve: async (parent, args, context, info) => {
//     let reviews = await getReviews(parent);
//   },
// },
const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    products: {
      type: new GraphQLList(ProductType),
      resolve: getProducts,
    },
  }),
});

const DeleteProductType = new GraphQLObjectType({
  name: "DeleteProductType",
  fields: {
    success: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
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
        discount: { type: GraphQLFloat },
      },
      resolve: updateProduct,
    },
    deleteProduct: {
      type: DeleteProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: deleteProduct,
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
