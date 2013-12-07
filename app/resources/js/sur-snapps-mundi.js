/**
 * User: Soezen
 * Date: 7/12/13
 * Time: 13:08
 */

(function() {

    var mundi = sur.namespace('sur.snapps.mundi');
    var user = sur.snapps.mundi.user;

    mundi.startGame = function(opponent) {
        console.log(user.getCurrentUser() + ' plays against ' + opponent);
    };
})();