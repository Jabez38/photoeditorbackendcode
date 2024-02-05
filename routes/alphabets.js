const express = require("express");
const router = express.Router();
const Image = require("../model/alphabets");
const multer = require("multer");
const path = require("path");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;


/**
 * @method - POST
 * @description - Get LoggedIn User
 * @param - /user/me
 */


const storage = multer.diskStorage({

    filename: (req, file, cb) => {
        cb(null, Date.now() + path?.extname(file?.originalname));
    }

});


const upload = multer({ storage: storage });

router.post("/alphabets", upload.single("image"), async (req, res) => {

    try {

        const { title, idname } = req.body;


        const { filename, path } = req.file;

        // const ids = localStorage.getItem("userid");

        const shareCount = 0;
        const likeCount = 0;

        // Create a new Image instance with shareCount and likeCount

        const newImage = new Image({
            title,
            idname,
            filename,
            path,
            shareCount,
            likeCount
        });

        await newImage.save();

        // Retrieve the saved image data from the database
        const retrievedImage = await Image.findById(newImage._id);

        // Send the retrieved image data in the response
        res.status(201).json({ message: "Image uploaded successfully", image: retrievedImage });
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});


// Assuming you have a route like "/like/:imageId"
router.post("/like/:imageId", async (req, res) => {
    try {
        const imageId = req.params.imageId;

        // Find the image in the database by ID
        const image = await Image.findById(imageId);

        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }

        // Increment the like count
        image.likeCount += 1;

        // Save the updated image
        await image.save();

        // Send the updated image data in the response
        res.status(200).json({ message: "Like count updated successfully", image });

    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});








module.exports = router;