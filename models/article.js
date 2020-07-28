const mongoose = require('mongoose');
const slugify = require('slugify');
const marked = require('marked');
const create_dompurify = require('dompurify');
const {JSDOM} = require('jsdom');
const dompurify = create_dompurify(new JSDOM().window);
const article_schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    auth: {
        type: String
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
});

article_schema.pre('validate', function(next){
    if(this.title){
        this.slug = slugify(this.title, {lower: true, strict: true});
    }
    if(this.markdown){
      this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
    }
    next();
});

module.exports = mongoose.model('Arictle', article_schema);
