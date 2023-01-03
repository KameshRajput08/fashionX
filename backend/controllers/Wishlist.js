import Wishlist from "../models/Wishlist.js";

//CREATE WISHLIST
export const wishlist = async (req, res) => {
  const isExist = await Wishlist.findOne({ userId: req.params.id });
  if (!isExist) {
    const newWishlist = new Wishlist({
      userId: req.params.id,
      Product: [req.body],
      quantity: 1,
    });
    try {
      const savedWishlist = await newWishlist.save();
      res.status(200).json(savedWishlist);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    try {
      const updatedWishlist = await Wishlist.findOneAndUpdate(
        { userId: req.params.id },
        {
          $push: { Product: req.body },
          $inc: { quantity: 1 },
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedWishlist);
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
};

// REMOVE A PRODUCT
export const removeProduct = async (req, res) => {
  try {
    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { userId: req.params.id },
      {
        $pull: { Product: { _id: req.params.pId } },
        $inc: { quantity: -1 },
      },
      {
        new: true,
      }
    );
    console.log(updatedWishlist);
    res.status(200).json(updatedWishlist);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

//DELETE USER Wishlist
export const deleteWishlist = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete({ userId: req.params.id });
    res.status(200).json({ message: "Wishlist successfully deleted" });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

//  GET USER WISHLIST
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

//  GET ALL USERS WISHLIST
export const getAllWishlists = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const carts = await Wishlist.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(400).json(err.message);
    }
  } else {
    res
      .status(405)
      .json({ message: "You are not allowed to access all users's Wishlist." });
  }
};
