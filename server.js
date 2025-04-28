const express = require("express");
const router = require("./router");

const server = express();
const PORT = process.env.PORT || 3000;

server.set("view engine", "ejs");
server.set("views", "./views");
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(router);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
