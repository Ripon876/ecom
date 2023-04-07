const { driver } = require("../../db/db");
const { nanoid } = require("nanoid");

module.exports = {
  getProducts: async (parent) => {
    const session = driver.session();
    try {
      const result = await session.run("MATCH (p:Product) RETURN p");

      if (result.records.length === 0) {
        return null;
      }
      const products = result.records.map((record) => {
        return record.get("p").properties;
      });
      return products;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      session.close();
    }
  },
  addProduct: async (__, args) => {
    const session = driver.session();
    try {
      args.id = nanoid();
      const props = Object.keys(args)
        .map((key) => `${key}: ${"$" + key}`)
        .join(", ");

      const result = await session.run(
        `CREATE (p:Product {${props}}) RETURN p`,
        args
      );
      if (result.records.length === 0) {
        return null;
      }
      const post = result.records[0].get("p");
      return post.properties;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      session.close();
    }
  },
  updateProduct: async (parent, args) => {
    const session = driver.session();
    try {
      const { id, ...props } = args;

      const result = await session.run(
        `MATCH (p:Product) 
        WHERE ID(p) = ${id}
        SET p += $props 
        RETURN p`,
        { props }
      );

      const updatedProduct = result.records[0].get("p").properties;
      return updatedProduct;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      session.close();
    }
  },
  deleteProduct: async (__, args) => {
    const session = driver.session();
    try {
      const id = args.id;

      const result = await session.run(`
        MATCH (p:Product)
        WHERE ID(p) = ${id}
        DETACH DELETE p
        RETURN true as success
        `);

      return result.records[0].get("success");
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      session.close();
    }
  },
  getSeller: async (product) => {
    const session = driver.session();
    try {
      const result = await session.run(
        `
        MATCH (s:Seller)
        WHERE s.id = "${product.seller}"
        RETURN s
        `
      );
      if (result.records.length === 0) {
        return null;
      }

      return result.records[0].get("s").properties;
    } catch (err) {
      console.log(err);
      return null;
    } finally {
      session.close();
    }
  },
};
