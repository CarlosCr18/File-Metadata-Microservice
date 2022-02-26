var express = require("express");
var cors = require("cors");
require("dotenv").config();
let multer = require("multer");

const upload = multer({ dest: "uploads/" });
var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post(
  "/api/fileanalyse",
  upload.single("upfile"),
  function (req, res, next) {
    // req.file is the `avatar` file
    console.log(req.file, req.body);
    next();
    // req.body will hold the text fields, if there were any
  },
  (req, res) => {
    res.send({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });
  }
);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
