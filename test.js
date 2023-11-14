const express = require('express');
const router = express.Router();

const connection=require('../database/database')


const database = () => {
    try {
      connection.connect();
      console.log('Connected to the database!');
    } catch (error) {
      console.log('Database connection failed:', error);
      process.exit(1); // Terminate the application if the database connection fails
    }
  };
database()

const tableName = 'userresponse';

//create canvo users
router.post('/createusers',()=>{
  
})



// CREATE CANVO history

router.post("/users", (req, res) => {
  const { id, text, createdAt, ai ,value,title} = req.body;
 
  let data = req.body;
  console.log("data",data)
 
  const query = `INSERT INTO ${tableName} (id,text,createdAt,ai,value,title) VALUES (?,?,?,?,?,?)`;
  const values =[id, text, createdAt, ai,value,title]
  
  console.log("--",values)
 
 
  // console.log(obj);

 

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
});





//get api
router.get("/getusers", (req, res) => {
  connection.query(`SELECT * FROM  ${tableName}`, (error, results) => {
    if (error) {
      console.error("Error inserting user:", error);
      return res
        .status(500)
        .json({ error: "Failed to insert user", dbError: error.message });
    }

    console.log("User inserted successfully");
    res
      .status(200)
      .json({
        success: true,
        message: "User inserted successfully",
        results: results,
      });
  });
});
  

 /// UPDATE TEXT CANVO
router.put("/users/:id", (req, res) => {
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
    res
      .status(200)
      .json({
        success: true,
        message: "User updated successfully",
        results,
        values,
      });
  });
});



/// GET SINGLE USER WITH ID
router.get("/users/:id", (req, res) => {
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
});

  module.exports = router






  const crypto = require('crypto');

function generateEmailHash(email) {
  const hash = crypto.createHash('sha256');
  hash.update(email.toLowerCase().trim());
  return hash.digest('hex');
}

const email = 'example@example.com';
const emailHash = generateEmailHash(email);
console.log(emailHash);



router.post("/createChannel", (req, res) => {
    const { channelId, email } = req.body;
   
    let data = req.body;
    console.log("data",data)
   
    const query = `INSERT INTO ${tableName} (channelId, email) VALUES (?,?)`;
    const values =[channelId, email];
    
    console.log("--",values)
   
   
    // console.log(obj);
  
   
  
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
  });