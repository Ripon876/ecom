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
};
