const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

const path = require("path");
dotenv.config();

const connectDB = require("./server/database/connection");

const app = express();

const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan("tiny"));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

// body parse application/json
app.use(bodyparser.json());

// express session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// express messages middleware
app.use(require("connect-flash")());
app.use((request, response, next) => {
  response.locals.messages = require("express-messages")(request, response);
  next();
});

// passport config
require("./server/config/passport")(passport);

app.get("*", (request, response, next) => {
  response.locals.user = request.user || null;
  next();
});

// set view engine
app.set("view engine", "ejs");
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// load routers
app.use("/", require("./server/routes/router"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/auth/login`);
});
