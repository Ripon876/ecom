const { driver } = require("../../db/db");

module.exports = {
  getSellers: async () => {},
  getSellerProducts: async (seller) => {},
  addSeller: async (_, args) => {
    const session = driver.session();
    console.log("-process started");
    try {
      const props = Object.keys(args)
        .map((key) => `${key}: ${"$" + key}`)
        .join(", ");

      const result = await session.run(
        `CREATE (s:Seller {${props}}) RETURN s`,
        args
      );

      if (result.records.length === 0) {
        return null;
      }
      console.log("-seller added");
      const seller = result.records[0].get("s");
      return seller.properties;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      session.close();
      console.log("-session closed");
    }
  },
  updateSeller: async (_, args) => {
    console.log("-process started");
    const session = driver.session();
    try {
      const { id, ...props } = args;
      const result = await session.run(
        `
        MATCH (s:Seller)
        WHERE ID(s) = ${id}
        SET s += $props
        RETURN s
        `,
        { props }
      );
      console.log("-seller updated");
      const seller = result.records[0].get("s");
      return seller.properties;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      session.close();
      console.log("-session closed");
    }
  },
  deleteSeller: async (_, args) => {
    console.log("-process started");
    const session = driver.session();

    try {
      const { id } = args;
      const result = await session.run(
        `
        MATCH (s:Seller)
        WHERE ID(s) = ${id}
        DETACH DELETE s
        RETURN true as success
        `
      );
      console.log("-seller deleted");
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
};
