geometry
========

this is a simple but usefull library for handling many operations associated with points and rectangles.
there is a nice example of double dispatch; see the contains function on rectangle...

##var geometry = require('./geometry');
##var rect = new geometry.Rectangle();
##var point = new geometry.Point();

##point functions....

>plus(aPoint)

>minus(aPoint)

>min(aPoint)

>max(aPoint)

>distance(aPoint)

>greaterThan(aPoint)

>lessThan(aPoint)

>greaterThanEqualTo(aPoint)

>lessThanEqualTo(aPoint)


##rectangle functions....
>top()

>left()

>bottom()

>right()

>corner()

>area()

>contains(aPointOrRect)

>center()

>union(aRectangle)

>intersect(aRectangle, ifNoneAction)

>intersects(aRectangle)



