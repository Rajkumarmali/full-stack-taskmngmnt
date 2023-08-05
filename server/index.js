const express = require("express");
const app = express();
const cors  = require("cors");

const mongoose = require('mongoose');
const URL = 'mongodb+srv://rajkumar:rajkumar@cluster0.owfckcm.mongodb.net/?retryWrites=true&w=majority'

async function connect(){
    try{
        await mongoose.connect(URL)
        console.log('connect with mongo')
    }
    catch(error){
        console.log(`Error->${error}`)
    }
}

connect();



app.use(express.json()); 
app.use(cors());
    
const db = require("./models");

// Routers
const postRouter = require("./routes/Posts");

app.use("/posts", postRouter);

const commentRouter = require("./routes/Comments");
app.use("/comments", commentRouter);
 
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter); 



const likesRouter = require("./routes/Likes"); 
app.use("/likes", likesRouter);


app.listen(3001,()=>{
  console.log("Server is running 3001");
})

