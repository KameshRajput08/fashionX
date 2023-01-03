import User from "../models/User.js";
import Product from "../models/Product.js";

//CREATE PRODUCT
export const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

//DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product successfully deleted" });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

//  GET PRODUCT
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

//  GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  const newQuery = req.query.new;
  const categoryQuery = req.query.category;
  let products 
  try {
    if (newQuery) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    }
    else if(categoryQuery){
        products = await Product.find({
            categories:{
                $in: [categoryQuery]
            }
        })
    }else{
      products = await Product.find();
    }
   
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
 