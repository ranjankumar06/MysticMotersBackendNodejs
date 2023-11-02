// const express = require("express");
// var bodyParser = require("body-parser");
// const playerRouter = require('./router/playerRouter')
// const serve = require('express-static');
// const path = require("path")
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config(`${process.env.ACCESS_TOKEN_SECRET}`);

// // require('dotenv').config()
// const app = express();
// require("./config/configdb");

// app.use(cors());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use("/public", express.static("public"))




// app.use("/player", playerRouter);

// app.get("/", (req, res) => {
//     res.send("Welcome");
// });

// app.use('/file/path', serve(path.join(__dirname, '../uploads')))


// app.listen(3024, (err) => {
//     if (err) console.log(err);
//     else console.log("server running on 3024");
// });




const express = require("express");
var bodyParser = require("body-parser");
const playerRouter = require('./router/playerRouter')
const serve = require('express-static');
const path = require("path")
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config(`${process.env.ACCESS_TOKEN_SECRET}`);
const exphbs  = require('express-handlebars').engine;
// require('dotenv').config()
const app = express();
require("./config/configdb");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static("public"))

//instead of app.engine('handlebars', handlebars({
// app.engine('handlebars', exphbs({
// // layoutsDir: __dirname + '/views',
// //new configuration parameter
// extname: 'handlebars'
// }));
app.set('view engine', 'hbs');

// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('views', __dirname + '/views')
app.use("/player", playerRouter);

app.get("/", (req, res) => {
    res.send("Welcome");
});

app.use('/file/path', serve(path.join(__dirname, '../uploads')))


app.listen(3024, (err) => {
    if (err) console.log(err);
    else console.log("server running on 3024");
});
