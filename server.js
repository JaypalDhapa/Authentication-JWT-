const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
// app.use(cors());
app.use(cookieParser());
app.use(cors({
    origin: "http://127.0.0.1:8000", // frontend URL
    credentials: true
  }));

//connect DB
const connectDB = require('./config/connectDB');
connectDB();


app.get("/",(req,res)=>{
    res.send("HEllo from server");
});

//router 

const router = require('./routers/autheRouter');
app.use("/api",router);

app.listen(process.env.PORT || 3000 ,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});