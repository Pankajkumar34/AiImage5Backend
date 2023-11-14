const connection = require("../database/database");
var tableName = "user_item";

exports.pagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const pageSize = parseInt(req.query.limit) || 10; // Number of items per page
  const checkUserLikesQuery = `SELECT * FROM ${tableName}`;

  try {
    connection.query(checkUserLikesQuery, (err, allUserData) => {
      if (err) {
        console.error("Error during SELECT operation:", err);
        return res.status(500).json({
          error: "Failed to check user in tableName2",
          dbError: err.message,
        });
      }

      let totalLength = allUserData?.length // total length of table

      // Calculate the starting and ending indices for the current page
      let startIndex = (page - 1) * pageSize;

      let endIndex = startIndex + pageSize;

      let currentPageData = allUserData?.slice(startIndex, endIndex);
      if (currentPageData) {
        res.status(201).json({ status: true, totalLength: totalLength, currentPageData: currentPageData })
      } else {
        res.status(404).json({ status: false, message: "data not found" })
      }




    })
  } catch (error) {
    console.error("Error executing the query:", err);
    res.status(500).json({ error: "An error occurred" });
  }
 
};
