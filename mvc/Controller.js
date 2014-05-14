/**
 * Created by levchenko on 5/14/14.
 */
var Controller = function () {
    this.id = null;
    this.views = {};

    /**
     *
     * @returns {Array|Object}
     */
    this.runAction = function () {
        var args = arguments || [];
        var actionName = args.shift();
        return this[actionName].apply(this, args);
    };
    /**
     *
     * @param viewId {String}
     * @param data {Object}
     */
    this.render = function (viewId, data) {
        this.views[viewId].setId(viewId);
        this.views[viewId].setData(data);
    };

    /**
     *
     * @param view {String}
     */
    this.setView = function (view) {
        this.view = view;
    }
};