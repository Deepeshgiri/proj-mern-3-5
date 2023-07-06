import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

// create product controller
export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    console.log(req.fields);
    console.log(req.files);
    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required!" });
      case !description:
        return res.status(500).send({ error: "Description is required!" });
      case !price:
        return res.status(500).send({ error: "Price is required!" });
      case !category:
        return res.status(500).send({ error: "Category is required!" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required!" });
      case !photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is required should be less than 1mb!" });
    }
    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while adding product",
    });
  }
};

// ===== get all product=======
export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "all products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting products",
    });
  }
};

// == get single product
export const getSingleProduct = async (req, res) => {
  try {
    const product = new productModel.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single product fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting a product",
    });
  }
};

//=== get photo ====

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    console.log(product);
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: fail,
      error,
      message: "Error while getting photo",
    });
  }
};

// delete product route

export const deleteProductController = async(req,res)=>{
   try {
       const  product = productModel.findByIdAndDelete(req.params.id).select("-photo");
       res.send(200).status({
        success:true,
        message:"Delete product successfully."
       })
   } catch (error) {
      console.log(error);
      res.send(500).status({
        success:false,
        error,
        message:"Error while deleting product"
      })
      
   }
}

// update product controller
export const updateProductController = async (req,res)=>{
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    console.log(req.fields);
    console.log(req.files);
    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required!" });
      case !description:
        return res.status(500).send({ error: "Description is required!" });
      case !price:
        return res.status(500).send({ error: "Price is required!" });
      case !category:
        return res.status(500).send({ error: "Category is required!" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required!" });
      case !photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is required should be less than 1mb!" });
    }
    const product = await productModel.findByIdAndUpdate(req.params.id,
      {...req.fields,slug:slugify(name)},
      {new:true})
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
    
  } catch (error) {
    console.log(error);
    res.send(500).status({
        success:false,
        error,
        message:"Error while updating product."
    })
  }
}

