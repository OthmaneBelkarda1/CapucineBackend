const express = require("express");
const cors = require("cors"); // Import cors package

const app = express();
const mongoose = require("mongoose");
const Article = require("./models/Article.js");

// MongoDB connection
mongoose.connect("mongodb+srv://belkardaothmane05:Othmane&2005@cluster0.1l2p35k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("connected successfully");
}).catch((error) => {
    console.log("error with connecting to the database", error);
});

// Use CORS middleware globally
app.use(cors({
    origin: '*', // Allow only this origin (adjust if necessary)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.listen(3000, () => {
    console.log("I'm listening on port 3000");
});

app.use(express.json());

app.post("/articles", async (req, res) => {
    const newArticle = new Article();
    const { ParentLastName, ParentFirstName, StudentLastName, StudentFirstName, Age, Niveau, Email, Numero } = req.body;

    newArticle.ParentLastName = ParentLastName;
    newArticle.ParentFirstName = ParentFirstName;
    newArticle.StudentLastName = StudentLastName;
    newArticle.StudentFirstName = StudentFirstName;
    newArticle.Age = Age;
    newArticle.Niveau = Niveau;
    newArticle.Email = Email;
    newArticle.Numero = Numero;

    await newArticle.save();
    res.json(newArticle);
});

app.get("/article", async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
        console.log("The articles are:", articles);
    } catch (error) {
        console.log("Error");
        return res.send("Error");
    }
});

app.delete("/articles/:articleId", async (req, res) => {
    const id = req.params.articleId;
    try {
        const article = await Article.findByIdAndDelete(id);
        res.json(article);
    } catch (error) {
        console.log("Error");
        return res.send("Error");
    }
});
