const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

// Create
router.post("/", verify, async (req, res) => {
    if(req.user.isAdmin) {
        const newMovie = new Movie(req.body);

        try {
            const movie = await newMovie.save();
            return res.status(200).json(movie);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You are not allowed");
    }
});

// Update
router.put("/:id", verify, async (req, res) => {
    if(req.user.isAdmin) {

        try {
            const updateMovie = await Movie.findOneAndUpdate(
                req.params.id,
                {
                    $set: req.body
                },
                {
                    new: true
                }
            );
            return res.status(200).json(updateMovie);
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
            await Movie.findOneAndDelete(req.params.id);
            return res.status(200).json("The movie has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You are not allowed");
    }
});

// Get movie
router.get("/find/:id", verify, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        return res.status(200).json(movie);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Get random
router.get("/random", async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if(type === "series") {
            movie = await Movie.aggregate([
                { $match: {isSeries: true } },
                { $sample: { size: 1} } 
            ]);
        } else {
            movie = await Movie.aggregate([
                { $match: {isSeries: false } },
                { $sample: { size: 1} } 
            ]);
        }

        return res.status(200).json(movie);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// Get all movies
router.get("/", verify, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const movies = await Movie.find();
            return res.status(200).json(movies);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You are not allowed");
    }
});

module.exports = router;