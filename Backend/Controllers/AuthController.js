const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// Signup controller
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(409).json({
                message: "User already exists, you can login"
            });
        }

        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();

        return res.status(201).json({
            success: true,
            message: "SignUp Successful"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Login controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = "Auth failed: email or password is wrong";

        if (!user) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);

        if (!isPassEqual) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }  // Fixed typo here
        );

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            jwtToken,
            email,
            name: user.name
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Export both functions
module.exports = {
    signup,
    login
};