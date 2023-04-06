// const { session } = require("neo4j-driver");
const { driver } = require("../../db/db");
const { nanoid } = require("nanoid");

module.exports = {
  getCustomer: async (order) => {
    const session = driver.session();
    try {
      const result = await session.run(
        `
        MATCH (c:Customer)
        WHERE ID(c) = ${order.customer}
        RETURN c
        `
      );
      if (result.records.length === 0) {
        return null;
      }

      return result.records[0].get("c").properties;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      session.close();
    }
  },
  getSeller: async (order) => {
    return null;
  },
  getProduct: async (order) => {
    const session = driver.session();
    try {
      const result = await session.run(
        `
        MATCH (p:Product)
        WHERE ID(p) = ${order.product}
        RETURN p
        `
      );
      if (result.records.length === 0) {
        return null;
      }

      return result.records[0].get("p").properties;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      session.close();
    }
  },
  getOrders: async () => {
    return null;
  },
  addOrder: async (_, args) => {
    console.log("-process started");
    const session = driver.session();
    try {
      const { customer, product } = args;
      // const props = Object.keys(args)
      // .map((key) => `${key}: ${"$" + key}`)
      // .join(", ");

      // const result = await session.run(
      //   `CREATE (p:Product {${props}}) RETURN p`,
      //   args
      // );

      const result = await session.run(
        `
        MATCH (c:Customer), (p:Product)
        WHERE ID(c) = ${customer} AND ID(p) = ${product}
        CREATE (c)-[o:ORDERED {id: "${nanoid()}",paid: false,delivered: false}] -> (p)
        RETURN o
        `
      );

      if (result.records.length === 0) {
        return null;
      }
      const order = result.records[0].get("o");
      console.log("-order created");
      return {
        ...order.properties,
        customer,
        product,
      };
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      session.close();
      console.log("-session closed");
    }
  },
};
