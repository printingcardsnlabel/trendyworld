var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const connectDB = require('../lib/db')
const Post = require('../models/post')
/* GET home page. */
router.get('/', async function(req, res, next) {

connectDB();

const posts = await Post.find();

  res.render('index', {posts});
});


router.get('/shop', async function(req, res, next) {

connectDB();

const posts = await Post.find();

  res.render('shop', {posts});
});

router.get('/new-arrivals',async (req,res)=>{
    connectDB();

const posts = await Post.find();
res.render('new-arrivals',{posts})
})

router.get('/discounts',async (req,res)=>{
connectDB();

const posts = await Post.find();
res.render('discounts',{posts})
})

router.get('/grab-deals',async (req,res)=>{

connectDB();

const posts = await Post.find();

res.render('grab-sales',{posts})
})










router.get('/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        // ডাটাবেজ থেকে আইডি দিয়ে প্রোডাক্ট খুঁজে বের করা
        const product = await Post.findById(productId);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render('product-view', { product });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});




router.get('/category/:catName', async function(req, res, next) {
    try {
        // ১. ডাটাবেজ কানেক্ট করা (যদি অলরেডি bin/www তে না করা থাকে)
        connectDB(); 
        // ২. URL থেকে ক্যাটাগরির নাম নেওয়া (যেমন: /category/shirts হলে 'shirts' আসবে)
        const categoryName = req.params.catName;
       // ৩. ডাটাবেজে ওই নির্দিষ্ট ক্যাটাগরি ফিল্টার করা
        // এখানে { $regex: ... } ব্যবহার করা হয়েছে যাতে বড় হাতের বা ছোট হাতের অক্ষরে সমস্যা না হয়
        const posts = await Post.find({ 
            category: { $regex: new RegExp("^" + categoryName + "$", "i") } 
        });
       // ৪. ইনডেক্স পেজেই ফিল্টার করা পোস্টগুলো পাঠানো
        res.render('category', { 
            posts, 
            currentCategory: categoryName 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});




router.get('/add',function(req, res, next) {

  res.render('add');
});
// Cart Page Route
router.get('/cart', (req, res) => {
  res.render('cart', { title: 'Your Shopping Cart' });
});

router.post('/add', async function(req, res) {
  // Database connection (ensure it's connected)
  await connectDB();

  try {
    const {
      title,
      content,
      category,
      isDiscount,
      regularPrice, // Main price ekhon eta
      discountPrice,
      isNewArrival,
      isLimited,
      imgUrl,
      imgUrl2,
      imgUrl3,
      imgUrl4,
      imgUrl5
    } = req.body;

    const postData = {
      title,
      content,
      category,
      imgUrl,
      imgUrl2,
      imgUrl3,
      imgUrl4,
      imgUrl5,
      // Checkbox handle kora (string 'true' ke boolean true-te convert kora)
      isDiscount: isDiscount === 'true',
      isNewArrival: isNewArrival === 'true',
      isLimited: isLimited === 'true',
      
      // Data Parsing Logic:
      // Regular Price shob somoy save hobe
      regularPrice: Number(regularPrice),
      
      // Jodi discount thake tobe discountPrice save hobe, nahole null
      discountPrice: isDiscount === 'true' ? Number(discountPrice) : null,
      
    
    };

    // Database-e save kora
    await Post.create(postData);

    res.send('success');
  } catch (error) {
    console.error("Error creating post:", error);
    res.redirect('/');
  }
});





router.get('/admin', async (req, res) => {
    try {
        const products = await Post.find().sort({ createdAt: -1 }); // নতুনগুলো আগে দেখাবে
        res.render('admin/dashboard', { products });
    } catch (error) {
        res.status(500).send("Admin Error");
    }
});

// Product Delete Route
router.get('/admin/delete/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (error) {
        res.redirect('/admin');
    }
});



const Order = require('../models/Order');

// চেকআউট পেজ রেন্ডার করা
router.get('/checkout', (req, res) => {
    res.render('checkout');
});

// অর্ডার প্রসেস করা (POST request)
router.post('/place-order', async (req, res) => {
    try {
        const { items, totalAmount, name, phone, address } = req.body;

        const newOrder = new Order({
            items: items,
            totalAmount: totalAmount,
            customerInfo: { name, phone, address }
        });

        await newOrder.save();
        res.json({ success: true, orderId: newOrder._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Order failed!" });
    }
});




router.get('/admin/orders', async (req, res) => {
    try {
        // নতুন অর্ডারগুলো সবার আগে দেখাবে (sort by createdAt)
        const orders = await Order.find();
        res.render('admin/order', { orders });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});



router.get('/admin/orders/delete/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.redirect('/admin/orders');
    } catch (error) {
        res.redirect('/admin/orders');
    }
});



router.get('/admin/orders/confirm/:id', async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, { status: 'Confirmed' });
        res.redirect('/admin/orders');
    } catch (error) {
        res.redirect('/admin/orders');
    }
});


router.get('/admin/orders/delete/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.redirect('/admin/orders');
    } catch (error) {
        res.redirect('/admin/orders');
    }
});


module.exports = router;
