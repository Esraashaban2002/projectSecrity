const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const CartItem = require("../models/CartItem");
const { auth, isAdmin, isUser } = require('../middleware/auth');
// Secret Key
const secretKey = process.env.SECRET_KEY

router.post("/cart" , auth , async (req, res) => {
  try {
    const { product } = req.body;
    console.log("Received product:", product);
    
    const productString = JSON.stringify(product);

    const encrypted = CryptoJS.TripleDES.encrypt(productString, CryptoJS.enc.Utf8.parse(secretKey), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();

    const newItem = new CartItem({ encryptedData: encrypted , userId : req.user._id });
    await newItem.save();

    res.status(201).json({ message: "✅ Product encrypted and saved!" });
  } catch (error) {
    console.error("❌ Error adding product:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/carts" , auth , isAdmin , async (req, res) => {
  try {
    const items = await CartItem.find({});

    const decryptedItems = items.map((item) => {
      const bytes = CryptoJS.TripleDES.decrypt(item.encryptedData, CryptoJS.enc.Utf8.parse(secretKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    });

    res.json(decryptedItems);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/cart" , auth , isUser , async (req, res) => {
  try {
    const items = await CartItem.find({userId : req.user._id });

    const decryptedItems = items.map((item) => {
      const bytes = CryptoJS.TripleDES.decrypt(item.encryptedData, CryptoJS.enc.Utf8.parse(secretKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    });

    res.json(decryptedItems);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
