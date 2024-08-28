const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');


// Data setup
mongoose.connect("mongodb://localhost:27017/YourHR",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(function () {
        console.log("DB Connected")
    }).catch(function (err) {
        console.log(err)
    })

const mydb = new mongoose.Schema({
    name:String,
    id:String,
    password:String,
    pdf: String,
})
const collection = mongoose.model('collection', mydb);

//Cors data configure
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

//creating express app
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }))

//upload file
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads");
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })
}).single("user_file");

app.post("/upload", upload, (req, res) => {
    if (req.file) {
        res.send(req.file.filename);
    } else {
        res.status(400).send('failed');
    }
})

//////////////////////////////////////////////////////////////////////////////////////
app.get("/",  (req, res) => {
    res.json("Working");
})
//////////////////////////////////////////////////////////////////////////////////////

//get user login data  for user page
var pdfName;
app.post("/getdata", async (req, res) => {
    const { id, password } = req.body

    try {

        const check = await collection.find({ id: id, password: password })

        if (check.length > 0) {
            collection.find({ "id": id })
            .then(data =>{
                pdfName = data[0].pdf;
                res.json(data)})
            .catch(err => res.json("Faild To Find User"))
        }
        else {
            res.json("User Does Not Exist");
        }
    }
    catch (e) {
        res.json("Fail To Find User");
    }


})


//user signup data store in db
app.post("/store", async (req, res) => {
    const {name, id, password, pdf } = req.body;

    const data = {
        name: name,
        id: id,
        password: password,
        pdf : pdf
    }

    if (!data) {
        return res.status(400).json({ error: "No data provided" });
    }

    try {

        const check = await collection.findOne({ id:id })
        if (check === null || check.length <= 0) {
            await collection.insertMany([data]);
            res.json("Data Stored in Database, Now You Can Login and Explore");
        }
        else {
            res.json("Data Already Exist");
        }

    } catch (e) {
        res.status(500).json({ error: "Failed to Store Data in Database" });
    }
});


//File Download For Attendance
const pdfDirectory = path.join(__dirname, 'uploads');

app.get('/download', (req, res) => {
    fs.readdir(pdfDirectory, (err, files) => {
        if (err) {
            res.status(500).json({ error: 'Failed to read directory' });
            return;
        }
        const pdfFiles =  files.filter(file => file.includes(pdfName));
        res.json(pdfFiles);
    });
});

app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(pdfDirectory, filename);

    res.download(filePath, err => {
        if (err) {
            res.status(500).json({ error: 'Failed to download file' });
        }
    });
});

app.listen(5000, () => {
    console.log("port active");
});
