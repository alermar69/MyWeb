/*������ ���������� 1.3*/

function angle(point1, point2) {
/*���������� ���� ����� ���� x � ��������, ����������� �����*/
	var angle;
	
	if ((point2.x == point1.x) && (point2.y > point1.y)) angle = Math.PI/2;
	if ((point2.x == point1.x) && (point2.y < point1.y)) angle = Math.PI/2;
	if (point2.x != point1.x) angle = Math.atan((point2.y - point1.y)/(point2.x - point1.x))
	
	return angle;
}

function polar(basePoint, angle, distance){
/*���������� ���������� �����, ��������� �� ������� �� ���������� distance ��� ����� angle*/
	var newPoint={};
	newPoint.x = basePoint.x + distance * Math.cos(angle);
	newPoint.y = basePoint.y + distance * Math.sin(angle);
	return  newPoint;
}

function parallel(basePoint1, basePoint2, dist){
/*������� ���������� ���������� ������ �������, ������������� �������, 
������������ ����� p1 � p2*/
	var ang = angle(basePoint1, basePoint2)
	var newPoint1 = polar(basePoint1, (ang + Math.PI/2), dist);
	var newPoint2 = polar(basePoint2, (ang + Math.PI/2), dist);
	
	var line = {};
	line.p1 = newPoint1;
	line.p2 = newPoint2;
	return line;
}

function subtract(AVec1, AVec2){
/*������� �������� ���� ������ �� �������*/
	var result = {};
	result.x = AVec1.x - AVec2.x;
	result.y = AVec1.y - AVec2.y;
	return result;
	}

function itercection(LineAP1, LineAP2, LineBP1, LineBP2){
/*������� ���������� ���������� ����� ����������� �����, ���������� ����� �������� �����*/

	var LDetLineA = LineAP1.x * LineAP2.y - LineAP1.y * LineAP2.x;
	var LDetLineB = LineBP1.x * LineBP2.y - LineBP1.y * LineBP2.x;

	var LDiffLA = subtract(LineAP1, LineAP2);
	var LDiffLB = subtract(LineBP1, LineBP2);

	LDetDivInv = 1 / ((LDiffLA.x * LDiffLB.y) - (LDiffLA.y * LDiffLB.x));
	var result = {};
	result.x = ((LDetLineA * LDiffLB.x) - (LDiffLA.x * LDetLineB)) * LDetDivInv;
	result.y = ((LDetLineA * LDiffLB.y) - (LDiffLA.y * LDetLineB)) * LDetDivInv;
	
	return result;
}

function newPoint_xy(basePoint, deltaX, deltaY){
/*������� ������ ������ ��������� �����, ��������� �� ������� �� �������� ���������� ��
��� � � �*/
	if (basePoint instanceof Array) {	
		var newPoint=[];
		newPoint[0] = basePoint[0] + deltaX;
		newPoint[1] = basePoint[1] - deltaY;
		if(basePoint[2] != "undefined") newPoint[2] = basePoint[2];
		return newPoint;
		}
	if (basePoint instanceof Object) {	
		var newPoint = {};
		newPoint.x = basePoint.x + deltaX;
		newPoint.y = basePoint.y + deltaY;
		if(basePoint.z != "undefined") newPoint.z = basePoint.z;
		
		return newPoint;	
		}
}


function newPoint_x(basePoint, deltaX, angle){
/*������� ������ ������ ��������� �����, ��������� �� ������� ��� �������� ���������� � ���� ��������
������������ ��� x*/
//console.log(basePoint);
	if (basePoint instanceof Array) {
		var newPoint=[];
		newPoint[0] = basePoint[0] + deltaX;
		newPoint[1] = basePoint[1] - deltaX * Math.tan(angle);
		if(basePoint[2] != "undefined") newPoint[2] = basePoint[2];
		return newPoint;
		}
	if (basePoint instanceof Object) {
		var newPoint = {};
		newPoint.x = basePoint.x + deltaX;
		newPoint.y = basePoint.y - deltaX * Math.tan(angle);
		if(basePoint.z != "undefined") newPoint.z = basePoint.z;
		return newPoint;	
		}
	
}

function newPoint_y(basePoint, deltaY, angle){
/*������� ������ ������ ��������� �����, ��������� �� ������� ��� �������� ���������� � ���� ��������
������������ ��� y*/
	if (basePoint instanceof Array) {
		var newPoint=[];
		newPoint[0] = basePoint[0] + deltaY * Math.tan(angle);
		newPoint[1] = basePoint[1] + deltaY;
		if(basePoint[2] != "undefined") newPoint[2] = basePoint[2];
		return newPoint;
		}
	if (basePoint instanceof Object) {
		var newPoint = {};
		newPoint.x = basePoint.x + deltaY * Math.tan(angle);
		newPoint.y = basePoint.y + deltaY;
		if(basePoint.z != "undefined") newPoint.z = basePoint.z;
		return newPoint;	
		}
}

function newPoint_z(basePoint, deltaZ, angle){
/*������� ������ ������ ��������� �����, ��������� �� ������� ��� �������� ���������� � ���� ��������
������������ ��� z*/
if (basePoint instanceof Array) {
	var newPoint=[];
	newPoint[0] = basePoint[0];
	newPoint[1] = basePoint[1] - deltaX * Math.tan(angle);
	newPoint[2] = basePoint[2] + deltaZ;
	return newPoint;
	}	
}

function copyPoint(basePoint){
/*������� �������� �������� ��������� ����� ����� � ������*/
	if (basePoint instanceof Object){
		var newPoint = {};
		newPoint.x = basePoint.x;
		newPoint.y = basePoint.y;
		if(basePoint.z != "undefined") newPoint.z = basePoint.z;
		return newPoint;
		}	
}




function distance(point_1, point_2){
/*�������������� ���������� ����� ����� �������*/
var dist=0;
if(point_1 instanceof Array)
	dist = (point_1[0] - point_2[0])*(point_1[0] - point_2[0]) + (point_1[1] - point_2[1])*(point_1[1] - point_2[1]);
if(point_1 instanceof Object && point_1.x != undefined)
	dist = (point_1.x - point_2.x)*(point_1.x - point_2.x) + (point_1.y - point_2.y)*(point_1.y - point_2.y);

	dist = Math.sqrt(dist);
return dist;
}

function addLine(shape, dxfArr, startPoint, endPoint, dxfBasePoint) {
//console.log(startPoint, endPoint, dxfBasePoint);


var curve = new THREE.LineCurve( new THREE.Vector2( startPoint.x, startPoint.x ), new THREE.Vector2( endPoint.x, endPoint.y ) );
shape.curves.push( curve );
shape.actions.push( { action: 'lineTo', args: [ endPoint.x, endPoint.y ] } );
		
		
/*���������� � ������ dxf*/

var id = dxfArr.length;
dxfArr[id] = 
"0" + "\n" + 
"LINE" + "\n" + 
"5" + "\n" + 
id + "\n" + 
"8" + "\n" + 
"0" + "\n" + 
"10" + "\n" + 
(startPoint.x + dxfBasePoint.x) + "\n" + 
"20" + "\n" + 
(startPoint.y + dxfBasePoint.y) + "\n" + 
"30" + "\n" + 
"0.0" + "\n" + 
"11" + "\n" + 
(endPoint.x + dxfBasePoint.x) + "\n" + 
"21" + "\n" + 
(endPoint.y + dxfBasePoint.y) + "\n" + 
"31" + "\n" + 
"0.0" + "\n"; 
}

function addArc(shape, dxfArr, centerPoint, radius, startAngle, endAngle, dxfBasePoint){
/*���������� � shape*/
shape.absarc(centerPoint.x, centerPoint.y, radius, startAngle, endAngle, true)

/*���������� � dxf*/
/*��������� ���� � �������*/
startAngle = startAngle * 180 / Math.PI;
endAngle = endAngle * 180 / Math.PI;
/*���� �������� ������ ������� �������*/
if(startAngle > endAngle) {
	var temp = startAngle;
	startAngle = endAngle;
	endAngle = temp
	}


var id = dxfArr.length;
dxfArr[id] = 
"0" + "\n" + 
"ARC" + "\n" + 
"5" + "\n" + 
id + "\n" + 
"8" + "\n" + 
"0" + "\n" + 
"10" + "\n" + 
(centerPoint.x + dxfBasePoint.x) + "\n" + 
"20" + "\n" + 
(centerPoint.y + dxfBasePoint.y) + "\n" + 
"30" + "\n" + 
"0.0" + "\n" + 
"40" + "\n" + 
radius + "\n" + 
"50" + "\n" + 
startAngle + "\n" + 
"51" + "\n" + 
endAngle + "\n";

}

function addCircle(shape, dxfArr, centerPoint, radius, dxfBasePoint) {
/*���������� � shape*/
shape.absarc(centerPoint.x, centerPoint.y, radius, 0, 2*Math.PI, true)

/*���������� � dxf*/
var id = dxfArr.length;
dxfArr[id] = 
"0" + "\n" + 
"CIRCLE" + "\n" + 
"5" + "\n" + 
id + "\n" + 
"8" + "\n" + 
"0" + "\n" + 
"10" + "\n" + 
(centerPoint.x + dxfBasePoint.x) + "\n" + 
"20" + "\n" + 
(centerPoint.y + dxfBasePoint.y) + "\n" + 
"30" + "\n" + 
"0.0" + "\n" + //����� z
"40" + "\n" + 
radius + "\n"; //������
}