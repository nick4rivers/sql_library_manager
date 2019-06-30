const express = require("express");
const bodyParser = require("body-parser");

// --------------- Configure Express ---------------
const app = express();

// pug templates
app.set("view engine", "pug");

// use body parser requests
app.use(bodyParser.urlencoded({ extended: false }));

// static files url
app.use("/static", express.static("public"));

// ------------------ ROUTES ---------------------------

app.get("/", (req, res) => {
  res.render("layout");
});

app.get("/detail", (req, res) => {
  res.render("detail");
});

// ------------------------ Server ---------------------------
app.listen(3000, () => {
  console.log("|-------------- APP IS RUNNING ON 3000 -------------|");
});
