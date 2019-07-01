const express = require("express");
const bodyParser = require("body-parser");

// model import
var Book = require("./models").Book;

// --------------- Configure Express ---------------
const app = express();

// pug templates
app.set("view engine", "pug");

// use body parser requests
app.use(bodyParser.urlencoded({ extended: false }));

// static files url
app.use("/static", express.static("public"));

// ------------------ ROUTES ---------------------------

// redirect on root
app.get("/", (req, res) => {
  res.redirect("/books");
});

// all books
app.get("/books", (req, res) => {
  Book.findAll().then(books => {
    res.render("books", { books: books });
  });
});

// create new book
app.get("/create", (req, res) => {
  res.render("create", {
    book: Book.build()
    // TODO: dynamic title to all
  });
});

/* POST create article. */
app.post("/", (req, res, next) => {
  Book.create(req.body).then(book => {
    res.redirect("/detail/" + book.id);
  });
});

// detail book
app.get("/detail/:id", (req, res, next) => {
  Book.findByPk(req.params.id).then(book => {
    res.render("detail", { book: book });
  });
});

// update book
app.post("/detail/:id/update", (req, res, next) => {
  Book.findByPk(req.params.id)
    .then(book => {
      return book.update(req.body);
    })
    .then(book => {
      res.redirect("/detail/" + book.id);
    });
});

// delete book
app.post("/detail/:id/delete", (req, res, next) => {
  Book.findByPk(req.params.id)
    .then(book => {
      return book.destroy();
    })
    .then(() => {
      res.redirect("/books");
    });
});

// ------------------------ Server ---------------------------
app.listen(3000, () => {
  console.log("|-------------- APP IS RUNNING ON 3000 -------------|");
});
