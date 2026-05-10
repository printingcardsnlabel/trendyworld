const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title:String,
    content:String,
    imgUrl:String,
    price:Number,
    category:String,
 
})

const Post = mongoose.model('Post',postSchema);
module.exports = Post;