const fs = require('fs');
let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

module.exports = (app) => {
 // GET notes
    app.get("/api/notes", (req, res) => {
        res.json(noteData);
    });

    app.get("/api/notes/:id", (req, res) => {
        res.json(noteData[Number(req.params.id)]);
    });

// POST notes
    app.post("/api/notes", (req, res) => {

        let newNote = req.body;
        let noteId = (noteData.length).toString();
        console.log(`Note id`, noteId, `created`);
        newNote.id = noteId;
        noteData.push(newNote);
        
        fs.writeFileSync("./db/db.json", JSON.stringify(noteData), (err) => {
            if (err) throw (err);        
        }); 

        res.json(noteData);    
    });

    // DELETE notes
    app.delete("/api/notes/:id", (req, res) => {

        let noteId = req.params.id;
        let newId = 0;
        console.log(`Deleted note ${noteId}`);
        noteData = noteData.filter(currNote => {
           return currNote.id != noteId;
        });
        for (currNote of noteData) {
            currNote.id = newId.toString();
            newId++;
        }
        fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
        res.json(noteData);
    }); 
}
