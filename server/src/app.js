const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser')

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
// const corsOptions = {origin: "http://localhost:4200"}
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.all('*/', (req,res,next) => {
    //Enable Cors Policy
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Method', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Lenght, X-Requested-With');
    next();
})

// Routes
app.use("/api/employees", require("./routes/employee.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/clients", require("./routes/client.routes"));
app.use("/api/clientproducts", require("./routes/clientproduct.routes"));
app.use("/api/tickets", require("./routes/ticket.routes"));

module.exports = app;