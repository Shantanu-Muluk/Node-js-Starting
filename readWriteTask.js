const http = require("http");
const routs = require("./routs");
const fs = require("fs");

fs.writeFile("TaksVal.txt", "", (err) => {
    if (err) {
        console.error("Error clearing file:", err);
    }
});

const server = http.createServer(routs);

server.listen(3040, () => {
    console.log("Server is running on http://localhost:3040");
});
