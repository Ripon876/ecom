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
  deleteCustomer: async (_, args) => {
    console.log("-process started");
    const session = driver.session();

    try {
      const { id } = args;
      const result = await session.run(
        `
        MATCH (c:Customer)
        WHERE ID(c) = ${id}
        DETACH DELETE c
        RETURN true as success
        `
      );
      console.log("-customer deleted");
      const success = result.records[0].get("success");
      return success;
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
