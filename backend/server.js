import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

app.use(express.json());//allow accept json data frm req body

app.post('/api/products', async (req, res) => {
  const product = req.body; // user send data

  if(!product.name || !product.price || !product.image){
    return res.status(400).json({success:false, message: 'Please Provide all Fields !'});
  }

  const newProduct = new Product(product)

  try {
    await newProduct.save();
    res.status(201).json({success:true, data:newProduct});
  } catch (error) {
    console.error("Error in create product:",error.message)
    res.status(500).json({success:false,  message: 'Server Error !'});
  }
});

app.delete("/api/products/:id" ,async (req,res) => {
    const {id} = req.params;
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product Deleted"});
    } catch (error){

    }
});

app.listen(5000, () => {
    connectDB();
  console.log('Server started at http://localhost:5000/products');
});

