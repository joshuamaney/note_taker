// required dependencies
const express = require('express');
const fs = require('fs');
const app = express();
const db = require('./db/db.json');

// establish a port to be used
const PORT = 8081;

//serves files in a public directory
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
require("./routes/apiRoutes");
require("./routes/htmlRoutes");

app.listen(PORT, () => {
    // Log (server-side) when our server has started
    console.log(`Server listening on: http://localhost:${PORT}`);
  });