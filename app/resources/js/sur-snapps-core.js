/**
 * User: Soezen
 * Date: 2/11/13
 * Time: 13:00
 */

var sur = sur || {};

(function() {
    sur.namespace = function(namespaces) {
        var parts = namespaces.split('.'),
            parent = sur;

        if (parts[0] === 'sur') {
            parts = parts.splice(1);
        }

        var partsLength = parts.length;
        for (var i = 0; i < partsLength; i += 1) {
            if (typeof parent[parts[i]] === 'undefined') {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
        return parent;
    };

    var html = sur.namespace("sur.snapps.html");

    html.loadContent = function(input) {
        console.log('loading content of page');
        $.ajax({
            url: input,
            context: $("div.content")
        }).done(function(data) {
                console.log($(this));
           $(this).html(data);
        });
    };

    html.submitForm = function(formName) {
        $('#' + formName).ajaxSubmit({
            target: $("div.content"),
            replaceTarget: false
        });
    };

})();