const express = require("express");
const cart = express.Router();

const cartItems = [
  {
    id: 1,
    product: "Candle",
    price: 30,
    quantity: 4,
  },
  {
    id: 2,
    product: "Watch",
    price: 25,
    quantity: 2,
  },
  {
    id: 3,
    product: "Light Bulb",
    price: 6,
    quantity: 5,
  },
  {
    id: 4,
    product: "Shampoo",
    price: 20,
    quantity: 3,
  },
  {
    id: 5,
    product: "Water Bottle",
    price: 9,
    quantity: 7,
  },
];

cart.get("/", (req, res) => {
  const maxPrice = parseFloat(req.query.maxPrice);
  let filteredItems = cartItems;
  if (maxPrice) {
    filteredItems = cartItems.filter((items) => {
      return items.price <= maxPrice;
    });
  }
  const prefix = req.query.prefix;
  if (prefix) {
    filteredItems = cartItems.filter((items) => {
      return items.product.startsWith(prefix);
    });
      
  }
  
  let pageSize = parseInt(req.query.pageSize);
    if (pageSize) {
      filteredItems = cartItems.slice(0, pageSize);
    }

  res.status(200);
  res.json(filteredItems);
  
});

cart.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (id) {
        const find = cartItems.find(item => item.id=== id);
        res.status(200);
        res.json(find);
        
    }
    else {
        console.log("hello");
        res.status(404).send("Item not found");
    }
    
    
  });
  cart.post("/",(req,res)=> {
      const addItem = {
          id: cartItems.length + 1,
          product: req.body.product,
          price: parseFloat(req.body.price),
          quantity: parseInt(req.body.quantity),
      }
      cartItems.push(addItem);
      res.status(201);
      res.json(addItem);


  });
  cart.put("/:id", (req, res)=> {
    const id = parseInt(req.params.id);
    const indexId = cartItems.find(item=>item.id===id);
    const newItem = {
        id: id,
        product: req.body.product,
        price: parseFloat(req.body.price),
        quantity: parseInt(req.body.quantity),
    };
    cartItems.splice(indexId,1,newItem);
    res.json(newItem);
    res.status(200);
  })

  cart.delete("/:id", (req, res)=> {
      const id = parseInt(req.params.id);
      const indexId = cartItems.find(item=> item.id===id);
      cartItems.splice(indexId,1);
      res.json(indexId);
      res.status(204);

  });


module.exports = cart;
