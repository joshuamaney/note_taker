const path = require('path');
const db = require('../db/db.json');

module.exports = (app) => {
    
    app.get("/api/notes", (req, res) => {
        res.json(db);
      });

      app.post("api/notes", (req, res) => {
        indexCode.push(req.body);
        res.json(indexCode);
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