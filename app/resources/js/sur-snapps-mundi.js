/**
 * User: Soezen
 * Date: 7/12/13
 * Time: 13:08
 */

(function() {

    var mundi = sur.namespace('sur.snapps.mundi');
    var user = sur.snapps.mundi.user;

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
        console.log(opponent);
        var request = {
            opponent: opponent,
            requester: user.getCurrentUser().username
        }
        user.showActionsForPlayer(opponent, 'play');
        user.getSocket().emit('revoke-request', request);
    };

    mundi.setOpponent = function(inOpponent) {
        opponent = inOpponent;
    };
})();