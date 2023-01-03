import Cart from "../models/Cart.js";
import User from "../models/User.js";

//CREATE CART
export const cart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.id });
  if (!cart) {
    const newCart = new Cart({
      userId: req.params.id,
      Product: [req.body.Product],
      quantity: 1,
      total: req.body.total,
    });
    try {
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    try {
      console.log(req.body);
      const updatedCart = await Cart.findOneAndUpdate(
        { userId: req.params.id },
        {
          $push: { Product: req.body?.Product },
          $inc: { quantity: req.body.quantity ? req.body.quantity : 0 },
          $set: { total: req.body.total },
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
};

//REMOVE PRODUCT FROM CART
export const removeProduct = async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.params.id },
      {
        $pull: { Product: { _id: req.body.productId } },
        $inc: { quantity: -1 },
        $set: { total: req.body.total },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const updatedCart = await Cart.updateOne(
      {
        userId: req.params.id,
        Product: { $elemMatch: { _id: req.body.pId } },
      },
      { $set: { "Product.$.quantity": req.body.quantity } }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//DELETE USER CART
export const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Cart successfully deleted" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//  GET PRODUCT
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//  GET ALL USERS CART
export const getAllCarts = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res
      .status(405)
      .json({ message: "You are not allowed to access all users's cart." });
  }
};
