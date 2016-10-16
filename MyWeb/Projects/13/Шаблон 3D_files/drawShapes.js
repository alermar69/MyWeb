function drawShape(stringerParams) {
    
    var h = params.h;
    var b = params.b;
    var staieAmt = params.staieAmt;
    var M = params.M;

    var a = stringerParams.a;
    var treadThickness = stringerParams.treadThickness;

	var shape = new THREE.Shape();
	var dxfBasePoint = {};
	dxfBasePoint.x = 0;
	dxfBasePoint.y = 0;

	var p1 = { x: 0, y: 0 }
	var p0 = copyPoint(p1);
	var p2 = newPoint_xy(p1, 0, h); // params basePoint, deltaX, deltaY
	addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
    for (var i = 0; i < staieAmt-1; i++) {
        p1 = copyPoint(p2);
        p2 = newPoint_xy(p1, b, 0);
        addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
        p1 = copyPoint(p2);
        p2 = newPoint_xy(p1, 0, h);
        addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
    }
	
    p1 = copyPoint(p2);
	p2 =  newPoint_xy(p1, b, 0);
	addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);p1 = copyPoint(p2);
	p2 =  newPoint_xy(p1, 0, -treadThickness);
	addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
	p1 = copyPoint(p2);
	p2 =  newPoint_xy(p0, b, 0);
	addLine(shape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
	p1 = copyPoint(p2);
	addLine(shape, dxfPrimitivesArr, p1, p0, dxfBasePoint);

	return shape;
}
