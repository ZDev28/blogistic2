const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const article_router = require('./routes/articles');
const method_override = require('method-override');
const ejs = require('ejs');
const app = express();
//process.env.DB_LINK
mongoose.connect(`${process.env.DB_LINK}`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(method_override('_method'));


let connection = mongoose.connection;
connection.once('open', ()=>{
  console.log('DATABASE CONNECTED :D');
});

app.get('/', async (req,res)=>{
    const articles = await Article.find().sort({date: 'desc'});
    res.render('articles/index', {articles: articles});
});

app.use('/articles',article_router);

app.listen(3000, ()=>{
  console.log('CONNECTED!');
});
