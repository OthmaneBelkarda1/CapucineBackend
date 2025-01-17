const express = require("express");

const app = express();

const mongoose = require("mongoose");

const Article = require("./models/Article.js");

//mongodb+srv://belkardaothmane05:<password>@cluster0.1l2p35k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;

mongoose.connect("mongodb+srv://belkardaothmane05:4954ktbmyqlhsdxe@cluster0.1l2p35k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
console.log("connected succesfully");

}).catch((error)=>{
    console.log("error with connecting with data base");
});


app.listen(3000, ()=>{
    console.log("I'm listening in port 3000")
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.use(express.json());

app.post("/articles", async(req,res)=>{
    const newArticle = new Article();
    const ParentLastName = req.body.ParentLastName ;
    const ParentFirstName = req.body.ParentFirstName ;
    const StudentLastName = req.body.StudentLastName;
    const StudentFirstName = req.body.StudentFirstName;
    const Age = req.body.Age;
    const Niveau = req.body.Niveau;
    const Email = req.body.Email;
    const Numero = req.body.Numero;
 
    newArticle.ParentLastName=ParentLastName;
    newArticle.ParentFirstName=ParentFirstName;
    newArticle.StudentLastName=StudentLastName;
    newArticle.StudentFirstName=StudentFirstName;
    newArticle.Age=Age;
    newArticle.Niveau=Niveau;
    newArticle.Email=Email;
    newArticle.Numero=Numero;
    await newArticle.save()
    res.json(newArticle)
});
app.get("/article",async(req,res)=>{
  try{ 
   //   const article = await Article.findById(id);
   const article = await Article.find();
    res.json(article);
    console.log("the article is",article);
    } 
  catch(error){
        console.log("error");
        return res.send("error")
    }
})


app.delete("/articles/:articleId",async(req,res)=>{
   const id = req.params.articleId;
    try{
        const article = await Article.findByIdAndDelete(id);
        res.json(article);
    }
    catch(error){
        console.log("error");
        return res.send("error")
    }
})