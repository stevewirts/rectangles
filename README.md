geometry
========

this is a simple but usefull library for handling many operations associated with points and rectangles.
there is a nice example of double dispatch; see the contains function on rectangle...

##var geometry = require('./geometry');
##var rect = new geometry.Rectangle();
##var point = new geometry.Point();

##point functions....

>plus(point)

>minus(point)

>min(point)

>max(point)

>distance(point)

>greaterThan(point)

>lessThan(point)

>greaterThanEqualTo(point)

>lessThanEqualTo(point)


##rectangle functions....
>top()

>left()

>bottom()

>right()

>corner()

>area()

>contains(pointOrRect)

>center()

>union(rectangle)

>intersect(rectangle, ifNoneAction)

>intersects(rectangle)



