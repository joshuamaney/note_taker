const db = require('../db/db.json')
const fs = require('fs');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => res.json(db));

    app.post("/api/notes", (req, res) => {
        let noteData =fs.readFileSync(db, 'utf8');
            console.log(noteData);
        noteData = JSON.parse(noteData);
        let noteLength = noteData.length;
    
        req.body.id = noteLength;
        note.push(req.body);
        noteData = JSON.stringify(noteData);
    
        fs.writeFile(db, noteData, 'utf8', (err) => {
            if (err) throw err;
        });
        res.json(JSON.parse(noteData));
    });
    
};
