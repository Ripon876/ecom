const { driver } = require("../../db/db");

module.exports = {
  addCustomer: async (_, args) => {
    const session = driver.session();
    try {
      args.type = "seller";
      const props = Object.keys(args)
        .map((key) => `${key}: ${"$" + key}`)
        .join(", ");

      const result = await session.run(
        `CREATE (u:User {${props}}) RETURN u`,
        args
      );
      if (result.records.length === 0) {
        return null;
      }
      const user = result.records[0].get("u");
      return user.properties;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      session.close();
    }
  },
  getCustomers: async () => {
    const session = driver.session();
    try {
      const result = await session.run("MATCH (u:User) RETURN u");

      if (result.records.length === 0) {
        return null;
      }
      const users = result.records.map((record) => {
        return record.get("u").properties;
      });
      return users;
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
