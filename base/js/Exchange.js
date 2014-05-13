/**
 * Request object helps to send all requests and exchange data with the server.
 * Events:
 *		responce
 *		success
 *		failure
 *
 * @version 0.1.0
 * @param {type} options
 * @returns {Exchange}
 */

function Exchange(options) {
    /**
     *
     * @type XMLHttpRequest|ActiveXObject|ActiveXObject
     */
    this.connection = null;
    /**
     *
     * @type String
     */
    this.status = 'NO_INIT';
    /**
     * Options of exchange has parameters for send request or sockets
     * @type Object
     */
    this.options = {
        connectionType: 'http',
        url: '/',
        method: 'GET',
        params: null,
        timeout: 5000
    };

    /**
     *
     * @param {Object} options
     * @returns {undefined}
     */
    this.setOptions = function(options) {
        for (option in options) {
            this.options[option] = options[option];
        }
    };

    /**
     * Initialize exchanging
     *
     * @returns {undefined}
     */
    this.init = function() {
        if (this.options.connectionType === 'http') {
            this.connection = this.createHttpConnection();
            this.setHttpRequestStates();
        }
    };

    /**
     * Create http request
     *
     * @returns {XMLHttpRequest|ActiveXObject}
     */
    this.createHttpConnection = function() {
        var connection = null;
        if (window.XMLHttpRequest) {
            try {
                connection = new XMLHttpRequest();
            } catch (e) {
                console.log(e);
            }
        } else if (window.ActiveXObject) {
            try {
                connection = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (e) {
                try {
                    connection = new ActiveXObject('Microsoft.XMLHTTP');
                } catch (e) {
                    console.log(e);
                }
            }
        }
        return connection;
    };

    /**
     * Set http request states and triggering events:
     *	- responce
     *	- success
     *	- failure
     *
     * @returns {undefined}
     */
    this.setHttpRequestStates = function() {
        var self = this;
        this.connection.onreadystatechange = function() {
            self.status = function(s) {
                switch (s) {
                    case 0:
                        return 'NO_INIT';
                    case 1:
                        return "LOADING";
                    case 2:
                        return "LOADED";
                    case 3:
                        return "PROCESS";
                    case 4:
                        return "READY";
                    default:
                        return "UNKNOW";
                }
            }.apply(self.connection.readyState);
            var abortTimeout = window.setTimeout(function() {
                self.connection.abort();
            }, self.options.timeout);
            if (self.connection.readyState === 4) {
                clearTimeout(abortTimeout);
                self.trigger('response', [self.connection.responseText, self.connection.status]);
                if (self.connection.status === 200) {
                    self.trigger('success', [self.connection.responseText, self.connection.status]);
                } else {
                    self.trigger('failure', [self.connection.status, self.connection.responseText]);
                }
            }
        };
    };

    /**
     *
     * @returns {Exchange}
     */
    this.send = function() {
        this.trigger('send', [this]);
        if (this.options.connectionType === 'http') {
            this.sendHttpRequest();
        }
        return this;
    };

    /**
     * Send http request POST or GET
     * @returns {undefined}
     */
    this.sendHttpRequest = function() {
        if (this.options.method === "POST") {
            this.connection.open("POST", this.options.url, true);
            var data = null;
            if (this.options.params instanceof FormData) {
                data = this.options.params;
                data.append('isAjax', '1');
            } else {
                this.connection.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                data = this.serializeParams(this.options.params);
            }
            this.connection.send(data);
        } else if (this.options.method === "GET") {
            this.connection.open("GET", this.options.url + this.serializeParams(this.options.params), true);
            this.connection.send(null);
        }
    };
    /**
     *
     * @param {Object} params
     * @returns {String}
     */
    this.serializeParams = function(params) {
        var serialize = [];
        for (param in params) {
            serialize.push(param + '=' + params[param]);
        }
        serialize.push('isAjax=1');
        if (serialize.length === 0) {
            return '';
        }
        return (this.options.method === "GET" ? "?" : "") + serialize.join('&');
    };
    /**
     *
     * @param {String} eventName
     * @param {Array} params
     * @returns {undefined}
     */
    this.trigger = function(eventName, params) {
        if (typeof (this['on' + eventName]) === 'undefined') {
            return;
        }
        this['on' + eventName].apply(this, params);
    };

    /**
     * Adding new event it's a function with prefix on
     * @returns {Exchange}
     */
    this.on = function(eventName, hendler) {
        this['on' + eventName] = hendler;
        return this;
    }

    this.setOptions(options);
    this.init();
    return this;
}
