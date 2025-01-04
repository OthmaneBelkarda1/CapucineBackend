const mongoose = require("mongoose");
const Schema = mongoose.Schema

const articleSchema = new Schema( 
   { 
   ParentLastName: { type: String, required: true },
   ParentFirstName: { type: String, required: true },
   StudentLastName: { type: String, required: true },
   StudentFirstName: { type: String, required: true },
   Age: { type: Number, required: true },
   Niveau: { type: String, required: true },
   Email: { type: String, required: true },   
   Numero: { type: Number, required: true }},

 );
const Article = mongoose.model("Article",articleSchema);
module.exports = Article;