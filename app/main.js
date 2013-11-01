
var server = require('./node_modules/server');
var router = require('./node_modules/router');
var handlers = require('./node_modules/handlers');

server.start(router.route, handlers.handle);

