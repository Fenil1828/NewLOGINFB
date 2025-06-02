const express = require("express");
const app = express();
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter')
const ProductRouter = require('./Routes/ProductRouter')


require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

//body parseer
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());


//listioning
app.listen(PORT , ()=> {
    console.log(`Server is running at ${PORT}`);
})

//routers
app.use("/auth" , AuthRouter );
app.use("/products" , ProductRouter);

//checking server is starting or not
app.get("/" , (req,res) => {
    res.send(`<h1>Hello krupa darling...</h1>`)
})