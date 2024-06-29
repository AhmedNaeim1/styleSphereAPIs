const http = require("http");
const app = require("./app");
// const ngrok = require("ngrok");

const port = process.env.PORT || 3005;
const server = http.createServer(app);

server.listen(port, ()=>{
    console.log(`Localhost running on: http://localhost:${port}`);
    // ngrok.connect(port).then(ngrokUrl=>{
    // console.log(`Ngrok tunnel in: ${ngrokUrl}`);
    // }).catch(error=>{
    // console.log(`Couldn't tunnel ngrok: ${error}`);
    // });
}
);