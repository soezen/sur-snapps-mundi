
var server = require('./node_modules/server');
var router = require('./node_modules/router');
var handlers = require('./node_modules/handlers');

var port = process.env.PORT || 8124;
server.start(router.route, handlers.handle, port);

