const express = require("express");

const app = express();
const PORT = 5000;

const multer = require("multer");
const upload = multer({ dest: "uploads" });

app.post("/upload", upload.single("imgTest"), (req, res) => {
  console.log(req.file);
  res.json(req.file);
});

app.listen(PORT, () => {
  console.log("express server listening on PORT: " + PORT);
});
