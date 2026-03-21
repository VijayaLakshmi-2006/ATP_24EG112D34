// Create Product REST API with below features
// Product document structure
//      a.productId (required)
//      b.productName(required)
//      c.price(required, min price 10000 and max price 50000)
//      d.brand(required)
// REST API with below operations
//      a. Create product
//      b. Read all products
//      c. Read a product by productId
//      d. Update a product by productId
//      e. Delete a product by productId

// Import express module
import exp from "express";

// Import Product model from models folder
import { Product } from "../models/ProductModel.js";

// Create router object for product APIs
export const productAPP = exp.Router();


// CREATE PRODUCT
// POST request to create a new product

productAPP.post("/product", async (req, res, next) => {
  try {

    // Create new product object using request body data
    let newProduct = new Product(req.body);

    // Save product in MongoDB
    let savedProduct = await newProduct.save();

    // Send response to client
    res.json({ message: "Product created", payload: savedProduct });

  } catch (err) {

    // Pass error to error-handling middleware
    next(err);

  }
});


//READ ALL PRODUCTS
// GET request to fetch all products

productAPP.get("/products", async (req, res, next) => {
  try {

    // Find all products in database
    let products = await Product.find();

    // Send all products
    res.json({ message: "All products", payload: products });

  } catch (err) {

    next(err);

  }
});


//  READ PRODUCT BY ID 
// GET request to fetch product using productId

productAPP.get("/product/:productId", async (req, res, next) => {
  try {

    // Get productId from URL parameter
    let pid = req.params.productId;

    // Find product in database
    let product = await Product.findOne({ productId: pid });

    // If product not found
    if (!product) {
      return res.json({ message: "Product not found" });
    }

    // Send product details
    res.json({ message: "Product found", payload: product });

  } catch (err) {

    next(err);

  }
});


//UPDATE PRODUCT
// PUT request to update product using productId

productAPP.put("/product/:productId", async (req, res, next) => {
  try {

    // Get productId from URL
    let pid = req.params.productId;

    // Update product in database
    let updatedProduct = await Product.findOneAndUpdate(
      { productId: pid }, // condition
      req.body,           // new data
      { new: true }       // return updated document
    );

    // Send updated product
    res.json({ message: "Product updated", payload: updatedProduct });

  } catch (err) {

    next(err);

  }
});


// DELETE PRODUCT
// DELETE request to remove product by productId

productAPP.delete("/product/:productId", async (req, res, next) => {
  try {

    // Get productId from URL
    let pid = req.params.productId;

    // Delete product from database
    await Product.findOneAndDelete({ productId: pid });

    // Send response
    res.json({ message: "Product deleted" });

  } catch (err) {

    next(err);

  }
});