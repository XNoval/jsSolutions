/**
 * Created by levchenko on 5/13/14.
 */
/*
 * Examples for using extend({parent}) and construct({args}).
 *
 *    var par = (function () {
 *        this.config = null;
 *        this.parFunc = function () {
 *            console.log('Parent function');
 *            console.log(this.config);
 *        };
 *        this.__construct = function (config) {
 *            this.config = config;
 *        };
 *    });
 *
 *    var chi = (function () {
 *        this.chiFunc = function () {
 *            console.log('Children function');
 *            console.log(this.config);
 *        };
 *        this.__construct = function (config) {
 *            this.parent.__construct(config);
 *        }
 *    }).extend(par);
 *
 *    var foo = chi.construct({a: 'asdfasdf'});
 *    foo.chiFunc();
 *
 */
Object.prototype.extends = null;
/**
 * Extending functions and properties from parent function in construct method
 * Set parent function witch extends in construct
 * @param parent {Object}
 * @returns {Object}
 */
Object.prototype.extend = function (parent) {
    this.extends = parent;
    return this;
};
/**
 * Constructing the new Object and return it.
 * @returns {Object}
 */
Object.prototype.construct = function () {
    var aArgs = arguments;
    var thisConstructor = this;
    var newConstructor = function () { thisConstructor.apply(this, aArgs); };
    newConstructor.prototype = thisConstructor.prototype;
    var newObject = new newConstructor();
    if(thisConstructor.extends == null) {
        newObject.__construct.apply(newObject, aArgs);
        return newObject;
    }
    this.parent = thisConstructor.extends.construct.apply(thisConstructor.extends, aArgs);
    for(var property in this.parent) {
        if(typeof this[property] === "undefined") {
            newObject[property] = this.parent[property];
        }
    }
    newObject.__construct.apply(newObject, aArgs);
    return newObject;
};
