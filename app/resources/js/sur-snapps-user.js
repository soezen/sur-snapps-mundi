/**
 * User: Soezen
 * Date: 30/11/13
 * Time: 18:58
 */

(function() {
    var util = sur.snapps.util;
    var html = sur.snapps.html;
    var user = sur.namespace('sur.snapps.mundi.user');

    var currentUser;
    var socket;

    user.init = function() {
        showHideMenuItems();
    };
    user.login = function() {
        currentUser = {
            username: $("#loginForm").find("#username").val(),
            roles: ['user'],
            requests: {}
        };
        socket = io.connect('http://localhost:8124', { 'force new connection' : true });
        socket.emit('login', currentUser);

        registerEvents(currentUser.username);
        html.loadContent('dashboard', user.init);
    };
    user.logout = function() {
        if (!util.isDefined(socket)) {
            socket = io.connect('http://localhost:8124');
        }
        currentUser = undefined;
        socket.disconnect();
        socket = undefined;
        html.loadContent('dashboard', user.init);
    };
    user.getPlayerName = function(input) {
        return $(input).parents('tr[data-player]').data('player');
    };
    user.getPlayerRow = function(playerName) {
        return $("#playersTable").find("[data-player=" + playerName + "]");
    };
    user.showActionsForPlayer = function(playerName, action) {
        var playerRow = user.getPlayerRow(playerName);
        playerRow.find("[data-action]").hide();
        playerRow.find("[data-action=" + action + "]").show();
    };
    user.loadRequests = function() {
        for (var i in currentUser.requests) {
            if (currentUser.requests.hasOwnProperty(i)) {
                gameRequest(currentUser.requests[i]);
            }
        }
    };

    function gameRequest(request) {
        currentUser.requests[request.requester.name] = request;
        user.showActionsForPlayer(request.requester.name, 'accept');
    }

    function registerEvents(username) {
        socket.on('player-list-add', function(newUser) {
            var playerRow = $('[data-template=player-row]').clone();
            playerRow.removeAttr('data-template');
            playerRow.attr('data-player', newUser.name);
            playerRow.find("[data-content]").each(function() {
                var key = $(this).data('content');
                $(this).text(newUser[key]);
            });
            playerRow.show();
            $("#playersTable").append(playerRow);
        });
        socket.on('player-list-delete', function(oldUser) {
            $("[data-player='" + oldUser.name + "']").remove();
            delete currentUser.requests[oldUser.name];
        });
        socket.on('game-request-' + username, gameRequest);
        socket.on('request-revoked-' + username, function(request) {
            delete currentUser.requests[request.requester];
            user.showActionsForPlayer(request.requester, 'play');
        });
        socket.on('request-accepted-' + username, function(data) {
            html.loadContent('game');
            user.connect('http://localhost:8124' + data.gameName);
        });
    }

    function showHideMenuItems() {
        var userRoles = ['anonymous'];
        if (isLoggedIn()) {
            userRoles = currentUser.roles;
        }

        $('[data-roles]').each(function() {
            var itemRoles = $(this).data('roles').split(',');
            var item = $(this);

            item.hide();
            for (var i in userRoles) {
                if (userRoles.hasOwnProperty(i)) {
                    var userRole = userRoles[i];
                    if (itemRoles.indexOf(userRole) > -1) {
                        item.show();
                    }
                }
            }
        });
    }

    user.getCurrentUser = function() {
        return currentUser;
    };

    user.getSocket = function() {
        return socket;
    };

    user.connect = function(url) {
        if (util.isDefined(socket)) {
            socket.disconnect();
        }
        socket = io.connect(url);
    };

    function isLoggedIn() {
        return util.isDefined(currentUser);
    }
})();