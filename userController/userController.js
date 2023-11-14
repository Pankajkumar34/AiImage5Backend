const connection = require("../database/database");
const crypto = require("crypto");
var tableName = "users_data";

const database = () => {
  try {
    connection.connect();
    console.log("Connected to the database!");
  } catch (error) {
    console.log("Database connection failed:", error);
    process.exit(1); // Terminate the application if the database connection fails
  }
};
database();

//usercanvo emailhash

exports.useremailhash = (req, res) => {
  const email = "example@example.com";
  const hash = crypto.createHash("sha256");
  hash.update(email.toLowerCase().trim());
  console.log("hash", hash.digest("hex"));
  // return hash.digest('hex');
};

exports.convohistory = (req, res) => {
  const { id, text, createdAt, ai, value, title,selected } = req.body;

  // let data = req.body;

  const query = `INSERT INTO ${tableName} (id,text,createdAt,ai,value,title,selected) VALUES (?,?,?,?,?,?,?)`;
  const values = [id, text, createdAt, ai, value, title,selected];

  if (!(id && text && createdAt && ai && value && title)) {
    res.status(400).json({ success: false, msg: "Something error" });
  } else {
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error("Error inserting user:", error);
        return res
          .status(500)
          .json({ error: "Failed to insert user", dbError: error.message });
      }

      console.log("User inserted successfully");
      res
        .status(200)
        .json({ success: true, message: "User inserted successfully" });
    });
  }
};

exports.getConvohistory = (req, res) => {
  connection.query(
    `SELECT * FROM  ${tableName} WHERE id=1687235347410`,
    (error, results) => {
      if (error) {
        console.error("Error inserting user:", error);
        return res
          .status(500)
          .json({ error: "Failed to insert user", dbError: error.message });
      }

      console.log("User inserted successfully");
      res.status(200).json({
        success: true,
        message: "User inserted successfully",
        results: results,
      });
    }
  );
};

exports.updateConvo = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const query = `UPDATE ${tableName} SET title=?   WHERE id=${id}`;
  const values = [title, id];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error updating user:", error);
      return res
        .status(500)
        .json({ error: "Failed to update user", dbError: error.message });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User updated successfully");
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      results,
      values,
    });
  });
};

exports.getcanvoid = (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM ${tableName} WHERE id = ${id}`;
  const values = [id];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error fetching user:", error);
      return res
        .status(500)
        .json({ error: "Failed to fetch user", dbError: error.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User fetched successfully");
    res.status(200).json({ success: true, user: results[0] });
  });
};

exports.createChannel = (req, res) => {
  const { channelId, email } = req.body;

  const query = `INSERT INTO ${tableName} (channelId, email) VALUES (?,?)`;
  const values = [channelId, email];
  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error inserting user:", error);
      return res
        .status(500)
        .json({ error: "Failed to insert user", dbError: error.message });
    }

    console.log("Channel Created successfully");
    res
      .status(200)
      .json({ success: true, message: "User inserted successfully" });
  });

  let data = req.body;
  console.log("data", data);

  console.log("--", values);
};
