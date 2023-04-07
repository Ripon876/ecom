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
        WHERE c.id = "${order.customer}"
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
        WHERE p.id = "${order.product}"
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

      const result = await session.run(
        `
        MATCH (c:Customer), (p:Product)
        WHERE c.id = "${customer}" AND p.id = "${product}"
        CREATE (c)-[o:Ordered {id: "${nanoid()}",paid: false,delivered: false}] -> (p)
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
