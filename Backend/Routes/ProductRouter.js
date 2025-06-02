const ensureAuthenticated = require("../Middlewares/Auth");
// const { ensureIndexes } = require("../Models/User");

const router = require("express").Router();

router.get("/" , ensureAuthenticated, (req,res) => {
    
    console.log("logged user is : ", req.user);

    res.status(200).json([
        {
            name:"mobile",
            price:10000
        },
        {
            name:"tv",
            price:20000
        },
    ])
})

module.exports = router;