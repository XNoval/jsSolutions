/**
 * Created by levchenko on 5/13/14.
 */
Object.prototype.extends = null;
Object.prototype.options = {};
Object.prototype.extend = function (parent) {
    console.log('extending...');
    this.extends = parent;
    console.log(parent);
    console.log(this);
    return this;
};
Object.prototype._construct = function () {
    console.log('constructing...');
    if(this.constructor.extends == null) {
        return this;
    }
    this.parent = this.constructor.extends.apply(null, arguments);
    console.log(this);
    console.log(this.parent);
    for(var property in this.parent) {
        if(typeof this[property] === "undefined") {
            this[property] = this.parent[property];
        }
    }
    return this;
};

var par = (function () {
    this.parFunc = function () {
        console.log('parent');
    };
    return this;
});

var chi = function () {
    this.chiFunc = function () {
        console.log('child');
    };
    this._construct(arguments);
}.extend(par);

var foo = new chi({a: 'b'});

