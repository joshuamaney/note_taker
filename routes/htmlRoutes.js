const path = require('path');

module.exports = (app) => {
    // to notes
    app.get("/notes", function(req, res) {
      res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
  
    // If no matching route is found default to home
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });
};