const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const upload = require("./routes/upload");
const cors = require("cors");
const InitiateMongoServer = require("./config/db");


InitiateMongoServer();

const app = express();

const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.json());

app.get("/", (_req, res) => {
  res.json({ message: "API Working" });
});

// APIs
app.use("/user", user);
app.use("/file", upload);


app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
