const neo4j = require("neo4j-driver");

// Set up the Neo4j driver
const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

driver
  .verifyConnectivity()
  .then(() => {
    console.log("Successfully connected to Neo4j database!");
  })
  .catch((error) => {
    console.error("Error connecting to Neo4j database:", error);
    driver.close();
  });

module.exports = {
  driver,
};
