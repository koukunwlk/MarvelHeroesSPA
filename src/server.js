const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");
server.use(express.static("public"));
server.use(routes);

const port = 3000;

server.listen(port, console.log(`Server running at port: ${port}`));
