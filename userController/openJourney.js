const connection = require("../database/database");
var tableName = "user_item";
const tableName2 = "like_data"; // Update with your actual table name


exports.saveImages = (req, res) => {
  const { id,ai,createdAt,selected,link_to_image, creator, keywords,Likes} = req.body;
  const checkUserLikesQuery = `SELECT * FROM ${tableName2}`;
        const checkUserLikes= [];

        connection.query(checkUserLikesQuery, checkUserLikes, (checkUserExistsError, checkUserExistsResults) => {
          console.log(checkUserExistsResults,"oo")
          if (checkUserExistsError) {
            console.error("Error during SELECT operation:", checkUserExistsError);
            return res.status(500).json({
                error: "Failed to check user in tableName2",
                dbError: checkUserExistsError.message,
            });
        }
        })

  const query = `INSERT INTO ${tableName} (id,ai,createdAt,selected,link_to_image,creator,keywords,Likes) VALUES (?,?,?,?,?,?,?,?)`;

  const values = [id,ai,createdAt,selected,link_to_image, creator, keywords,Likes];

  if (!(link_to_image && creator && keywords)) {
    res.status(400).json({ success: false, msg: "all field require" });
  } //reject promise with error
  else {
    connection.query(query, values, (error, results) => {
      console.log(results,"ooo")
      if (error) {
        console.error("Error during inserting  Image:", error);
        return res
          .status(500)
          .json({ error: "Failed to insert Image", dbError: error.message });
      }

      res
        .status(200)
        .json({
          success: true,
          message: "Image Saved...",
          id: results.insertId,
        });
    });

    
  }
};


exports.getImage = (req, res) => {
  const { id } = req.params;

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error fetching user:", error);
      return res
        .status(500)
        .json({ error: "Failed to fetch user", dbError: error.message });
    }

    if (results.length === 0) {
      return res.status(404).json([]);
    }

    console.log("Images fetched successfully");
    res.status(200).json([results[0]]);
  });
};

exports.getImages = (req, res) => {

  const query = `SELECT * FROM ${tableName}`;
  const values = [];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error fetching user:", error);
      return res
        .status(500)
        .json({ error: "Failed to fetch user", dbError: error.message });
    }

    if (results.length === 0) {
      return res.status(404).json([]);
    }

    console.log("Images fetched successfully");
    res.status(200).json(results);
  });
};


exports.IncludesWords = (req, res) => {
  const { keywords} = req.params;

 const query = `SELECT * FROM ${tableName} WHERE keywords Like ?`;
 
  const values = [`%${keywords}%`];

try{
  
  connection.query(query,values, (error, results) => {
    if (error) {
      console.error("Error fetching user:", error);
      return res
        .status(500)
        .json({ error: "Failed to fetch user", dbError: error.message });
    }

    if (results.length === 0) {
      return res.status(200).json([]);
    }

    console.log("Images fetched successfully");
    res.status(200).json(results);
  });
}catch{
  res.status(500).json({status:false, error:"keywords require"})
}
};


exports.ExcludeWords = (req, res) => {
  const { keywords} = req.params;



 const query = `SELECT * FROM ${tableName} WHERE keywords NOT Like ?`;
  const values = [`%${keywords}%`];
 

  connection.query(query,values, (error, results) => {
    if (error) {
      console.error("Error fetching Image:", error);
      return res
        .status(500)
        .json({ error: "Failed to fetch Images", dbError: error.message });
    }

    if (results.length === 0) {
      return res.status(404).json([]);
    }

    console.log("Images fetched successfully");
    res.status(200).json(results);
  });
};