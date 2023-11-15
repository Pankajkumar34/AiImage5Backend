// const connection = require("../database/database");
// var tableName = "user_item";
// const tableName2 = "like_data";
// exports.pagination = async (req, res) => {
//   const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
//   const pageSize = parseInt(req.query.limit) || 10; // Number of items per page
//   const userid=req.query.userId
//   const checkUserLikesQuery = `SELECT * FROM ${tableName}`;

//   try {
//     connection.query(checkUserLikesQuery, (err, allUserData) => {
//       if (err) {
//         console.error("Error during SELECT operation:", err);
//         return res.status(500).json({
//           error: "Failed to check user in tableName2",
//           dbError: err.message,
//         });
//       }
//       const checkUserQuery = `SELECT * FROM ${tableName2} WHERE Like_user=?`;
//       const checkvalue = [userid];
//       connection.query(checkUserQuery,checkvalue,(err, allUserData1) =>{
    
//         if (err) {
//           console.error("Error during SELECT operation:", err);
//           return res.status(500).json({
//             error: "Failed to check user in tableName2",
//             dbError: err.message,
//           });
//         }

//         allUserData1?.forEach((ele)=>{
//           console.log(ele,"ele")
//         })
//       })

//       let totalLength = allUserData?.length // total length of table

//       // Calculate the starting and ending indices for the current page
//       let startIndex = (page - 1) * pageSize;

//       let endIndex = startIndex + pageSize;

//       let currentPageData = allUserData?.slice(startIndex, endIndex);
//       if (currentPageData) {
//         res.status(201).json({ status: true, totalLength: totalLength, currentPageData: currentPageData })
//       } else {
//         res.status(404).json({ status: false, message: "data not found" })
//       }




//     })
//   } catch (error) {
//     console.error("Error executing the query:", err);
//     res.status(500).json({ error: "An error occurred" });
//   }
 
// };
const connection = require("../database/database");
const tableName = "user_item";
const tableName2 = "like_data";

exports.pagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 10;
  const userId = req.query.userId;

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

      const checkUserQuery = `SELECT * FROM ${tableName2} WHERE like_user=?`;
      const checkValue = [userId];

      connection.query(checkUserQuery, checkValue, (err, likedUserData) => {
        if (err) {
          console.error("Error during SELECT operation:", err);
          return res.status(500).json({
            error: "Failed to check user in tableName2",
            dbError: err.message,
          });
        }

        const likedUserIds = likedUserData.map((like) => like.user_id);

        const usersWithLikes = allUserData.map((user) => ({
          ...user,
          is_Liked: likedUserIds.includes(user.id),
        }));

        let totalLength = usersWithLikes.length;
        let startIndex = (page - 1) * pageSize;
        let endIndex = startIndex + pageSize;
        let currentPageData = usersWithLikes.slice(startIndex, endIndex);

        if (currentPageData) {
          res.status(201).json({
            status: true,
            totalLength: totalLength,
            currentPageData: currentPageData,
          });
        } else {
          res.status(404).json({ status: false, message: "Data not found" });
        }
      });
    });
  } catch (error) {
    console.error("Error executing the query:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
