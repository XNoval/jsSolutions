/**
 * Created by levchenko on 5/14/14.
 */

var View = function () {
    this.id = null;
    this.url = null;
    this.content = null;
    this.data = null;

    /**
     *
     * @param id {String}
     */
    this.setId = function (id) {
        this.id = id;
    };

    /**
     *
     * @param data {Object}
     */
    this.setData = function (data) {
        this.data = data;
    };

    /**
     *
     * @returns {null|String}
     */
    this.render = function () {
        return this.content;
    };

    /**
     *
     * @param data {Object}
     * @private
     */
    this.__construct = function (data) {
        this.data = data;
    };
};