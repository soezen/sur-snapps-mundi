/**
 * User: Soezen
 * Date: 7/12/13
 * Time: 13:08
 */

(function() {

    var mundi = sur.namespace('sur.snapps.mundi');
    var user = sur.snapps.mundi.user;
    var html = sur.snapps.html;
    var gameName;

    mundi.test = function() {
        user.getSocket().emit('test');
    };

    mundi.requestGame = function(input) {
        var opponent = user.getPlayerName(input);
        var request = {
            opponent: opponent,
            requester: user.getCurrentUser().username
        }
        user.showActionsForPlayer(opponent, 'requested');
        user.getSocket().emit('request-game', request);
    };
    mundi.revokeRequest = function(input) {
        var opponent = user.getPlayerName(input);
        var request = {
            opponent: opponent,
            requester: user.getCurrentUser().username
        }
        user.showActionsForPlayer(opponent, 'play');
        user.getSocket().emit('revoke-request', request);
    };
    mundi.acceptRequest = function(input) {
        var opponent = user.getPlayerName(input);
        var gameName = '/game-' + user.getCurrentUser().username + '-vs-' + opponent;
        var url = window.location.origin + gameName;
        user.getSocket().emit('accept-request', {
            opponent: opponent,
            gameName: gameName
        });
        html.loadContent('game');
        user.getSocket().disconnect();
        user.connect(url);
    };
    mundi.startGame = function() {
        var socket = user.getSocket();
        socket.emit('ready', { username: user.getCurrentUser().username });

        socket.on('update-view', mundi.updateView);
    };

    mundi.shoot = function() {
        user.getSocket().emit('shoot');
    };
    mundi.startMoving = function() {
        user.getSocket().emit('move-start', {
            direction: 'UP'
        });
    };
    mundi.stopMoving = function() {
        user.getSocket().emit('move-stop');
    };

    mundi.updateView = function(view) {
        var stage = new Kinetic.Stage({
            container: 'game-view',
            width: 500,
            height: 500
        });
        console.log(view);
    };

    mundi.setGameName = function(name) {
        gameName = name;
    }
})();