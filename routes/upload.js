const express = require("express");
const router = express.Router();
const Image = require("../model/uploads");
const multer = require("multer");
const path = require("path");

/**
 * @method - POST
 * @description - Get LoggedIn User
 * @param - /user/me
 */


const storage = multer.diskStorage({

  filename: (req, file, cb) => {
    cb(null, Date.now() + path?.extname(file?.originalname)); // Rename the file with timestamp and original extension
  }
});


const upload = multer({ storage: storage });


router.post("/image", upload.single("image"), async (req, res) => {

  try {

    const { description } = req.body;
    const { filename, path } = req.file;

    const newImage = new Image({
      description,
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
