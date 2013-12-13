
var router = require('./node_modules/router');
var logger = require('./node_modules/logger');
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app.listen(process.env.PORT || 8124), { log: false });
var url = require('url');
var socketHandler = require('./node_modules/socket-handler');

logger.setLevel(logger.INFO);

function handler(request, response) {
    logger.debug('Request received: ' + request.url);
    var pathname = url.parse(request.url).pathname;

    router.route(pathname, request, response);
}

io.sockets.on('connection', function(socket) {
    socketHandler.handle(socket);
    socketHandler.setIo(io);
});


