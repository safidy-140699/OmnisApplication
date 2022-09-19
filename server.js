const express = require("express");
require('dotenv').config();
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
global.__basedir = __dirname;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/images', express.static('./images'));
app.use(
  cookieSession({
    name: "OMNIS-session",
    secret: "COOKIE_SECRET", 
    httpOnly: true
  })
);
const db = require("./app/models");
const Role = db.role;
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const PORT = process.env.PORT || 8081;
const date=Date.now();
app.listen(PORT, () => {
  console.log(`Server is running on port ${date}.`);
});
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/message.routes')(app);
