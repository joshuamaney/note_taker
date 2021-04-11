// required dependencies
const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
let note = require("./db/db.json");

// establish a port to be used
const PORT = 8081;

//serves files in a public directory
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/notes", (req, res) => {
    readFile("/db/db.json", "utf8")
    .then((res, err) => {
        if(err) console.log(err);
        return res.json(JSON.parse(result));
    });
});

app.listen(PORT, () => {
    // Log (server-side) when our server has started
    console.log(`Server listening on: http://localhost:${PORT}`);
  });