// required dependencies
const express = require('express');
const app = express();

// establish a port to be used
const PORT = process.env.PORT || 8081;

//serves files in a public directory
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, () => {
    // Log (server-side) when our server has started
    console.log(`Server listening on: http://localhost:${PORT}`);
  });