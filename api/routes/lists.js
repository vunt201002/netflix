const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

// Create
router.post("/", verify, async (req, res) => {
    if(req.user.isAdmin) {
        const newList = new List(req.body);

        try {
            const list = await newList.save();
            return res.status(200).json(list);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You are not allowed");
    }
});

// Delete
router.delete("/:id", verify, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id);
            return res.status(200).json("The list has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You are not allowed");
    }
});

// Get list
router.get("/", async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];

    try {
        if(typeQuery) {
            if(genreQuery) {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery, genre: genreQuery } }
                ]);
            } else {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery } }
                ])
            }
        } else {
            list = await List.aggregate([
                { $sample: { size: 10 } }
            ]);
        }

        return res.status(200).json(list);
    } catch (err) {
        return res.json(500).json(err);
    }
});

module.exports = router;