const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('passport');
const expressValidation = require('express-validation');

const { passportConfig } = require('./config/passport');
const authRoutes = require('./routes/authRoutes');
const CreateCRUDController = require("./controllers/crudController");
const response = require("./utils/construct-response");
const authenticateToken = require("./middleware/authenticateToken");

const ItemModel = require("./models/Item");
const UserModel = require("./models/User");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

const itemController = new CreateCRUDController(ItemModel);
const userController = new CreateCRUDController(UserModel);

app.use('/auth', authRoutes);


app.use("/api/items", authenticateToken, itemController);
app.use("/api/users",  userController);



app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const joiError = err.details.body ? err.details.body : err.details.params;
    const unifiedErrorMessage = joiError
      .map((error) => error.message)
      .join(" and ");
    response.error(res, 422, "Validation Error", unifiedErrorMessage);
  } else if (err) {
    if (err.name === "MulterError") {
      response.error(res, 400, "File Upload Error", err.message);
    } else {
      response.error(res, 400, "Bad Request", err.message);
      console.log(err.message);
    }
  } else {
    next();
  }
});

// app.use("/", (req, res) => {
//   res.json({ hello: "World" });
// });
// catch 404 and forward to error handler
app.use("*", (req, res) => {
  response.error(
    res,
    404,
    "API not found",
    "API you tried to access does not exist with us. Retry to another route"
  );
});



module.exports = app;