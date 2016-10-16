function drawShape(height, width) {
	var shape = new THREE.Shape();
	var dxfBasePoint = {};
	dxfBasePoint.x = 0;
	dxfBasePoint.y = 0;

	var p1 =  {x:0,y:0}
	var p2 = newPoint_xy(p1, width, 0) // params basePoint, deltaX, deltaY
	addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
	p1 = p2;
	p2 =  newPoint_xy(p1, 0, height-500);
	addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
	p1 = p2;
	p2 =  newPoint_xy(p1, -width, 500);
	addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
	p1 = p2;
	p2 =  newPoint_xy(p1, 0, -height);
	addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);

	return shape;
}
function drawShape1(height, width) {
    var shape = new THREE.Shape();
    var dxfBasePoint = {};
    dxfBasePoint.x = width+10;
    dxfBasePoint.y = 0;

    var p1 = { x: 0, y: 0 }
    var p2 = newPoint_xy(p1, width, 0) // params basePoint, deltaX, deltaY
    addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
    p1 = p2;
    p2 = newPoint_xy(p1, 0, height - 500);
    addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
    p1 = p2;
    p2 = newPoint_xy(p1, -width, 500);
    addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
    p1 = p2;
    p2 = newPoint_xy(p1, 0, -height);
    addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);

    return shape;
}