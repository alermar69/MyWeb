function drawShape(height, width) {
	var shape = new THREE.Shape();
	var dxfBasePoint = {};
	dxfBasePoint.x = 0;
	dxfBasePoint.y = 0;

    var p1 = { x: 0, y: 0 };
	var p2 = newPoint_xy(p1, width, 0) // params basePoint, deltaX, deltaY
	addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
	p1 = p2;
	p2 =  newPoint_xy(p1, 0, height);
	addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
	p1 = p2;
	p2 =  newPoint_xy(p1, -width, 0);
	addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
	p1 = p2;
	p2 =  newPoint_xy(p1, 0, -height);
	addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);

	var hole = new THREE.Path();
	var centerPoint = { x: 20, y: 20 };
    var radius = 6;
    addCircle(hole, dxfPrimitivesArr, centerPoint, radius, dxfBasePoint);
    shape.holes.push(hole);

	var hole = new THREE.Path();
	var centerPoint = { x: width-20, y: 20 };
    var radius = 6;
    addCircle(hole, dxfPrimitivesArr, centerPoint, radius, dxfBasePoint);
    shape.holes.push(hole);

	var hole = new THREE.Path();
	var centerPoint = { x: 20, y: height-20 };
    var radius = 6;
    addCircle(hole, dxfPrimitivesArr, centerPoint, radius, dxfBasePoint);
    shape.holes.push(hole);

	var hole = new THREE.Path();
	var centerPoint = { x: width - 20, y: height-20 };
    var radius = 6;
    addCircle(hole, dxfPrimitivesArr, centerPoint, radius, dxfBasePoint);
    shape.holes.push(hole);

    //var hole2 = new THREE.Path();
    //var p1 = { x: 100, y: 100 };
    //var p2 = newPoint_xy(p1, 100, 0);
    //addLine(hole2, dxfPrimitivesArr, p1, p2, dxfBasePoint);
    //var p1 = copyPoint(p2);
    //var p2 = newPoint_xy(p1, 0, 100);
    //addLine(hole2, dxfPrimitivesArr, p1, p2, dxfBasePoint);
    //var p1 = copyPoint(p2);
    //var p2 = newPoint_xy(p1, -100, 0);
    //addLine(hole2, dxfPrimitivesArr, p1, p2, dxfBasePoint);
    //var p1 = copyPoint(p2);
    //var p2 = newPoint_xy(p1, 0, -100);
    //addLine(hole2, dxfPrimitivesArr, p1, p2, dxfBasePoint);
    //shape.holes.push(hole2);

	return shape;
}
