/**
 * User: Soezen
 * Date: 30/11/13
 * Time: 18:58
 */

(function() {
    window.onunload = function (e) {
        if (isRegistered()) {
            user.unregister();
        }
    };
    var util = sur.snapps.util;
    var html = sur.snapps.html;
    var user = sur.namespace('sur.snapps.mundi.user');
    var currentUser;

    user.init = function() {
        console.log('is registered ' + isRegistered());
        if (isRegistered()) {
            $(".unregistered").hide();
        }
    };

    user.unregister = function() {
        var form = document.createElement("form");
        form.action = "stopWaitForGame";
        form.method = "POST";
        var userInput = document.createElement("input");
        userInput.name = "username";
        userInput.id = "username";
        userInput.value = currentUser.username;
        console.log(currentUser.username);
        form.appendChild(userInput);
        $(form).ajaxSubmit();
    };

    user.register = function() {
        var formName = 'registerWaitingUser';
        currentUser = {
            username: document.forms[formName].username.value
        };
        html.submitForm(formName);
    };

    function isRegistered() {
        return util.isDefined(currentUser);
    }
})();