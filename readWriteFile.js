let http = require("http");

let server = http.createServer((req,res)=>{

    const url = req.url;
    const method = req.method;

    if(url === "/"){

        res.setHeader("Content-Type", "text/html");

        res.end(
            `<form action="/message" method = "POST">
                <lable>Name: </lable>
                <input type="text", name="username"></input>
                <button type="submit">Add</button>
            </form>
            `
        )
    }else if(url === "/message"){
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>Thank you! Your form has been submitted.</h1>");
    }
})

server.listen(3000, ()=>{
    console.log("server is running")
})