const { Router } = require("express");

const router = Router();

router.use((req, res, next) => {
  req.user ? next() : res.send(401);
});

const groceryList = [
  {
    item: "milk",
    quantity: 2,
  },
  {
    item: "cereal",
    quantity: 3,
  },
];

router.get("", (req, res) => {
  res.send(groceryList);
});

router.get("/:item", (req, res) => {
  console.log(req.cookies);
  const { item } = req.params;
  const groceryItem = groceryList.find((g) => g.item === item);
  res.send(groceryItem);
});

router.post("", (req, res) => {
  console.log(req.body);
  groceryList.push(req.body);
  res.send(201);
});

router.get("/shopping/cart", (req, res) => {
  const { cart } = req.session;
  if (!cart) {
    res.send("You have no cart sessions");
  } else res.send(cart);
});

router.post("/shopping/cart/item", (req, res) => {
  const { item, quantity } = req.body;
  const cartItem = { item, quantity };
  const { cart } = req.session;
  if (cart) {
    req.session.cart.items.push(cartItem);
  } else {
    req.session.cart = {
      items: [cartItem],
    };
  }

  res.send(201);
});

module.exports = router;
