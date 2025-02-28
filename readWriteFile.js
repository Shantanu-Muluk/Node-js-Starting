const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.end(`
            <form action="/message" method="POST">
                <label>Name: </label>
                <input type="text" name="username" />
                <button type="submit">Add</button>
            </form>
        `);
    } else if (url === "/message" && method === "POST") {
        let dataChunks = [];

        req.on("data", (chunk) => {
            dataChunks.push(chunk);
        });

        req.on("end", () => {
            const combinedBuffer = Buffer.concat(dataChunks);
            const parsedData = combinedBuffer.toString();
            const username = parsedData.split("=")[1]; // Extracts the value after "username="

            // Writing to file
            fs.writeFile("formVal.txt", username, (err) => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.end("Error saving data");
                    return;
                }
                // Redirect after writing to file
                res.statusCode = 302;
                res.setHeader("Location", "/");
                res.end();
            });
        });
    } else {
       if(url === "/read"){
        fs.readFile("formVal.txt",(err,data)=>{
            console.log(data.toString())
            res.end(`<h1>${data.toString()}</h1>`)
        })
       }
    }
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
