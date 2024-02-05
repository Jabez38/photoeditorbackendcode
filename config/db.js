const mongoose = require("mongoose");

const MONGOURI = "mongodb+srv://photoeditor:Jabez38@cluster0.ysyjcwe.mongodb.net/user-details?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {

  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB !!");
  }

  catch (e) {
    console.log(e); ''
    throw e;
  }

};

module.exports = InitiateMongoServer;

