// required dependencies
const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const db = require('./db/db.json');

// establish a port to be used
const PORT = 8081;

//serves files in a public directory
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// routing

    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "./public/notes.html"));
    });

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });    

module.exports = (app) => {
    
    app.get("/api/notes", (req, res) => {
        res.json(db);
      });

    app.post("/api/notes", function (req, res) {
        const newNote = {
          id: db.length + 1,
          title: req.body.title,
          text: req.body.text
        };
        db.push(newNote);
        res.json(db);
      });

    app.delete("/api/notes/:id", function (req, res) {
        const reqId = req.params.id;
        let note = db.filter(note => {
          return note.id == reqId;
        })[0];
        const index = db.indexOf(note);
        db.splice(index, 1);
        for (var i = index; i < db.length; i++) {
          db[i].id--;
    }
        res.json(db);
    });
};

app.listen(PORT, () => {
    // Log (server-side) when our server has started
    console.log(`Server listening on: http://localhost:${PORT}`);
  });