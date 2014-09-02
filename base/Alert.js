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
        'title': 'System message:&nbsp;',
        'bootstrap': false,
        'autoAppend': true,
        'withTitle': true,
        'type': ''
    };
    this.body = document.getElementsByTagName('body')[0];

    this.createAlert = function () {
        this.container = document.createElement('div');
        this.createCloseButton();
        this.container.appendChild(this.closeButton);
        this.container.className = 'alert' + (this.options.type == '' ? '' : ' alert-' + this.options.type);
        if (this.options.bootstrap == false) {
            this.setStyleContainer();
        }
        if (this.options.autoAppend) {
            this.body.appendChild(this.container);
        }
    };

    this.createCloseButton = function () {
        var self = this;
        this.closeButton = document.createElement('a');
        this.closeButton.innerHTML = '&times;';
        this.closeButton.className = 'close';
        this.closeButton.setAttribute('data-dismiss', 'alert');
        if (this.options.bootstrap == false) {
            this.setStyleCloseButton();
        }
        this.closeButton.onclick = function () {
            self.close();
        }
    };
    this.createContent = function () {
        if (this.options.withTitle) {
            var title = document.createElement('h4');
            title.className = 'title';
            title.innerHTML = this.options.title;
            if (this.options.bootstrap == false) {
                this.setStyleTitle(title);
            }
            this.container.appendChild(title);
        }
        var content = document.createElement('div');
        content.className = 'content';
        content.innerHTML = this.options.content;
        if (this.options.bootstrap == false) {
            this.setStyleContent(content);
        }
        this.container.appendChild(content);
    };
    this.close = function () {
        this.body.removeChild(this.container);
    };
    this.setStyleContainer = function () {
        this.container.css({
            'position': 'fixed',
            'min-height': '30px',
            'left': '0px',
            'right': '0px',
            'top': '0px',
            'z-index': '1000000',
            'background': '#FDD'
        });
    };
    this.setStyleCloseButton = function () {
        this.closeButton.css({
            'position': 'absolute',
            'font-size': '18px',
            'line-height': '12px',
            'top': '10px',
            'right': '10px',
            'cursor': 'pointer'
        });
    };
    this.setStyleTitle = function (title) {
        title.css({
            'display': 'inline-block',
            'line-height': '12px',
            'font-size': '12px',
            'margin': '10px 0px 10px 20px'
        });
    };
    this.setStyleContent = function (content) {
        content.css({
            'display': 'inline-block',
            'line-height': '12px',
            'font-size': '12px'
        });
    };
    if (typeof options == 'string') {
        this.options['content'] = options;
    } else {
        for (var key in options) {
            this.options[key] = options[key];
        }
    }
    this.createAlert();
    this.createContent();
    return this;
};
window.alert = function (message) {
    return new Alert(message)
};