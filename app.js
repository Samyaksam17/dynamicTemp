let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let expressValidator = require("express-validator");
let session = require("express-session");
let mongoose = require("mongoose");
let config = require("./config/db");
require("dotenv").config;

// connect to database
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// on connection
mongoose.connection.on("connected", () => {
  console.log("connected to database " + config.database);
});

// on error
mongoose.connection.on("error", (err) => {
  console.log("database connection error " + err);
});

// initialize express
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Express Session
app.use(
  session({
    secret: config.database,
    saveUninitialized: true,
    resave: true,
  })
);

// Express Validator
app.use(
  expressValidator({
    errorFormatter: function (param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value,
      };
    },  
  })
);

// import routes
let teacher = require("./routes/teacher");
let admin = require("./routes/admin");

// entry points
app.use("/teacher", teacher);
app.use("/admin", admin)

// Set Port
app.set("port", 3000);

app.listen(app.get("port"), () => {
  console.log("Server started on port " + app.get("port"));
});





