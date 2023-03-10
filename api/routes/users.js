const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

// Update
router.put("/:id", verify, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
        if(req.body.password) {
            var hashPassword = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
            req.body.password = hashPassword;
        }

        try {
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                }, 
                { 
                    new: true
                }
            );

            res.status(200).json(updateUser);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can update only your account");
    }
});

// Delete
router.delete("/:id", verify, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);

            res.status(200).json("User has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your account");
    }
});

// Get
router.get("/find/:id", verify, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        const { password, ...info } = user._doc;

        res.status(200).json(info);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Get all
router.get("/", verify, async (req, res) => {
    const query = req.query.new;
    if(req.user.isAdmin) {
        try {
            const users = query ? await User.find().limit(10) : await User.find();

            res.status(200).json(users);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You are not allowed to see all user");
    }
});

// Get user stats
router.get("/stats", async (req, res) => {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);

    const monthsArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    try {
        const data = await User.aggregate([
            {
                $project: {
                month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                _id: "$month",
                total: { $sum: 1 },
                },
            },
        ]);
        return res.status(200).json(data)
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;