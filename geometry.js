'use strict';

var Point = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
};
Point.constructor = Point;

Point.prototype = {
    plus: function(point) {
        var result = new Point(this.x + point.x, this.y + point.y);
        return result;
    },
    minus: function(point) {
        var result = new Point(this.x - point.x, this.y - point.y);
        return result;
    },
    min: function(point) {
        var result = new Point(Math.min(this.x, point.x), Math.min(this.y, point.y));
        return result;
    },
    max: function(point) {
        var result = new Point(Math.max(this.x, point.x), Math.max(this.y, point.y));
        return result;
    },
    distance: function(point) {
        var dx = point.x - this.x,
            dy = point.y - this.y,
            result = Math.sqrt(dx * dx + (dy * dy));
        return result;
    },
    toString: function() {
        return 'Point(' + this.x + ',' + this.y + ')';
    },
    greaterThan: function(point) {
        var result = this.x > point.x && this.y > point.y;
        return result;
    },
    lessThan: function(point) {
        var result = this.x < point.x && this.y < point.y;
        return result;
    },
    greaterThanEqualTo: function(point) {
        var result = this.x >= point.x && this.y >= point.y;
        return result;
    },
    lessThanEqualTo: function(point) {
        var result = this.x <= point.x && this.y <= point.y;
        return result;
    },
    isContainedWithinRectangle: function(rect) {
        var result = rect.origin.lessThanEqualTo(this) && rect.corner().greaterThanEqualTo(this);
        return result;
    }
};

var Rectangle = function(x, y, width, height) {
    this.origin = new Point(x, y);
    this.extent = new Point(width, height);
};

Rectangle.constructor = Rectangle;

Rectangle.prototype = {
    top: function() {
        return this.origin.y;
    },
    left: function() {
        return this.origin.x;
    },
    bottom: function() {
        return this.top() + this.extent.y;
    },
    right: function() {
        return this.left() + this.extent.x;
    },
    width: function() {
        return this.extent.x;
    },
    height: function() {
        return this.extent.y;
    },
    corner: function() {
        var result = new Point(this.right(), this.bottom());
        return result;
    },
    area: function() {
        return this.extent.x * this.extent.y;
    },
    contains: function(pointOrRect) {
        var result = pointOrRect.isContainedWithinRectangle(this);
        return result;
    },
    isContainedWithinRectangle: function(rect) {
        var result = rect.origin.lessThanEqualTo(this.origin) && rect.corner().greaterThanEqualTo(this.corner());
        return result;
    },
    center: function() {
        //return the center point
        var x = this.origin.x + (this.extent.x / 2);
        var y = this.origin.y + (this.extent.y / 2);
        return new Point(x, y);
    },
    insetBy: function(thickness) {
        return new Rectangle(
            this.origin.x + thickness,
            this.origin.y + thickness,
            this.extent.x - 2 * thickness,
            this.extent.y - 2 * thickness);
    },
    union: function(rectangle) {
        //answer a rectangle that contains the receiver and argment rectangles
        var anOrigin = this.origin.min(rectangle.origin),
            aCorner = this.corner().max(rectangle.corner()),
            width = aCorner.x - anOrigin.x,
            height = aCorner.y - anOrigin.y,
            result = new Rectangle(anOrigin.x, anOrigin.y, width, height);

        return result;
    },
    intersect: function(rectangle, ifNoneAction) {
        //Answer a Rectangle that is the area in which the receiver overlaps with
        //rectangle. Optimized for speed
        var point = rectangle.origin,
            myCorner = this.corner(),
            left = null,
            right = null,
            top = null,
            bottom = null,
            result = null;

        if (ifNoneAction && !this.intersects(rectangle)) {
            return ifNoneAction.call(this, rectangle);
        }

        if (point.x > this.origin.x) {
            left = point.x;
        } else {
            left = this.origin.x;
        }

        if (point.y > this.origin.y) {
            top = point.y;
        } else {
            top = this.origin.y;
        }

        point = rectangle.corner();
        if (point.x < myCorner.x) {
            right = point.x;
        } else {
            right = myCorner.x;
        }

        if (point.y < myCorner.y) {
            bottom = point.y;
        } else {
            bottom = myCorner.y;
        }
        result = new Rectangle(left, top, right - left, bottom - top);
        return result;
    },
    intersects: function(rectangle) {
        //return true if we overlap, false otherwise

        var rOrigin = rectangle.origin,
            rCorner = rectangle.corner();

        if (rCorner.x <= this.origin.x) {
            return false;
        }
        if (rCorner.y <= this.origin.y) {
            return false;
        }
        if (rOrigin.x >= this.corner.x) {
            return false;
        }
        if (rOrigin.y >= this.corner.y) {
            return false;
        }
        return true;
    },
    toString: function() {
        return 'Rectangle(' + this.origin.x + ', ' + this.origin.y + ', ' + this.extent.x + ', ' + this.extent.y + ')';
    }
};

module.exports = {
    Rectangle: Rectangle,
    Point: Point
};
