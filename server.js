const express = require('express');
const fs = require('fs');
var app = express();
var path = require('path');

const PORT = 8081;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.json(path.join(__dirname, "public/index.html"));
  });

  app.get("/", function(req, res) {
    res.json(path.join(__dirname, "public/notes.html"));
  });

  app.post("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
      if (error) {
        return console.log(error)
      }
      notes = JSON.parse(notes)
  
      let id = notes[notes.length - 1].id + 1
      let newNote = { title: req.body.title, text: req.body.text, id: id }
      let activeNote = notes.concat(newNote)
  
      fs.writeFile(__dirname + "/db/db.json", JSON.stringify(activeNote), function (error, data) {
        if (error) {
          return error
        }
        console.log(activeNote)
        res.json(activeNote);
      })
    })
  })
  
  // Pull from db.json
  app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, data) {
      if (error) {
        return console.log(error)
      }
      console.log("Notes", data)
      res.json(JSON.parse(data))
    })
  });
  
  app.delete("/api/notes/:id", function (req, res) {
    const noteId = JSON.parse(req.params.id)
    console.log(noteId)
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
      if (error) {
        return console.log(error)
      }
      notes = JSON.parse(notes)
  
      notes = notes.filter(val => val.id !== noteId)
  
      fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function (error, data) {
        if (error) {
          return error
        }
        res.json(notes)
      })
    })
  })
  
  app.put("/api/notes/:id", function(req, res) {
    const noteId = JSON.parse(req.params.id)
    console.log(noteId)
    fs.readFile(__dirname + "db/db.json", "utf8", function(error, notes) {
      if (error ){
        return console.log(error)
      }
      notes.JSONparse(notes)
  
      notes = notes.filter(val => val.id !== noteId)
  
      fs.writeFile(__dirname +"db/db.json", JSON.stringify(notes), function (error, data) {
        if (error) {
          return error
        }
        res.json(notes)
      })
    })
  })

app.listen(PORT, () => {
    // Log (server-side) when our server has started
    console.log(`Server listening on: http://localhost:${PORT}`);
  });