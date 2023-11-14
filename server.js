const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')
const app = express();

const userRouter =require('./userRoute/userRouter')
const PORT = 4000;

app.use(cors())

app.use(express.json());

app.use('/', userRouter);

const server = () => {
    try {
      app.listen(PORT, console.log(`Server running on port ${PORT}`));
    } catch (error) {
      console.log('Server failed to start', error);
    }
  };

server();
