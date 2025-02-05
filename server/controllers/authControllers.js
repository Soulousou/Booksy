const User = require("../models/User");
const { hashPassword, comparePassword} = require("../helpers/auth");
const jwt = require("jsonwebtoken")

const test =  (req, res) => {
    // Code for login
    res.json("test is working")
}

//Register endpoint
const registerUser = async (req, res) => {
    // Code for register
    try {
        const {username, password} = req.body;
        if(!username){
            return res.json({error: "Username is required"})
        };
        if(!password || password.length < 6){
            return res.json({error: "Password is required"})
        };
        const exist = await User.findOne({username});
        if(exist){
            return res.json({error: "Username already exists"})
        };

        const hashedPassword = await hashPassword(password)
        const newUser = await User.create({
            username,
            password: hashedPassword
        })

        return res.json({message: "User created successfully "})
        }  catch (error) {
        console.log(error)
        }

    }

//Login endpoint
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ error: "No user found" });
        }

        // Check if password matches
        const match = await comparePassword(password, user.password);
        if (match) {
            jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET, {}, (error, token) => {
                if (error) throw error;
                // Return only the necessary user info
                res.cookie("token", token).json({
                    username: user.username,
                    id: user._id,
                });
            });
        } else {
            return res.json({ error: "Wrong password" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred during login" });
    }
};

//Logout endpoint
const logoutUser = (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie("token").json({ message: "Logged out successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred during logout" });
    }
};

const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (error, decoded) => {
            if (error) throw error;
            const user = await User.findById(decoded.id);
            if (user) {
                res.json({
                    username: user.username,
                    id: user._id,
                });
            } else {
                res.json(null);
            }
        });
    } else {
        res.json(null);
    }
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser
}
