import { Schema, model } from "mongoose";

const productSchema = new Schema({
  productId: {
    type: Number,
    required: true,
    unique: true
  },
  productName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 10000,
    max: 50000
  },
  brand: {
    type: String,
    required: true
  }
});

export const Product = model("product", productSchema);