const express = require("express");
const cart = require('./cart');
const app = express();
app.use(express.json());
const port = 3000;
app.use("/cart", cart);
app.listen(port, () => console.log(`Listening on port: ${port}.`));
console.log("http://localhost:" + port + "/cart");