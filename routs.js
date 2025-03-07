const fs = require("fs");

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        fs.readFile("TaksVal.txt", (err, data) => {
            const username = err ? "" : data.toString();
            res.setHeader("Content-Type", "text/html");
            res.end(`
                <form action="/message" method="POST">
                    <label>Name: </label>
                    <input type="text" name="username" value="${username}" />
                    <button type="submit">Add</button>
                </form>
                <h2>Saved Name: ${username}</h2>
            `);
        });
    } else if (url === "/message" && method === "POST") {
        let dataChunks = [];

        req.on("data", (chunk) => {
            dataChunks.push(chunk);
        });

        req.on("end", () => {
            const combinedBuffer = Buffer.concat(dataChunks);
            const parsedData = combinedBuffer.toString();
            const username = parsedData.split("=")[1];

            fs.writeFile("TaksVal.txt", username, (err) => {
                if (err) {
                    console.error("Error saving data:", err);
                    res.statusCode = 500;
                    res.end("Error saving data");
                    return;
                }
                res.statusCode = 302;
                res.setHeader("Location", "/");
                res.end();
            });
        });
    }
}

module.exports = requestHandler