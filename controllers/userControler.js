const { driver } = require("../db/db");

exports.findUser = async (username) => {
  const session = driver.session();
  try {
    const result = await session.run(
      "MATCH (u:User {username: $username}) RETURN u",
      { username }
    );
    if (result.records.length === 0) {
      return null;
    }
    const user = result.records[0].get("u");
    return user.properties;
  } finally {
    session.close();
  }
};

exports.createUser = async (user) => {
  const session = driver.session();
  try {
    if (!(await exports.findUser(user.username))) {
      console.log("creating new user");
      const result = await session.run(
        "CREATE (u:User {username: $username, name: $name, email: $email}) RETURN u",
        { ...user }
      );
      const userNode = result.records[0].get("u");
      return userNode.properties;
    } else {
      console.log("not creating new user");
      return null;
    }
  } finally {
    session.close();
  }
};
