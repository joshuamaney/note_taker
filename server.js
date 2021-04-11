// required dependencies
const express = require('express');
const fs = require('fs');
var app = express();
var path = require('path');

// establish a port to be used
const PORT = 8081;

//serves files in a public directory
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/notes", (req, res) => {
    readFileAsync("./db/db.json", "utf8")
    .then((res, err) => {
        if(err) console.log(err);
        return res.json(JSON.parse(result));
    });
});

app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    readFileAsync("./db/db.json", "utf8")
    .then((result, err) => {
        if(err) console.log(err);
        return Promise.resolve(JSON.parse(result));
    }).then(data => {
        newNote.id = getLastIndex(data) + 1;
        (data.length > 0)? data.push(newNote):data = [newNote];
        return Promise.resolve(data);
    }).then(data => {
        writeFileAsync("./db/db.json", JSON.stringify(data));
        res.json(newNote);
    }).catch(err => {
        if(err) throw err;
    });
});

app.listen(PORT, () => {
    // Log (server-side) when our server has started
    console.log(`Server listening on: http://localhost:${PORT}`);
  });