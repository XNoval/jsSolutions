/**
 * Created by levchenko on 5/12/14.
 */
function Style(styles) {
    this.styles = styles;
    this.applyStyles = function (object) {
        for(var key in this.styles) {
            if(this.getStyleProperty(key) === false) {
                object.setAttribute('style', object.getAttribute('style') + key + ':' + this.styles[key] + ';');
            } else {
                object.style[this.getStyleProperty(key)] = this.styles[key];
            }
        }
    };
    this.getStyleProperty = function (cssProperty) {
        var jsProperty = '';
        var partOfProperty = cssProperty.split('-');
        if(cssProperty.charAt(0) == '-') {
            return false;
        }
        for(var key = 0; key<partOfProperty.length; key++) {
            if(key == 0) {
                jsProperty = partOfProperty[key];
                continue;
            }
            jsProperty += partOfProperty[key].charAt(0).toUpperCase() + partOfProperty[key].substr(1, partOfProperty[key].length-1);;
        }
        return jsProperty;
    }
}

Element.prototype.css = function (options) {
    var style = (options instanceof Style) ? options : new Style(options);
    style.applyStyles(this);
    return style;
}