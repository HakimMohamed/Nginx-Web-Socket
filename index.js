const http = require("http");

//create web socket server
const webSocketServer = require("websocket").server;

//create http server object
const httpServer = http.createServer();

const websocketServer = new webSocketServer({ "httpServer": httpServer })

const PORT = 8080;
httpServer.listen(8080, () => console.log(`Listening on port ${PORT}`))

let connection = null // global variable for full duplex connection
websocketServer.on("request", request => {
    // establish a connection and accept any request coming from origin
    connection = request.accept(null, request.origin)
    connection.on("message", data => {
        console.log(`Message ${data.utf8Data} Recevied on port ${PORT}`)
    })
})

