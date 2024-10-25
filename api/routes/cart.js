const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();

//CREATE AND UPDATE
router.post("/", verifyToken, async (req, res) => {
  try {
    const { userId, products } = req.body;
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // If cart exists, update it
      cart.products = products;
    } else {
      // If cart doesn't exist, create a new one
      cart = new Cart({ userId, products });
    }

    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching cart", error: err.message });
  }
});

//DELETE
router.delete("/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.userId });
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL CARTS (OF ALL USERS)
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
