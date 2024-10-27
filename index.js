const express = require("express");
// const PDFDocument = require("pdfkit");
// const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
const app = express();
require("dotenv").config()
app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://my-portfolio-f8f09.web.app",
      "http://localhost:5173"
    ],
    methods: ["PUT", "GET", "POST", "PATCH"]
    
  })
);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s7sbkwf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const run = async() => {
  try {
    const usersCollection = client.db("MyPortfolio").collection("users");
    const usersMessageCollection = client.db("MyPortfolio").collection("usersMessage")

    app.post("/nur_mohammad_palash_portfolios_users", async (req, res) => {
      const { uid, emailVerified, providerData } = req.body;
      const isAlreadyExist = await usersCollection.findOne({ uid })
      if (isAlreadyExist) return;
      await usersCollection.insertOne({ uid, emailVerified, providerData });
      return res.send("done");
    })

    app.post("/users_message", async (req, res) => {
      const data = req.body;
      const result = await usersMessageCollection.insertOne(data);
      res.send(result)
    })
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }  finally {
    
  }
}
run().catch(console.dir)

// get method for pdf
app.get('/download-pdf', (req, res) => {
   
    const filePath = path.join(__dirname, "files", 'resume.pdf'); 

  res.download(filePath, 'resume_of_palash.pdf', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error downloading the file');
    }
  });
});

app.get("/", (req, res) => {
    res.send("App is running successfully")
});
app.listen(port, ()=> console.log(`App is running in port ${port}`))