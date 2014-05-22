/**
 * Created by levchenko on 5/14/14.
 */
var XNovalWeb = {
    include: function (alias) {
        var body = document.getElementsByTagName('body')[0];
        var script = document.createElement('script');
        script.src = '/' + alias.split('.').join('/') + '.js';
        body.appendChild(script);
    },
    module: function (module) {

    }
};