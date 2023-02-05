const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
    try {
        var hashPassword = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        });
    
        const user = await newUser.save();
        return res.status(200).json(user);

    } catch (err) {
        return res.status(500).json(err);
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        
        if(!user) {
            res.status(401).json("Wrong username or password");
        }

        var bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        var originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        if(originalPassword !== req.body.password) {
            return ers.status(401).json("Wrong username or password");
        }

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.idAdmin
        }, process.env.SECRET_KEY, { expiresIn: "365d"});

        const { password, ...info } = user._doc;

        return res.status(200).json({ ...info, accessToken });

    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;