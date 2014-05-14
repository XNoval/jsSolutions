/**
 * Created by 1 on 13.04.14.
 */
/**
 *
 * @param options string|Object
 * @constructor
 */
var Alert = function (options) {
    this.closeButton = null;
    this.container = null;
    this.options = {
        'title': 'System message:&nbsp;'
    };
    this.body = document.getElementsByTagName('body')[0];

    this.createAlert = function () {
        this.container = document.createElement('div');
        this.createCloseButton();
        this.container.appendChild(this.closeButton);
        this.container.className = 'alert';
        this.container.css({
            'position': 'fixed',
            'min-height': '30px',
            'left': '0px',
            'right': '0px',
            'top': '0px',
            'z-index': '1000000',
            'background': '#FDD'
        });
        this.body.appendChild(this.container);
    };

    this.createCloseButton = function () {
        var self = this;
        this.closeButton = document.createElement('a');
        this.closeButton.innerHTML = '&times;';
        this.closeButton.className = 'close';
        this.closeButton.css({
            'position': 'absolute',
            'font-size': '18px',
            'line-height': '12px',
            'top': '10px',
            'right': '10px',
            'cursor': 'pointer'
        });
        this.closeButton.onclick = function () {
            self.close();
        }
    };
    this.createContent = function () {
        var title = document.createElement('h4');
        var content = document.createElement('div');
        title.className = 'title';
        title.innerHTML = this.options.title;
        title.css({
            'display': 'inline-block',
            'line-height': '12px',
            'font-size': '12px',
            'margin': '10px 0px 10px 20px'
        });
        content.className = 'content';
        content.innerHTML = this.options.content;
        content.css({
            'display': 'inline-block',
            'line-height': '12px',
            'font-size': '12px'
        });
        this.container.appendChild(title);
        this.container.appendChild(content);
    };
    this.close = function () {
        this.body.removeChild(this.container);
    };
    if (typeof options == 'string') {
        this.options['content'] = options;
    } else {
        for(var key in options) {
            this.options[key] = options[key];
        }
    }
    this.createAlert();
    this.createContent();
};
window.alert = function (message) {
    return new Alert(message)
};