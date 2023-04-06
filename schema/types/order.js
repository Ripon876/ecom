const {
  GraphQLBoolean,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
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

const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLID },
    customer: {
      type: CustomerType,
      resolve: getCustomer,
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
  orders: {
    type: new GraphQLList(OrderType),
    resolve: getOrders,
  },
};

const OrderMutation = {
  addOrder: {
    type: OrderType,
    args: {
      customer: { type: new GraphQLNonNull(GraphQLID) },
      product: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: addOrder,
  },
};

module.exports = {
  OrderType,
  OrderQuery,
  OrderMutation,
};
