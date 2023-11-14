[{user_id:selectResults[0].id}, {image_link:selectResults[0].link_to_image}, is_liked,{creator:selectResults[0].creator},{keyword:selectResults[0].keyword}];



const connection = require("../database/database");
const tableName1 = "user_images"; // Update with your actual table name
const tableName2 = "like_image"; // Update with your actual table name

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

exports.userLiked = (req, res) => {
  const { id } = req.params;
  const { is_liked } = req.body;

  // First, retrieve the user's data from tableName1
  const selectQuery = `SELECT * FROM ${tableName1} WHERE id = ?`;
  const selectValues = [id];

  connection.query(selectQuery, selectValues, (selectError, selectResults) => {
    if (selectError) {
      console.error("Error during SELECT operation:", selectError);
      return res.status(500).json({
        error: "Failed to select user data",
        dbError: selectError.message,
      });
    }

    if (selectResults.length === 0) {
      return res.status(404).json({ success: false, msg: "User data not found" });
    }

    const userData = selectResults[0];
    // Insert the retrieved user data into the like_image schema
    const insertQuery = `INSERT INTO ${tableName2} (user_id, image_link, is_liked, creator, keyword) VALUES (?, ?, ?, ?, ?)`;
    const insertValues = [userData.id, userData.link_to_image, is_liked, userData.creator, userData.keyword];

    connection.query(insertQuery, insertValues, (insertError, insertResults) => {
      if (insertError) {
        console.error("Error during inserting like:", insertError);
        return res.status(500).json({
          error: "Failed to insert like",
          dbError: insertError.message,
        });
      }

      res.status(200).json({
        success: true,
        message: "Image liked and saved...",
        id: insertResults.insertId,
      });
    });
  });
};



hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
const connection = require("../database/database");
const tableName1 = "user_images"; // Update with your actual table name
const tableName2 = "like_image"; // Update with your actual table name

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

exports.userLiked = (req, res) => {
  const { id } = req.params;

  // Check if the user has already liked the item
  const checkLikeQuery = `SELECT * FROM ${tableName1} WHERE id = ?`;
  const checkLikeValues = [id];

  connection.query(checkLikeQuery, checkLikeValues, (checkLikeError, checkLikeResults) => {
    console.log(checkLikeResults,"ppp")
    if (checkLikeError) {
      console.error("Error during SELECT operation:", checkLikeError);
      return res.status(500).json({
        error: "Failed to check like",
        dbError: checkLikeError.message,
      });
    }

    if (checkLikeResults.length > 0) {
      // If the user has already liked the item, toggle the like (set is_liked to false)
      const updateQuery = `UPDATE ${tableName2} SET is_liked = ? WHERE user_id = ?`;
      const updateValues = [false,id];

      connection.query(updateQuery, updateValues, (updateError, updateResults) => {
        if (updateError) {
          console.error("Error during updating like:", updateError);
          return res.status(500).json({
            error: "Failed to unlike",
            dbError: updateError.message,
          });
        }

        res.status(200).json({ success: true, message: "Unliked the image" });
      });
    } else {
        let userData=checkLikeResults[0]
      // If the user hasn't liked the item yet, add the like (set is_liked to true)
      const insertQuery = `INSERT INTO ${tableName2} (user_id, image_id, is_liked) VALUES (?, ?, ?)`;
      const insertValues = [userData.id, userData.link_to_image, is_liked, userData.creator, userData.keyword];

      connection.query(insertQuery, insertValues, (insertError, insertResults) => {
        if (insertError) {
          console.error("Error during inserting like:", insertError);
          return res.status(500).json({
            error: "Failed to like",
            dbError: insertError.message,
          });
        }

        res.status(200).json({ success: true, message: "Liked the image" });
      });
    }
  });
};
