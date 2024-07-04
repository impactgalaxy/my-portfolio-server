const express = require("express");
// const PDFDocument = require("pdfkit");
// const fs = require("fs");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://my-portfolio-f8f09.web.app",
    ]
  })
);

//generate PDF doc 
// const generatePDF = (filePath, content) => {
//   const doc = new PDFDocument();
//   doc.pipe(fs.createWriteStream(filePath));
//   doc.text(content);
//   doc.end();
// };

// get method for pdf
app.get('/download-pdf', (req, res) => {
   
    const filePath = path.join(__dirname, "files", 'resume.pdf');

    // const filePath = path.join(__dirname,  'resume2.pdf');
    
    // If I want to generate new document;
  
    //   generatePDF(filePath, content);
    
    // download existing file
    

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