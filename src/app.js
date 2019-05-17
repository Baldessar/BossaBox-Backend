const express = require('express');
const app = express();
const port = 3000 

/* Routes */
const tools = require("./tools/routes.js")


app.use("/",tools)

app.listen(port, function () {
  console.log(`listening on port ${port}!`);
});
