const express = require('express');
const productRoute = require('./routes/addproducts');
const cors = require('cors');
const { connectToMongoDB } = require('./connection');
const app = express();
const port = 8000;

// Mongodb Connection Starts
connectToMongoDB("mongodb://localhost:27017/products-admin").then(() =>
    console.log("Mongodb is connected")
);
// Mongodb Connection Ends

// Middleware Start
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware Ends

// Route Start
app.use('/admin', productRoute);
// Route Ends

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:` + port);
});

