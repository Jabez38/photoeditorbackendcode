const express = require("express");
const router = express.Router();
const Image = require("../model/Birthday");
const multer = require("multer");
const path = require("path");


/**
 * @method - POST
 * @description - Get LoggedIn User
 * @param - /user/me
 */

// https://www.youtube.com/watch?v=c-NikCpec7U

// https://www.youtube.com/watch?v=JrCC66R_EhQ

const storage = multer.diskStorage({

    filename: (req, file, cb) => {
        cb(null, Date.now() + path?.extname(file?.originalname)); // Rename the file with timestamp and original extension
    }
});

const upload = multer({ storage: storage });

router.post("/birthday", upload.single("image"), async (req, res) => {
    try {
        const { title, shortdescription, longdescription } = req.body;

        const { filename, path } = req.file;

        const newImage = new Image({
            title,
            shortdescription,
            longdescription,
            filename,
            path
        });

        await newImage.save();

        res.status(201).json({ message: "Image uploaded successfully" });
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
