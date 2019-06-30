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

// TODO: add redirect
app.get("/", (req, res) => {
  res.render("layout");
});

// all books
app.get("/books", (req, res) => {
  res.render("books");
});

// book detail/update
app.get("/detail", (req, res) => {
  res.render("detail");
});

// create new book
app.get("/create", (req, res) => {
  res.render("create");
});

// ------------------------ Server ---------------------------
app.listen(3000, () => {
  console.log("|-------------- APP IS RUNNING ON 3000 -------------|");
});
