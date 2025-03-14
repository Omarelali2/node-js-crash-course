const express = require("express");

const app = express();

app.use(express.json());

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://omar:omaralali123@cluster0.0gp4r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connecting successfully");
  })
  .catch((e) => {
    console.log("error", e);
  });

const article = require("./models/article");
app.get("/", (req, res) => {
  res.send("hi welcome to this page");
});

app.get("/hello", (req, res) => {
  let num = "";
  for (let i = 0; i <= 100; i++) {
    num += i + "-";
  }
  //res.send(`the number area : ${num}`)
  //res.sendFile(__dirname + "/views/numbers.html")
  res.render("numbers.ejs", {
    name: "Omar",
    numbers: num,
  });
});

app.get("/findSummation2", (req, res) => {
  // console.log(req.body)
  // console.log(req.query)

  // res.send(`the total number is : ${req.body.name},age is : ${req.query.age}`)
  res.json({
    name: req.body.name,
    age: req.query.age,
  });
});
app.get("/findSummation/:num1/:num2", (req, res) => {
  const num = req.params.num1;
  const number = req.params.num2;
  const total = Number(num) + Number(number);
  res.send(`the total number is : ${total}`);
});


app.post("/addComment", (req, res) => {
  res.send("post request on add comment");
});
app.delete("/delete", (req, res) => {
  res.send("post request on add deleted");
});

//===================Articles EndPoints=================

app.post("/article", async (req, res) => {
  const newArticle = new article();
  const artTitle = req.body.title;
  const artBody = req.body.articleBody;
  newArticle.title = artTitle;
  newArticle.body = artBody;
  newArticle.numberOfLike = 100;
  await newArticle.save();
  res.json(newArticle);
});
app.get("/article", async (req, res) => {
  const articles = await article.find();
  res.json(articles);
});
app.get("/article/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const a = await article.findById(id);
    res.json(a);
    return;
  } catch (e) {
    console.log("error id not found", id);
    return res.send("error");
  }
});
app.delete("/article/:articleId", async (req, res) => {
    const id = req.params.articleId;
    try {
      const a = await article.findByIdAndDelete(id);
      res.json(a);
      return;
    } catch (e) {
      console.log("error id not found", id);
      return res.send("error");
    }
  });

  app.get("/showArticles",async(req,res)=>{
    const articles = await article.find()
    res.render("articles.ejs",{
        allArticles: articles
    })
    
  })
app.listen(3000, () => {
  console.log("i am listening in port 3000");
});
