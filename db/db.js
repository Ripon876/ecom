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

 

 
// async function findPost(id) {
//   const session = driver.session();
//   try {
//     const result = await session.run(
//       `MATCH (p:Post)
//        WHERE ID(p) = $id
//        RETURN p`,
//       { id }
//     );
//     if (result.records.length === 0) {
//       return null;
//     }
//     const post = result.records[0].get("p");
//     return post.properties;
//   } finally {
//     session.close();
//   }
// }

// async function createPost(post) {
//   const session = driver.session();
//   console.log(post);
//   try {
//     console.log("creating new post");

//     const result = await session.run(
//       `CREATE (p:Post {content: $content, created_at: $created_at})
//        WITH p
//        MATCH (u:User {username: $username})
//        CREATE (p) - [:Posted_by] -> (u)
//        RETURN p
//        `,
//       { ...post }
//     );
//     const userNode = result.records[0].get("p");
//     return userNode.properties;
//   } finally {
//     session.close();
//   }
// }

// async function findComment(id) {
//   const session = driver.session();
//   try {
//     const result = await session.run(
//       `MATCH (c:Comment)
//        WHERE ID(c) = $id
//        RETURN c`,
//       { id }
//     );
//     if (result.records.length === 0) {
//       return null;
//     }
//     const comment = result.records[0].get("c");
//     return comment.properties;
//   } finally {
//     session.close();
//   }
// }

// async function createComment(comment) {
//   const session = driver.session();

//   try {
//     console.log("creating new comment");

//     const result = await session.run(
//       `CREATE (c:Comment {content: $content, created_at: $created_at})
//        WITH c
//        MATCH (p:Post)
//        WHERE ID(p) = $post
//        MATCH (u:User {username: $username})
//        CREATE (c) - [:Comment_of] -> (p)
//        CREATE (c) - [:Commented_by] -> (u)
//        RETURN c
//        `,
//       { ...comment }
//     );
//     const userNode = result.records[0].get("c");
//     return userNode.properties;
//   } finally {
//     session.close();
//   }
// }


// (async () => {

// let post = await createPost({
//   content: "this is a post",
//   created_at: new Date().toUTCString(),
//   username: "ripon",
// });

// console.log(post);
// })();

(async () => {
  // let comment = await createComment({
  //   content: "this is a comment",
  //   created_at: new Date().toUTCString(),
  //   post: 7,
  //   username: "ripon",
  // });
  // console.log(comment);
})();

module.exports = {
  // findUser,
  // createUser,
  driver
};




// const {createUser} = require('../controllers/userControler');


// (async () => {
// // const usr = await findUser("ripon");

// let usr = await createUser({
//   username: "ripon",
//   name: "MD Ripon Islam",
//   email: "islamm876ripon@gmail.com",
// });

// console.log(usr);
// })();