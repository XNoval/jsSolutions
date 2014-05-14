/**
 * Created by levchenko on 5/14/14.
 *
 * @todo Добавить возможность при обновлении модели изменять данные в отображении
 */
var Model = function () {
    this._data = null;

    /**
     *
     * @param data {Object}
     */
    this.setData = function (data) {
        this._data = data;
        for(var key in this._data) {
            this[key] = this._data[key];
        }
    };

    /**
     *
     * @returns {null|Object}
     */
    this.getData = function () {
        return this._data;
    };

    /**
     *
     * @param callback {Function}
     */
    this.load = function (callback) {
        var result = {};
        callback(this.construct(result));
    };

    /**
     *
     * @param callback {Function}
     */
    this.loadAll = function (callback) {
        var result = [];
        var collection = Collection.construct();
        for(var i in result) {
            collection.add(this.construct(result[i]));
        }
        callback(collection);
    };

    /**
     *
     * @param data {Object}
     * @private
     */
    this.__construct = function (data) {
        this.setData(data);
    }
};