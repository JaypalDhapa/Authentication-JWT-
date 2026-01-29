const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
// app.use(cors());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:8001", // frontend URL
    credentials: true
  }));
app.use(express.static("public"));

//connect DB
const connectDB = require('./config/connectDB');
connectDB();


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/index.html"));
});

//router 

const authRoutes = require('./routers/autheRoutes');
const pageRoutes = require('./routers/pageRoutes');
app.use("/api",authRoutes);
app.use("/",pageRoutes);

app.listen(process.env.PORT || 3000 ,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});