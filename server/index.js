const express = require("express");
const upload = require("express-fileupload")
const app = express();
const pool = require("./db");

// app.get("/", ) TODO

app.post("/users/upload", (req, res) => {
    console.log(">>>>>>>>> This is the req body")
    console.log(req.body);
    if (req.body) {
        console.log(req.body)
    } else {
        console.log("No files received")
    }
    res.sendStatus(200)
})

app.listen(5000, () => {
    console.log("server has started on port 5000")
})

