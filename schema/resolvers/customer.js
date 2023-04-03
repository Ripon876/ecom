const { driver } = require("../../db/db");

module.exports = {
  addCustomer: async (_, args) => {
    const session = driver.session();
    try {
      const props = Object.keys(args)
        .map((key) => `${key}: ${"$" + key}`)
        .join(", ");

      const result = await session.run(
        `CREATE (c:Customer {${props}}) RETURN c`,
        args
      );
      if (result.records.length === 0) {
        return null;
      }
      const customer = result.records[0].get("c");
      return customer.properties;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      session.close();
    }
  },
  updateCustomer: async (_, args) => {
    const session = driver.session();
    console.log("-process started");
    try {
      const { id, ...props } = args;
      const result = await session.run(
        `
          MATCH (c:Customer)
          WHERE ID(c) = ${id}
          SET c += $props
          RETURN c
        `,
        { props }
      );

      console.log("-customer updated");
      const customer = result.records[0].get("c");
      return customer.properties;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      session.close();
      console.log("-session closed");
    }
  },

  getCustomers: async () => {
    const session = driver.session();
    try {
      const result = await session.run("MATCH (c:Customer) RETURN c");

      if (result.records.length === 0) {
        return null;
      }
      const customers = result.records.map((record) => {
        return record.get("c").properties;
      });
      return customers;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      session.close();
    }
  },
  getCustomerOrders: async (customer) => {
    const session = driver.session();
    try {
      return [];
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      session.close();
    }
  },
};
