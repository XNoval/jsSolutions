/**
 * Created by levchenko on 5/14/14.
 */


var Collection = function () {
    this._items = [];
    this._iteration = 0;

    /**
     *
     * @param model {Model|Object}
     */
    this.add = function (model) {
        this._items.push(model);
    }

    /**
     *
     * @returns {Model|Object}
     */
    this.fetch = function () {
        if(typeof this._items[this._iteration] === "undefined") {
            this._iteration = 0;
            return null;
        }
        return this._items[this._iteration++];
    };

    /**
     *
     * @returns {Array}
     */
    this.getAll = function () {
        return this._items;
    };

    /**
     *
     * @param model {Model|Object}
     * @param arrayOfSomeData {Array}
     * @private
     */
    this.__construct = function (model, arrayOfSomeData) {
        for(var i in arrayOfSomeData) {
            this.add(model.construct(arrayOfSomeData[i]));
        }
    }
};