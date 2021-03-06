const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

// model import
var Book = require("./models").Book;

// --------------- Configure Express ---------------
const app = express();

// method-override for PUT and DELETE verbs
app.use(methodOverride("_method"));

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
  Book.findAll()
    .then(books => {
      res.render("books", { books: books });
    })
    .catch(err => {
      res.send(500);
    });
});

// New book
app.get("/new", (req, res) => {
  res.render("new-book", {
    book: Book.build()
  });
});

// post create new book
app.post("/new", (req, res, next) => {
  Book.create(req.body)
    .then(() => {
      res.redirect("/books");
    })
    .catch(err => {
      if (err.name === "SequelizeValidationError") {
        res.render("new-book", {
          book: Book.build(req.body),
          errors: err.errors
        });
      } else {
        throw err;
      }
    })
    .catch(err => {
      res.send(500);
    });
});

// detail book
app.get("/books/:id", (req, res, next) => {
  Book.findByPk(req.params.id)
    .then(book => {
      if (book) {
        res.render("detail", { book: book });
      } else {
        next();
      }
    })
    .catch(err => {
      res.send(500);
    });
});

// update book
app.put("/books/:id", (req, res, next) => {
  Book.findByPk(req.params.id)
    .then(book => {
      if (book) {
        return book.update(req.body);
      } else {
        res.send(404);
      }
    })
    .then(() => {
      res.redirect("/books");
    })
    .catch(err => {
      if (err.name === "SequelizeValidationError") {
        const book = Book.build(req.body);
        book.id = req.params.id;
        res.render("detail", {
          book: book,
          errors: err.errors
        });
      } else {
        throw err;
      }
    })
    .catch(err => {
      res.send(500);
    });
});

// delete book
app.delete("/books/:id/delete", (req, res, next) => {
  Book.findByPk(req.params.id)
    .then(book => {
      if (book) {
        return book.destroy();
      } else {
        res.send(404);
      }
    })
    .then(() => {
      res.redirect("/books");
    })
    .catch(err => {
      res.send(500);
    });
});

// --------------- ERROR HANDLING --------------------
// page not found
app.use((req, res, next) => {
  const err = new Error("Oh Crap!!");
  err.status = 404;
  next(err);
  res.render("page-not-found");
});

// ------------------------ Server ---------------------------
app.listen(3000, () => {
  console.log("|-------------- APP IS RUNNING ON 3000 -------------|");
});
