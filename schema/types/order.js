const {
  GraphQLBoolean,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
} = require("graphql");

const { CustomerType } = require("./customer");
const { SellerType } = require("./seller");
const { ProductType } = require("./product");
const {
  getCustomer,
  getSeller,
  getProduct,
  getOrders,
  addOrder,
} = require("../resolvers/order");
const { ProductType } = require("./product");

const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLID },
    customer: {
      type: CustomerType,
      resolve: getCustomer,
    },
    seller: {
      type: SellerType,
      resolve: getSeller,
    },
    product: {
      type: ProductType,
      resolve: getProduct,
    },
    paid: { type: GraphQLBoolean },
    delivered: { type: GraphQLBoolean },
  }),
});

const OrderQuery = {
  getOrders: {
    type: new GraphQLList(OrderType),
    resolve: getOrders,
  },
};

const OrderMutation = {
  addOrder: {
    type: OrderType,
    args: {
      customer: { type: GraphQLString },
      seller: { type: GraphQLString },
      product: { type: GraphQLString },
    },
    resolve: addOrder,
  },
};

module.exports = {
  OrderType,
  OrderQuery,
  OrderMutation,
};
