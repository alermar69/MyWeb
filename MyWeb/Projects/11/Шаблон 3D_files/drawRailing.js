/***  Секции маршей   ***/


function drawRailingSection(
			bottomEnd, platformLengthBottom, topEnd, platformLengthTop, 
			railingSide, stairAmt, h1, b1, a1, h2, scale, lastMarsh, 
			topConnection, bottomConnection) {

if (turnFactor == -1) {
	var railingSideTemp = railingSide
	if (railingSideTemp == "left") railingSide = "right"
	if (railingSideTemp == "right") railingSide = "left"
	}
var railingSection = new THREE.Object3D();
var rackOffsetY = 150;
var rackLength = 900;
var rackPositionStep = setRackPosition(stairAmt);
var handrailAngle = Math.atan(h1 / b1);
var railingPositionZ = 0;
if (turnFactor == -1) railingPositionZ = -40;
var turnAngleTop = 0;
var turnAngleBottom = 0;
var basePoint = [];

/*материалы*/
var timberMaterial = new THREE.MeshLambertMaterial( { color: 0x804000, overdraw: 0.5} );
var railingMaterial =  new THREE.MeshLambertMaterial({color: 0xD0D0D0, wireframe: false});
var glassMaterial =  new THREE.MeshLambertMaterial({opacity:0.6, color: 0x3AE2CE, transparent:true});
var glassThickness = 8;
if (railingModel == "Самонесущее стекло") glassThickness = 12;
	var glassExtrudeOptions = {
		amount: glassThickness*scale,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
	var forgingExtrudeOptions = {
		amount: 40*scale,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};

	var turnAngleTop = 0;
	if (topEnd == "забег") {
		var deltaXtopPlatform = platformLengthTop - b1/2 - 70;
		var deltaYtopPlatform = h2;
		turnAngleTop = Math.atan( deltaYtopPlatform/deltaXtopPlatform)	
		}	
	var turnAngleBottom = 0;
	if (bottomEnd == "забег") {
		var deltaXbottomPlatform = platformLengthBottom + b1/2 - 70;
		var deltaYbottomPlatform = 2*h1;
		turnAngleBottom = Math.atan( deltaYbottomPlatform/deltaXbottomPlatform)
		}

		
/* стойки */


if (railingModel == "Ригели" || railingModel == "Стекло на стойках") {

rackPosition = [];
rackNuber = 0;

if(stairAmt != 0) {

/*нижняя площадка*/
if (bottomEnd == "площадка") {
 	/*первая стойка площадки*/
	var x0 = (70 - platformLengthBottom) * scale;
	var y0 = - rackOffsetY*scale;
	var z0 = railingPositionZ*scale;
	var basePoint = [x0, y0, z0];
	drawRack3d(basePoint, rackLength, handrailAngle, railingMaterial, scale, railingSection)
 }
if (bottomEnd == "забег") {
 	/*первая стойка площадки*/
	var x0 = (70 - platformLengthBottom) * scale;
	var y0 = - rackOffsetY*scale - h1*scale;
	var z0 = railingPositionZ*scale;
	var basePoint = [x0, y0, z0];
	drawRack3d(basePoint, rackLength, handrailAngle, railingMaterial, scale, railingSection)
	}
var rackPosition0 = rackPosition[0]; //сохраняем координаты стойки площадки
 
rackPosition = [];
rackNuber = 0;

/*ограждения марша*/

	/*первая стойка марша*/
	var x0 = b1/2 * scale;
	var y0 = h1*scale - rackOffsetY*scale;
	var z0 = railingPositionZ*scale;
	var basePoint = [x0, y0, z0];
	drawRack3d(basePoint, rackLength, handrailAngle, railingMaterial, scale, railingSection)	

var rackPosition1 = rackPosition[0]; //сохраняем координаты стойки марша
	
	x=x0;
	y=y0;
	/*средние стойки марша*/
	for (i = 0; i < stairAmt; i++) {
		x = x0 + b1*i*scale;
		y = y0 + h1*i*scale;
		basePoint = [x, y, z0];
		for (var j = 0; j < rackPositionStep.length; j++)
			if (i+1 == rackPositionStep[j]) 
				rack = drawRack3d(basePoint, rackLength, handrailAngle, railingMaterial, scale, railingSection)	
		}
	/*последняя стойка марша*/
	basePoint = [x, y, z0];
	if (topEnd == "нет" || topEnd == "забег")
				rack = drawRack3d(basePoint, rackLength, handrailAngle, railingMaterial, scale, railingSection);
	if (topEnd == "площадка") {
		basePoint[0] += 50*scale;
		rack = drawRack3d(basePoint, rackLength, handrailAngle, railingMaterial, scale, railingSection);
		
		/*средние стойки площадки*/
		var middleRackAmt = Math.round(platformLengthTop/800)-1;
		if (middleRackAmt < 0) middleRackAmt = 0;
		var p0 = basePoint;
		var rackDist = (platformLengthTop-70 - 100 - 40)/(middleRackAmt + 1)
		for (i = 0; i < middleRackAmt; i++) {
			p0 = newPoint_x(p0, rackDist*scale, 0);
			drawRack3d(p0, rackLength, handrailAngle, railingMaterial, scale, railingSection)
			}
		
		/*последняя стойка площадки*/
		p0 = newPoint_x(basePoint, (platformLengthTop - 50 - 70 - b1/2)*scale, 0);
		drawRack3d(p0, rackLength, handrailAngle, railingMaterial, scale, railingSection)
		}
	if (topEnd == "забег") {
		/*последняя стойка площадки*/
		p0 = newPoint_x(basePoint, (platformLengthTop - 70 - b1/2)*scale, 0);
		p0[1] = p0[1] + h2*scale; 
		drawRack3d(p0, rackLength, handrailAngle, railingMaterial, scale, railingSection)
		}


	if (topEnd == "забег") {
		var rackPosition2 =  rackPosition[rackPosition.length-2];
		var rackPosition3 =  rackPosition[rackPosition.length-1];
		//var turnAngleTop = Math.atan( (rackPosition3[1] - rackPosition2[1])/(rackPosition3[0] - rackPosition2[0]))
		}	

	}
if(stairAmt == 0) {
var sectionLength = platformLengthBottom + platformLengthTop - 140;
var sectionAngle = Math.atan(3*h1 / sectionLength)
	/*первая стойка*/
	var x0 = (70 - platformLengthBottom) * scale;
	var y0 = - rackOffsetY*scale - h1*scale;
	var z0 = railingPositionZ*scale;
	var basePoint = [x0, y0, z0];
	drawRack3d(basePoint, rackLength, handrailAngle, railingMaterial, scale, railingSection)

var rackPosition0 = rackPosition[0]; //сохраняем координаты стойки площадки

/*остальные стойки*/
	var middleRackAmt = Math.round(sectionLength/800);
		if (middleRackAmt < 0) middleRackAmt = 0;
		var p0 = basePoint;
		var rackDist = sectionLength/(middleRackAmt + 1)
		for (i = 0; i < middleRackAmt+1; i++) {
			p0 = newPoint_x(p0, rackDist*scale, -sectionAngle);
			drawRack3d(p0, rackLength, sectionAngle, railingMaterial, scale, railingSection)
			}	
	}
}


/* ригели */


if (railingModel == "Ригели") {
 
	//var rigelMaterial = railingMaterial;
	var rigelProfileY = 20;
	var rigelProfileZ = 20;
	
	if(rigelMaterial == "20х20 черн.") {
		rigelModel = "rect";
		rigelProfileY = 20;
		rigelProfileZ = 20;
		}
	if(rigelMaterial == "Ф12 нерж.") {
		rigelModel = "round";
		rigelProfileY = 12;
		rigelProfileZ = 12;
		}
	if(rigelMaterial == "Ф16 нерж.") {
		rigelModel = "round";
		rigelProfileY = 16;
		rigelProfileZ = 16;
		}

	if (railingSide == "left") z0 = (railingPositionZ + 40)*scale*turnFactor;
	if (railingSide == "right") z0 = (railingPositionZ - rigelProfileZ)*scale//*turnFactor;

if(stairAmt != 0) {	
/*нижняя площадка*/
if (bottomEnd == "площадка") {

	var x0 = (70 - platformLengthBottom) * scale;
	var y0 = 0//- rackOffsetY*scale;
	var rigelLength = platformLengthBottom + b1/2; 	
	rigelAmt = Number(rigelAmt);
	var rigelDist = (rackLength-150)/(rigelAmt+1);
	for (var i=1; i < rigelAmt+1; i++) {
	y0 = h1*scale + rigelDist*i*scale - rackOffsetY*scale;
	basePoint = [x0, y0, z0];
	basePoint = newPoint_x(basePoint, -30*scale, -handrailAngle)
	drawPole3D(rigelModel, rigelProfileY, rigelProfileZ, basePoint, rigelLength, 0, railingMaterial, scale, railingSection);
	}
}

if (bottomEnd == "забег") {
	var turnAngleBottom = Math.atan( (rackPosition1[1] - rackPosition0[1])/(rackPosition1[0] - rackPosition0[0]))
	var x0 = (70 - platformLengthBottom) * scale;
	var y0 = 0//- rackOffsetY*scale;
	var rigelLength = (platformLengthBottom + b1/2)/Math.cos(turnAngleBottom); 	
	rigelAmt = Number(rigelAmt);
	var rigelDist = (rackLength-150)/(rigelAmt+1);
	for (var i=1; i < rigelAmt+1; i++) {
	y0 = rigelDist*i*scale - rackOffsetY*scale - 60*scale;
	basePoint = [x0, y0, z0];
	basePoint = newPoint_x(basePoint, -30*scale, -handrailAngle)
	drawPole3D(rigelModel, rigelProfileY, rigelProfileZ, basePoint, rigelLength, turnAngleBottom, railingMaterial, scale, railingSection);
	}


}

/*ригели на марше*/
	var stepLength = h1/Math.sin(handrailAngle);
	var rigelLength = stepLength * (stairAmt - 1) + 100; 	
	x0 = b1/2 * scale;
	rigelAmt = Number(rigelAmt);
	var rigelDist = (rackLength-150)/(rigelAmt+1);
	for (var i=1; i < rigelAmt+1; i++) {
	y0 = h1*scale + rigelDist*i*scale;
	basePoint = [x0, y0, z0];
	basePoint = newPoint_x(basePoint, -30*scale, -handrailAngle)
	drawPole3D(rigelModel, rigelProfileY, rigelProfileZ, basePoint, rigelLength, handrailAngle, railingMaterial, scale, railingSection);
	}

	if (topEnd == "площадка") {
		basePoint = [x, y, z0];
		var p1t = basePoint; //сохраняем точку
		basePoint[0] += 50*scale;
		y0 = basePoint[1];		
		rigelLength = platformLengthTop - 70 - b1/2
		for (var i=1; i < rigelAmt+1; i++) {
			basePoint[1] = y0 + h1*scale + rigelDist*i*scale;
			drawPole3D(rigelModel, rigelProfileY, rigelProfileZ, basePoint, rigelLength, 0, railingMaterial, scale, railingSection);
			}
	}
	if (topEnd == "забег") {		
		basePoint = rackPosition2;
		basePoint[2] = z0;
		y0 = basePoint[1];		
		rigelLength = (platformLengthTop - 70 - b1/2)/Math.cos(turnAngleTop);
		for (var i=1; i < rigelAmt+1; i++) {
			basePoint[1] = y0 + h1*scale + rigelDist*i*scale - 60*scale;
			drawPole3D(rigelModel, rigelProfileY, rigelProfileZ, basePoint, rigelLength, turnAngleTop, railingMaterial, scale, railingSection);
			}	
		}
}

if(stairAmt == 0) {	
//middleRackAmt
	var rigelLength = (sectionLength + 60) / Math.cos(sectionAngle)	
	x0 = rackPosition0[0]
	rigelAmt = Number(rigelAmt);
	var rigelDist = (rackLength-150)/(rigelAmt+1);
	for (var i=1; i < rigelAmt+1; i++) {
	y0 = -h1*scale + rigelDist*i*scale;
	basePoint = [x0, y0, z0];
	basePoint = newPoint_x(basePoint, -30*scale, -sectionAngle)
	drawPole3D(rigelModel, rigelProfileY, rigelProfileZ, basePoint, rigelLength, sectionAngle, railingMaterial, scale, railingSection);
	}


}

}
/* стекла на стойках */

if (railingModel == "Стекло на стойках") {
var glassDist = 80;
var glassHeight = 600;
for (i=0; i<rackPosition.length-1; i++) {
	if (rackPosition[i][1] == rackPosition[i+1][1]) 
		var glassShape = drawGlassShape (rackPosition[i], rackPosition[i+1], 0, glassDist, glassHeight, scale);
	else
		var glassShape = drawGlassShape (rackPosition[i], rackPosition[i+1], handrailAngle, glassDist, glassHeight, scale);
	var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	
	var glass = new THREE.Mesh(geom, glassMaterial);
	glass.position.x = rackPosition[i][0] + glassDist/2*scale;
	glass.position.y = rackPosition[i][1] + 230*scale;
	glass.position.z = railingPositionZ*scale + 16*scale;
	
	glass.castShadow = true;
	railingSection.add(glass);
	//stairCase.push(glass);
	}
if(stairAmt != 0) {		
	if (bottomEnd == "площадка") {
	var rackDist0 = platformLengthBottom - 70 + b1/2;
	var p1 = rackPosition0;
	var p2 = newPoint_x (p1, rackDist0*scale,0)
	
	var glassShape = drawGlassShape (p1, p2, 0, glassDist, glassHeight, scale);
	var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	
	var glass = new THREE.Mesh(geom, glassMaterial);
	glass.position.x = rackPosition0[0] + glassDist/2*scale;
	glass.position.y = rackPosition0[1] + 230*scale;
	glass.position.z = railingPositionZ*scale + 16*scale;
	
	glass.castShadow = true;
	railingSection.add(glass);	
	}
	
	if (bottomEnd == "забег") {
	var turnAngleBottom = Math.atan( (rackPosition1[1] - rackPosition0[1])/(rackPosition1[0] - rackPosition0[0]))
	var glassShape = drawGlassShape (rackPosition0, rackPosition1, turnAngleBottom, glassDist, glassHeight, scale);
	var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));	
	var glass = new THREE.Mesh(geom, glassMaterial);
	glass.position.x = rackPosition0[0] + glassDist/2*scale;
	glass.position.y = rackPosition0[1] + 230*scale;
	glass.position.z = railingPositionZ*scale + 16*scale;	
	glass.castShadow = true;
	railingSection.add(glass);
	}
}
} //конец стекол на стойках


/* —јћќЌ?—”ў?? —“? Ћќ */

if (railingModel == "Самонесущее стекло") {


	var glassDist = 10; //зазор между стеклами
	var glassOffset = 15; //зазор от стекла до торца ступени
	var glassHeight = 1030;
	if (glassHandrail == "сбоку") glassHeight = 1100;
	if (railingSide == "right") z0 = (railingPositionZ + glassOffset)*scale
	if (railingSide == "left") z0 = (railingPositionZ + 40 - glassOffset - glassThickness)*scale;

if (stairAmt!= 0){
	if (topEnd == "забег") {
		deltaXtopPlatform = platformLengthTop - b1;
		deltaYtopPlatform = h1;
		turnAngleTop = Math.atan( deltaYtopPlatform/deltaXtopPlatform)	
		}	
	if (bottomEnd == "забег") {
		deltaXbottomPlatform = platformLengthBottom;
		deltaYbottomPlatform = h1;
		turnAngleBottom = Math.atan( deltaYbottomPlatform/deltaXbottomPlatform)
		}
	
/*нижняя площадка*/

if (bottomEnd != "нет") {

	var glassSectionLength1 = platformLengthBottom;
	if (bottomConnection) glassSectionLength1 = glassSectionLength1 + glassOffset - glassDist;

	var glassAmt_1 = Math.round(glassSectionLength1/800);
	var glassLengthX = glassSectionLength1/glassAmt_1;
	var p1 = [0, 0];
	var p2 = [glassLengthX * scale, glassLengthX*scale * Math.tan(turnAngleBottom)];
	x0 = 0 - glassSectionLength1*scale;
	y0 = -rackOffsetY*scale - glassSectionLength1 * Math.tan(turnAngleBottom)*scale;
	for (i=0; i<glassAmt_1; i++) {
		var glassShape = drawGlassShape (p1, p2, turnAngleBottom, glassDist, glassHeight, scale);
		var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));		
		var glass = new THREE.Mesh(geom, glassMaterial);
		glass.position.x = x0 + glassLengthX * scale * i;
		glass.position.y = y0 + glassLengthX*scale * Math.tan(turnAngleBottom) * i;
		glass.position.z = z0;
		glass.castShadow = true;
		railingSection.add(glass);
		
		}
	}	

/*марш*/
	
	var glassSectionLength2 = b1 * stairAmt;
	
	if (topEnd == "нет") {
		if (lastMarsh) glassSectionLength2 = b1 * (stairAmt - 1) + a1;
		else glassSectionLength2 = b1 * stairAmt - glassDist - glassOffset;
		}
	
	if (bottomEnd == "нет") glassSectionLength2 = glassSectionLength2 - glassOffset;
	var glassAmt_1 = Math.round(glassSectionLength2/800);
	if (glassAmt_1 == 0) glassAmt_1 = 1;
	var glassLengthX = glassSectionLength2/glassAmt_1;
	var p1 = [0, 0];
	var p2 = [glassLengthX * scale, glassLengthX*scale * Math.tan(handrailAngle)];
	var rackPosition0 = p1;
	var rackPosition1 = p2;
	x0 = 0;
	if (bottomEnd == "нет") x0 = glassOffset*scale;
	y0 = -rackOffsetY*scale;//-h1*scale;
	for (i=0; i<glassAmt_1; i++) {
		var glassShape = drawGlassShape (p1, p2, handrailAngle, glassDist, glassHeight, scale);
		var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));		
		var glass = new THREE.Mesh(geom, glassMaterial);
		glass.position.x = x0 + glassLengthX * scale * i;
		glass.position.y = y0 + glassLengthX*scale * Math.tan(handrailAngle) * i;
		glass.position.z = z0;
		glass.castShadow = true;
		railingSection.add(glass);
		}
	
	basePoint[0] = glass.position.x + glassLengthX * scale;
	basePoint[1] = glass.position.y + glassLengthX*scale * Math.tan(handrailAngle);
	basePoint[2] = glass.position.z
		
/*верхняя площадка*/

if (topEnd != "нет") {

	var glassSectionLength3 = platformLengthTop - b1;
	if (topConnection) glassSectionLength3 = glassSectionLength3 + glassOffset + glassDist + glassThickness;
	var glassAmt_1 = Math.round(glassSectionLength3/800);
	var glassLengthX = glassSectionLength3/glassAmt_1;
	var p1 = [0, 0];
	var p2 = [glassLengthX * scale, glassLengthX*scale * Math.tan(turnAngleTop)];
	x0 = basePoint[0]
	y0 = basePoint[1]
	//z0 = basePoint[2]
	for (i=0; i<glassAmt_1; i++) {
		var glassShape = drawGlassShape (p1, p2, turnAngleTop, glassDist, glassHeight, scale);
		var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));		
		var glass = new THREE.Mesh(geom, glassMaterial);
		glass.position.x = x0 + glassLengthX * scale * i;
		glass.position.y = y0 + glassLengthX*scale * Math.tan(turnAngleTop) * i;
		glass.position.z = z0;
		glass.castShadow = true;
		railingSection.add(glass);
		}
	}	
}

if(stairAmt == 0) {
	
	var glassSectionLength0 = platformLengthTop + platformLengthBottom - glassDist;
	if (bottomConnection) glassSectionLength0 = glassSectionLength0 + glassOffset// - glassDist;
	if (topConnection) glassSectionLength0 = glassSectionLength0 + glassOffset + glassDist + glassThickness;

	//console.log(bottomConnection, topConnection)
	var glassAngle = Math.atan(3*h1 / glassSectionLength0)
	var glassAmt_1 = Math.round(glassSectionLength0/800);
	var glassLengthX = glassSectionLength0/glassAmt_1;
	var p1 = [0, 0];
	var p2 = [glassLengthX * scale, glassLengthX*scale * Math.tan(glassAngle)];
	var rackPosition0 = p1;
	var rackPosition1 = p2;
	x0 = -platformLengthBottom*scale + glassDist*scale;
	if (bottomConnection) x0 = x0 - glassOffset *scale;

	y0 = -rackOffsetY*scale - h1*scale;
	
	for (i=0; i<glassAmt_1; i++) {
		var glassShape = drawGlassShape (p1, p2, glassAngle, glassDist, glassHeight, scale);
		var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));		
		var glass = new THREE.Mesh(geom, glassMaterial);
		glass.position.x = x0 + glassLengthX * scale * i;
		glass.position.y = y0 + glassLengthX*scale * Math.tan(glassAngle) * i;
		glass.position.z = z0;
		glass.castShadow = true;
		railingSection.add(glass);
		}
	
	basePoint[0] = glass.position.x + glassLengthX * scale;
	basePoint[1] = glass.position.y + glassLengthX*scale * Math.tan(handrailAngle);
	basePoint[2] = glass.position.z



	}
}// конец самонесущего стекла


/*  ковка */


if (railingModel == "Кованые балясины") {

rackPosition = [];
rackNuber = 0;

var angleBottom = 0;
var angleTop = handrailAngle;
var forgedRackProfile = 40;
var forgedRackLength = 900;
	var longRackLength = 900;
	var shortRackLength = rackOffsetY;

if (stairAmt != 0) {
/*нижняя площадка*/
if (bottomEnd == "площадка") {
 	/*первая стойка площадки*/
	var x0 = (70 - platformLengthBottom) * scale;
	var y0 = - rackOffsetY*scale;
	var z0 = railingPositionZ*scale;
	var basePoint = [x0, y0, z0];
	drawForgedRack3d(basePoint, longRackLength, turnAngleBottom, railingMaterial, scale, railingSection)
 }
if (bottomEnd == "забег") {
 	/*первая стойка площадки*/
	var x0 = (70 - platformLengthBottom) * scale;
	var y0 = - rackOffsetY*scale - h1*scale;
	var z0 = railingPositionZ*scale;
	var basePoint = [x0, y0, z0];
	drawForgedRack3d(basePoint, longRackLength, turnAngleBottom, railingMaterial, scale, railingSection)
	}

if (bottomEnd != "нет") {
	var rackPosition0 = basePoint; //сохраняем координаты стойки площадки
	//обнуляем массив координат стоек 
	rackPosition = [];
	rackNuber = 0;
	}

/*первая стойка марша*/
	x0 = b1/2*scale;
	y0 = h1*scale - rackOffsetY*scale;
	z0 = railingPositionZ * scale
	basePoint = [x0, y0, z0];
	var p0 = [x0, y0, z0];
	p0 = newPoint_x(p0, forgedRackProfile*scale, -handrailAngle);
	drawForgedRack3d(basePoint, longRackLength, handrailAngle, railingMaterial, scale, railingSection)

var rackPosition1 = rackPosition[0]; //сохраняем координаты стойки

	/*средние стойки марша*/
	for (i = 0; i < stairAmt; i++) {
		x = x0 + b1*i*scale;
		y = y0 + h1*i*scale;
		basePoint = [x, y, z0];
		for (var j = 0; j < rackPositionStep.length; j++)
			if (i+1 == rackPositionStep[j]){
				drawForgedRack3d(basePoint, shortRackLength, handrailAngle, railingMaterial, scale, railingSection)
				}
		}
	/*последняя стойка марша*/
	basePoint = [x, y, z0];
	var rackTopAngle = handrailAngle;
	if (topEnd == "площадка") rackTopAngle = 0;
	if (topEnd == "забег") rackTopAngle = turnAngleTop;
	var rackPosition2 = basePoint; //сохраняем координаты стойки
	
	
	drawForgedRack3d(basePoint, longRackLength, rackTopAngle, railingMaterial, scale, railingSection)

	var p1 = [x, y, z0];
	
/*верхняя площадка*/

if (topEnd == "площадка") {

 	/*средние стойки площадки*/
		var middleRackAmt = Math.ceil(platformLengthTop/1000)-1;
		if (middleRackAmt < 0) middleRackAmt = 0;
		var rackDist = (platformLengthTop-70 - 100 - 40)/(middleRackAmt + 1)
		for (i = 0; i < middleRackAmt; i++) {
			basePoint = newPoint_x(basePoint, rackDist*scale, 0);
			drawForgedRack3d(basePoint, shortRackLength, rackTopAngle, railingMaterial, scale, railingSection)
			}
		
		/*последняя стойка площадки*/
		//basePoint = newPoint_x(basePoint, (platformLengthTop - 50 - 70 - b1/2)*scale, 0);
		basePoint = newPoint_x(basePoint, rackDist*scale, 0);
		drawForgedRack3d(basePoint, longRackLength, rackTopAngle, railingMaterial, scale, railingSection)
		}
	if (topEnd == "забег") {
		/*последняя стойка площадки*/
		basePoint = newPoint_x(basePoint, (platformLengthTop - 50 - 70 - b1/2)*scale, 0);
		basePoint[1] = basePoint[1] + h2 *scale; 
		drawForgedRack3d(basePoint, longRackLength, rackTopAngle, railingMaterial, scale, railingSection)
		}
	
	var p2 = basePoint;
	
/*нижняя перемычка нижней площадки*/

if (bottomEnd != "нет"){
	var leftHeight = 20/Math.cos(turnAngleBottom);
	var poleLength = (platformLengthBottom + b1/2 - 70 - 40)/Math.cos(turnAngleBottom);
	var bottomPoleShape = draw4angleShape (turnAngleBottom, turnAngleBottom, poleLength, leftHeight, scale)
	var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, forgingExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, railingMaterial);
	bottomPole.position.x = rackPosition0[0]
	bottomPole.position.y = rackPosition0[1] + rackOffsetY*scale
	bottomPole.position.z =z0;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);
	}

/*нижняя перемычка марша*/

	var leftHeight = 20/Math.cos(handrailAngle);
	var poleLength = b1*stairAmt-b1
	var bottomPoleShape = draw4angleShape (handrailAngle, handrailAngle, poleLength, leftHeight, scale)
	var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, forgingExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, railingMaterial);
	bottomPole.position.x = rackPosition1[0]
	bottomPole.position.y = rackPosition1[1] + rackOffsetY*scale
	bottomPole.position.z =z0;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);

/*нижняя перемычка верхней площадки*/

if (topEnd != "нет"){
	var leftHeight = 20/Math.cos(turnAngleTop);
	var poleLength = (platformLengthTop - b1/2 - 70 - 50 + 40)/Math.cos(turnAngleTop);
	var bottomPoleShape = draw4angleShape (turnAngleTop, turnAngleTop, poleLength, leftHeight, scale)
	var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, forgingExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, railingMaterial);
	bottomPole.position.x = rackPosition2[0]
	bottomPole.position.y = rackPosition2[1] + rackOffsetY*scale
	bottomPole.position.z =z0;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);
	}
	

/*балясины нижней площадки*/ 

if (bottomEnd != "нет"){
	var p0t = rackPosition0;
	p0t = newPoint_x(p0t, 40*scale, -turnAngleBottom);
	var p1t = rackPosition1;
	var balAmt = Math.round((p1t[0] - p0t[0])/(balDist[0]*scale))
	balDist[1] = (p1t[0] - p0t[0])/(balAmt + 1);
	var angle_1 = -turnAngleBottom;
	var insertPoint = newPoint_x(p0t, balDist[1], angle_1);
	insertPoint[1] += leftHeight/2*scale + rackOffsetY*scale
	var bal_1 = banister1;
	var bal_2 = banister2;
	var balAmt1 = 0;
	var balAmt2 = 0;	
	var balType = bal_2;
	for (i = 0; i < balAmt; i++) {
		if (balType == bal_1) {
			balType = bal_2;
			balAmt2 = balAmt2 + 1;
			}
		else {
			balType = bal_1;
			balAmt1 = balAmt1 + 1; 
			}
		drawBanister (balType, insertPoint, scale, railingMaterial, railingSection);
		insertPoint = newPoint_x(insertPoint, balDist[1], angle_1);
		}
	}	
	
/*балясины марша*/

	var balAmt = Math.round((p1[0] - p0[0])/(balDist[0]*scale))
	balDist[1] = (p1[0] - p0[0])/(balAmt + 1);
	var angle_1 = handrailAngle;
	var insertPoint = newPoint_x(p0, balDist[1], -angle_1);
	insertPoint[1] += leftHeight/2*scale + rackOffsetY*scale
	var bal_1 = banister1;
	var bal_2 = banister2;
	var balAmt1 = 0;
	var balAmt2 = 0;	
	var balType = bal_2;
	for (i = 0; i < balAmt; i++) {
		if (balType == bal_1) {
			balType = bal_2;
			balAmt2 = balAmt2 + 1;
			}
		else {
			balType = bal_1;
			balAmt1 = balAmt1 + 1; 
			}
		drawBanister (balType, insertPoint, scale, railingMaterial, railingSection);
		insertPoint = newPoint_x(insertPoint, balDist[1], -angle_1);
		}

/*балясины верхей площадки*/	

if (topEnd != "нет"){
	var p0t = p1;
	p0t = newPoint_x(p0t, 40*scale, 0);
	var p1t = p2;
	var balAmt = Math.round((p1t[0] - p0t[0])/(balDist[0]*scale))
	balDist[1] = (p1t[0] - p0t[0])/(balAmt + 1);
	var angle_1 = -turnAngleTop;
	var insertPoint = newPoint_x(p0t, balDist[1], angle_1);
	insertPoint[1] += leftHeight/2*scale + rackOffsetY*scale
	var bal_1 = banister1;
	var bal_2 = banister2;
	var balAmt1 = 0;
	var balAmt2 = 0;	
	var balType = bal_2;
	for (i = 0; i < balAmt; i++) {
		if (balType == bal_1) {
			balType = bal_2;
			balAmt2 = balAmt2 + 1;
			}
		else {
			balType = bal_1;
			balAmt1 = balAmt1 + 1; 
			}
		drawBanister (balType, insertPoint, scale, railingMaterial, railingSection);
		insertPoint = newPoint_x(insertPoint, balDist[1], angle_1);
		}
	}	
}

if(stairAmt == 0) {
var sectionLength = platformLengthBottom + platformLengthTop - 140;
var sectionAngle = Math.atan(3*h1 / sectionLength)
	/*первая стойка*/
	var x0 = (50 - platformLengthBottom) * scale;
	var y0 = - rackOffsetY*scale - h1*scale;
	var z0 = railingPositionZ*scale;
	var basePoint = [x0, y0, z0];
		drawForgedRack3d(basePoint, longRackLength, sectionAngle, railingMaterial, scale, railingSection)

var rackPosition0 = rackPosition[0]; //сохраняем координаты стойки площадки

/*средние стойки*/
	var middleRackAmt = Math.round(sectionLength/800);
		if (middleRackAmt < 0) middleRackAmt = 0;
		var p0 = basePoint;
		var rackDist = sectionLength/(middleRackAmt + 1)
		for (i = 0; i < middleRackAmt; i++) {
			p0 = newPoint_x(p0, rackDist*scale, -sectionAngle);
			drawForgedRack3d(p0, shortRackLength, sectionAngle, railingMaterial, scale, railingSection)
			}
/*последняя стойка*/
	p0 = newPoint_x(p0, rackDist*scale, -sectionAngle);
	drawForgedRack3d(p0, longRackLength, sectionAngle, railingMaterial, scale, railingSection)
	
/*нижняя перемычка*/
	var leftHeight = 20/Math.cos(sectionAngle);
	var poleLength = sectionLength;
	var bottomPoleShape = draw4angleShape (sectionAngle, sectionAngle, poleLength, leftHeight, scale)
	var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, forgingExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, railingMaterial);
	bottomPole.position.x = rackPosition0[0]
	bottomPole.position.y = rackPosition0[1] + rackOffsetY*scale
	bottomPole.position.z =z0;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);	

/*балясины*/

	var balAmt = Math.round((sectionLength-40)/balDist[0])
	//console.log(balAmt);
	balDist[1] = (sectionLength-40)/(balAmt + 1)*scale;
	var angle_1 = sectionAngle;
	p0 = newPoint_x(rackPosition0, 40*scale, -angle_1);
	p0[1] = p0[1] - 5*scale;
	p0[2] = z0 + 14*scale;
	var insertPoint = newPoint_x(p0, balDist[1], -angle_1);
	insertPoint[1] += leftHeight/2*scale + rackOffsetY*scale
	var bal_1 = banister1;
	var bal_2 = banister2;
	var balAmt1 = 0;
	var balAmt2 = 0;	
	var balType = bal_2;
	for (i = 0; i < balAmt; i++) {
		if (balType == bal_1) {
			balType = bal_2;
			balAmt2 = balAmt2 + 1;
			}
		else {
			balType = bal_1;
			balAmt1 = balAmt1 + 1; 
			}
		drawBanister (balType, insertPoint, scale, railingMaterial, railingSection);
		insertPoint = newPoint_x(insertPoint, balDist[1], -angle_1);
		}
		
	
	}
	
}//конец кованых ограждений


if (railingModel == "Деревянные балясины") {

drawTimberRailing();
}

function drawTimberRailing() {
		
var rackSize = params.rackSize;
railingPositionZ = 0;
balDist[0] = b1 / params.timberBalStep;


var angleBottom = 0;
var angleTop = handrailAngle;
var forgedRackProfile = 40;
var forgedRackLength = 900;
	var longRackLength = 900;
	var shortRackLength = rackOffsetY;

if (stairAmt != 0) {
/*нижняя площадка*/
	if (bottomEnd != "нет") {
		/*первый столб площадки*/
		var rack = drawLatheRack(rackSize);
		rack.position.x = 70 - platformLengthBottom;
		rack.position.y = - rackOffsetY;
		rack.position.z = railingPositionZ;
		railingSection.add(rack);
		var rackPosition0 = rack.position; //сохраняем координаты стойки площадки
		}

/*первый столб марша*/
	var rack = drawLatheRack(rackSize);
	rack.position.x = rackSize/2-10;
	rack.position.y = 0;
	rack.position.z = railingPositionZ;
	railingSection.add(rack);	
	var rackPosition1 = rack.position; //сохраняем координаты стойки

/*последний столб марша*/
	var rack = drawLatheRack(rackSize);
	rack.position.x = b1*stairAmt + 30;
	rack.position.y = h1*(stairAmt);
	rack.position.z = railingPositionZ * scale;
	railingSection.add(rack);	
	var rackPosition2 = rack.position; //сохраняем координаты стойки

	
/*верхняя площадка*/

if (topEnd == "площадка" || topEnd == "забег") {

	var rack = drawLatheRack(rackSize);
	rack.position.x = rackPosition2.x + platformLengthTop;
	rack.position.y = rackPosition2.y
	rack.position.z = railingPositionZ;
	railingSection.add(rack);	
	var rackPosition3 = rack.position; //сохраняем координаты стойки
	}
	


/*балясины нижней площадки*/

if (bottomEnd != "нет"){
	var p0t = rackPosition0;
	p0t = newPoint_x(p0t, 40*scale, -turnAngleBottom);
	var p1t = rackPosition1;
	var balAmt = Math.round((p1t[0] - p0t[0])/(balDist[0]*scale))
	balDist[1] = (p1t[0] - p0t[0])/(balAmt + 1);
	var angle_1 = -turnAngleBottom;
	var insertPoint = newPoint_x(p0t, balDist[1], angle_1);
	insertPoint[1] += leftHeight/2*scale + rackOffsetY*scale
	var bal_1 = banister1;
	var bal_2 = banister2;
	var balAmt1 = 0;
	var balAmt2 = 0;	
	var balType = bal_2;
	for (i = 0; i < balAmt; i++) {
		if (balType == bal_1) {
			balType = bal_2;
			balAmt2 = balAmt2 + 1;
			}
		else {
			balType = bal_1;
			balAmt1 = balAmt1 + 1; 
			}
		drawBanister (balType, insertPoint, scale, railingMaterial, railingSection);
		insertPoint = newPoint_x(insertPoint, balDist[1], angle_1);
		}
	}	
	
/*балясины марша*/
	var banisterLength = 700;
	var balAmt = Math.round((rackPosition2.x - rackPosition1.x)/(balDist[0]*scale))-1
	balDist[1] = (rackPosition2.x - rackPosition1.x)/(balAmt + 1);
	var angle_1 = handrailAngle;
	var insertPoint = newPoint_x_obj(rackPosition1, balDist[1], -angle_1);

	for (i = 0; i < balAmt; i++) {
		var banister = drawLatheBanister(banisterLength);
		banister.position.x = insertPoint.x;
		banister.position.y = insertPoint.y  + h1 - 20; //+ banisterLength/2
		banister.position.z = insertPoint.z;
		railingSection.add(banister);
		insertPoint = newPoint_x_obj(insertPoint, balDist[1], -angle_1);		
		}
		
	//проставки второй балясины
	if (params.model == "косоуры"){
	var balSize = params.banisterSize;
	var endPartHeight = h1 / params.timberBalStep
	var geom = new THREE.BoxGeometry( balSize, endPartHeight, balSize );
	var insertPoint = newPoint_x_obj(rackPosition1, balDist[1], -angle_1);
		for (i = 0; i < balAmt; i++) {
		var balPart = new THREE.Mesh(geom, timberMaterial);
		balPart.position.x = insertPoint.x;
		balPart.position.y = insertPoint.y  + h1 - 20; //+ banisterLength/2
		balPart.position.z = insertPoint.z;
		railingSection.add(balPart);
		insertPoint = newPoint_x_obj(insertPoint, balDist[1], -angle_1);		
		}
	}
		


/*балясины верхей площадки*	

if (topEnd != "нет"){
	var p0t = p1;
	p0t = newPoint_x(p0t, 40*scale, 0);
	var p1t = p2;
	var balAmt = Math.round((p1t[0] - p0t[0])/(balDist[0]*scale))
	balDist[1] = (p1t[0] - p0t[0])/(balAmt + 1);
	var angle_1 = -turnAngleTop;
	var insertPoint = newPoint_x(p0t, balDist[1], angle_1);
	insertPoint[1] += leftHeight/2*scale + rackOffsetY*scale
	var bal_1 = banister1;
	var bal_2 = banister2;
	var balAmt1 = 0;
	var balAmt2 = 0;	
	var balType = bal_2;
	for (i = 0; i < balAmt; i++) {
		if (balType == bal_1) {
			balType = bal_2;
			balAmt2 = balAmt2 + 1;
			}
		else {
			balType = bal_1;
			balAmt1 = balAmt1 + 1; 
			}
		drawBanister (balType, insertPoint, scale, railingMaterial, railingSection);
		insertPoint = newPoint_x(insertPoint, balDist[1], angle_1);
		}
	}	*/
}

if(stairAmt == 0) {
var sectionLength = platformLengthBottom + platformLengthTop - 140;
var sectionAngle = Math.atan(3*h1 / sectionLength)
	/*первая стойка*/
	var x0 = (50 - platformLengthBottom) * scale;
	var y0 = - rackOffsetY*scale - h1*scale;
	var z0 = railingPositionZ*scale;
	var basePoint = [x0, y0, z0];
		drawForgedRack3d(basePoint, longRackLength, sectionAngle, railingMaterial, scale, railingSection)

var rackPosition0 = rackPosition[0]; //сохраняем координаты стойки площадки

/*средние стойки*/
	var middleRackAmt = Math.round(sectionLength/800);
		if (middleRackAmt < 0) middleRackAmt = 0;
		var p0 = basePoint;
		var rackDist = sectionLength/(middleRackAmt + 1)
		for (i = 0; i < middleRackAmt; i++) {
			p0 = newPoint_x(p0, rackDist*scale, -sectionAngle);
			drawForgedRack3d(p0, shortRackLength, sectionAngle, railingMaterial, scale, railingSection)
			}
/*последняя стойка*/
	p0 = newPoint_x(p0, rackDist*scale, -sectionAngle);
	drawForgedRack3d(p0, longRackLength, sectionAngle, railingMaterial, scale, railingSection)
	
/*нижняя перемычка*/
	var leftHeight = 20/Math.cos(sectionAngle);
	var poleLength = sectionLength;
	var bottomPoleShape = draw4angleShape (sectionAngle, sectionAngle, poleLength, leftHeight, scale)
	var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, forgingExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, railingMaterial);
	bottomPole.position.x = rackPosition0[0]
	bottomPole.position.y = rackPosition0[1] + rackOffsetY*scale
	bottomPole.position.z =z0;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);	

/*балясины*/

	var balAmt = Math.round((sectionLength-40)/balDist[0])
	//console.log(balAmt);
	balDist[1] = (sectionLength-40)/(balAmt + 1)*scale;
	var angle_1 = sectionAngle;
	p0 = newPoint_x(rackPosition0, 40*scale, -angle_1);
	p0[1] = p0[1] - 5*scale;
	p0[2] = z0 + 14*scale;
	var insertPoint = newPoint_x(p0, balDist[1], -angle_1);
	insertPoint[1] += leftHeight/2*scale + rackOffsetY*scale
	var bal_1 = banister1;
	var bal_2 = banister2;
	var balAmt1 = 0;
	var balAmt2 = 0;	
	var balType = bal_2;
	for (i = 0; i < balAmt; i++) {
		if (balType == bal_1) {
			balType = bal_2;
			balAmt2 = balAmt2 + 1;
			}
		else {
			balType = bal_1;
			balAmt1 = balAmt1 + 1; 
			}
		drawBanister (balType, insertPoint, scale, railingMaterial, railingSection);
		insertPoint = newPoint_x(insertPoint, balDist[1], -angle_1);
		}
		
	
	}
	
}//конец деревянных балясин

/* поручень */

if(handrail !="нет") {
drawHandrail();
}

function drawHandrail() {
var banisterLength = 700;

/*параметры поручня в зависимости от модели*/

	var handrailMaterial = railingMaterial;
	var handrailProfileY = 40;
	var handrailProfileZ = 60;
	
	if(handrail == "40х20 черн.") {
		handrailModel = "rect";
		handrailProfileY = 20;
		handrailProfileZ = 40;
		}				
	if(handrail == "40х40 черн.") {
		handrailModel = "rect";
		handrailProfileY = 40;
		handrailProfileZ = 40;
		}
	if(handrail == "60х30 черн.") {
		handrailModel = "rect";
		handrailProfileY = 30;
		handrailProfileZ = 60;
		}
	if(handrail == "кованый полукруглый") {
		handrailModel = "rect";
		handrailProfileY = 30;
		handrailProfileZ = 50;
		}
	if(handrail == "40х40 нерж.") {
		handrailModel = "rect";
		handrailProfileY = 40;
		handrailProfileZ = 40;
		}
	if(handrail == "Ф50 нерж.") {
		handrailModel = "round";
		handrailProfileY = 50;
		handrailProfileZ = 50;
		}		
	if(handrail == "Ф50 сосна") {
		handrailModel = "round";
		handrailProfileY = 50;
		handrailProfileZ = 50;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "омега-образный сосна") {
		handrailModel = "omega";
		handrailProfileY = 55;
		handrailProfileZ = 75;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "50х50 сосна") {
		handrailModel = "rect";
		handrailProfileY = 60;
		handrailProfileZ = 40;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "40х60 береза") {
		handrailModel = "rect";
		handrailProfileY = 60;
		handrailProfileZ = 40;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "омега-образный дуб") {
		handrailModel = "omega";
		handrailProfileY = 55;
		handrailProfileZ = 75;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "40х60 дуб") {
		handrailModel = "rect";
		handrailProfileY = 60;
		handrailProfileZ = 40;
		handrailMaterial = timberMaterial;
		}	
	if(handrail == "40х60 дуб с пазом") {
		handrailModel = "rect";
		handrailProfileY = 60;
		handrailProfileZ = 40;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "Ф50 нерж. с пазом") {
		handrailModel = "round";
		handrailProfileY = 50;
		handrailProfileZ = 50;
		}
	if(handrail == "40х60 нерж. с пазом") {
		handrailModel = "rect";
		handrailProfileY = 40;
		handrailProfileZ = 60;
		}	

if (railingModel != "Самонесущее стекло") {
	if (railingModel == "Деревянные балясины") {
		handrailModel = "rect";
		handrailMaterial = timberMaterial;
		}

if(stairAmt != 0) {		
/*поручень нижней площадки*/

	if (bottomEnd == "площадка") {
		basePoint[0] = - platformLengthBottom * scale - (handrailProfileZ+40)/2*scale;
		basePoint[1] = - rackOffsetY*scale + rackLength*scale;
		basePoint[2] = railingPositionZ*scale + 20*scale - handrailProfileZ/2*scale;
		handrailLength = platformLengthBottom + b1/2 + handrailProfileZ/2;
		drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint, handrailLength, 0, handrailMaterial, scale, railingSection);
		}
	if (bottomEnd == "забег") {
		var turnAngleBottom = Math.atan( (rackPosition1[1] - rackPosition0[1])/(rackPosition1[0] - rackPosition0[0]))
		if (!bottomConnection){
			basePoint[0] = - platformLengthBottom * scale - (handrailProfileZ+40)/2*scale;
			basePoint[1] = - rackOffsetY*scale + rackLength*scale - h1*scale;
			basePoint[2] = railingPositionZ*scale + 20*scale - handrailProfileZ/2*scale;
			var deltaY = (rackPosition0[0] - basePoint[0])*Math.tan(turnAngleBottom);
			basePoint[1] = basePoint[1] - deltaY;
			}
		if (bottomConnection) {
			basePoint[0] = - platformLengthBottom * scale + 70*scale;
			basePoint[1] = - rackOffsetY*scale + rackLength*scale - h1*scale;
			basePoint[2] = railingPositionZ*scale + 20*scale - handrailProfileZ/2*scale;
			var basePoint1 = [];
			basePoint1[0] = - platformLengthBottom * scale;
			basePoint1[1] = - rackOffsetY*scale + rackLength*scale - h1*scale;
			basePoint1[2] = railingPositionZ*scale + 20*scale - handrailProfileZ/2*scale;
			drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint1, 70, 0, handrailMaterial, scale, railingSection);
			}
		handrailLength = (rackPosition1[0] - basePoint[0])/ scale / Math.cos(turnAngleBottom);
		drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint, handrailLength, turnAngleBottom, handrailMaterial, scale, railingSection);
		}
 
/*поручень марша*/
 
	var stepLength = h1/Math.sin(handrailAngle);
	var handrailLength = stepLength * stairAmt//- 1/3*stepLength;
	if (topEnd == "площадка") handrailLength = handrailLength - 1/3*stepLength;
	if (topEnd == "забег") handrailLength = handrailLength - 1/3*stepLength;
	if (railingModel == "Самонесущее стекло") handrailLength = stepLength * stairAmt + 0.2*stepLength;
	if (bottomEnd == "забег") handrailLength = handrailLength - 1/3*stepLength;
	
	x0 = b1/2 * scale;
	y0 = h1 + banisterLength + 30; //rackOffsetY*scale + rackLength*scale;
	z0 = railingPositionZ*scale - handrailProfileZ/2*scale;
	basePoint = [x0, y0, z0];

	
if (bottomEnd != "забег") basePoint = newPoint_x_obj(basePoint, -b1/3*scale, -handrailAngle)
	
	var handrail = drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint, handrailLength, handrailAngle, handrailMaterial, scale, railingSection);
/*
	handrail.position.x = 0;
	handrail.position.y = 1000;
	handrail.position.z = 0;
*/
	
	railingSection.add(handrail);
	
	/*поручень верхней площадки*/
	
	if (topEnd == "площадка") {
		basePoint[0] = b1*(stairAmt-0.5)*scale;
		basePoint[1] = h1*stairAmt*scale - rackOffsetY*scale + rackLength*scale;
		basePoint[2] = z0;
		handrailLength = platformLengthTop - b1/2;
		drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint, handrailLength, 0, handrailMaterial, scale, railingSection);
		}
	if (topEnd == "забег") {
		basePoint[0] = b1*(stairAmt-0.5)*scale;
		basePoint[1] = h1*stairAmt*scale - rackOffsetY*scale + rackLength*scale;//rackPosition2[1];// + rackLength*scale;
		basePoint[2] = z0; 
		handrailLength = (platformLengthTop - b1/2)/Math.cos(turnAngleTop);
		if (topConnection) handrailLength = handrailLength - 70/Math.cos(turnAngleTop);
		drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint, handrailLength, turnAngleTop, handrailMaterial, scale, railingSection);
		if (topConnection) {
			/*basePoint = rackPosition3;
			basePoint[1] = rackPosition3[1] + rackLength*scale;
			basePoint[2] = z0; */
			var basePoint1 = newPoint_x(basePoint, handrailLength * Math.cos(turnAngleTop)*scale, -turnAngleTop);
			//console.log(basePoint1);
			handrailLength = 70 + (handrailProfileZ + 40)/2;
			drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint1, handrailLength, 0, handrailMaterial, scale, railingSection);
			} 
		
		}
}
if(stairAmt == 0) {	 
	var handrailLength = sectionLength / Math.cos(sectionAngle);
	if (!bottomConnection) handrailLength = handrailLength + 70 / Math.cos(sectionAngle);
	if (!topConnection) handrailLength = handrailLength + 70 / Math.cos(sectionAngle);	
	x0 = rackPosition0[0];
	y0 = -h1*scale - rackOffsetY*scale + rackLength*scale;
	z0 = railingPositionZ*scale + 20*scale - handrailProfileZ/2*scale;
	basePoint = [x0, y0, z0];
	if (!bottomConnection) basePoint = newPoint_x(basePoint, -70*scale, - sectionAngle);
	//if (railingModel == "Кованые балясины") basePoint = newPoint_x(basePoint, 20*scale, -sectionAngle)
	drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint, handrailLength, sectionAngle, handrailMaterial, scale, railingSection);

	if (topConnection) {
		var basePoint1 = newPoint_x(basePoint, handrailLength * Math.cos(sectionAngle)*scale, -sectionAngle);
		var handrailLength1 = 70 + (handrailProfileZ + 40)/2;
		if (railingModel == "Кованые балясины") handrailLength1 += 20;
		drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint1, handrailLength1, 0, handrailMaterial, scale, railingSection);
		}
	if (bottomConnection) {
		basePoint = newPoint_x(basePoint, -70*scale, 0);
		drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint, 70, 0, handrailMaterial, scale, railingSection);
		}

}
}
if (railingModel == "Самонесущее стекло") {


z0 = z0 - (-6 + handrailProfileZ/2)*scale 

	var handrailExtrudeOptions = {
		amount: handrailProfileZ*scale,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};

if(stairAmt != 0) {			
/* поручень нижней площадки*/

if (bottomEnd != "нет"){
	var leftHeight = handrailProfileY/Math.cos(turnAngleBottom);
	var poleLength = glassSectionLength1;
	var deltaY = handrailProfileY / Math.cos(handrailAngle) -  handrailProfileY / Math.cos(turnAngleBottom)
	x0 = 0 - glassSectionLength1*scale;
	y0 = (glassHeight - rackOffsetY-20 + deltaY)*scale - glassSectionLength1 * Math.tan(turnAngleBottom)*scale;
	var bottomPoleShape = draw4angleShape (turnAngleBottom, turnAngleBottom, poleLength, leftHeight, scale)
	var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, handrailExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, handrailMaterial);
	bottomPole.position.x = x0;
	bottomPole.position.y = y0;
	bottomPole.position.z =z0;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);
	}

/* поручень марша*/

	var leftHeight = handrailProfileY/Math.cos(handrailAngle);
	var poleLength = glassSectionLength2
	var bottomPoleShape = draw4angleShape (handrailAngle, handrailAngle, poleLength, leftHeight, scale)
	var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, handrailExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, handrailMaterial);
	bottomPole.position.x = 0;
	bottomPole.position.y = (glassHeight - rackOffsetY - 20)*scale
	bottomPole.position.z =z0;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);
	
	basePoint[0] = bottomPole.position.x + glassSectionLength2 *scale;
	basePoint[1] = bottomPole.position.y + glassSectionLength2 * Math.tan(handrailAngle)*scale;

/*поручень верхней площадки*/

if (topEnd != "нет"){
	var leftHeight = handrailProfileY/Math.cos(turnAngleTop);
	var poleLength = glassSectionLength3
	var deltaY = handrailProfileY / Math.cos(handrailAngle) -  handrailProfileY / Math.cos(turnAngleTop)
	var bottomPoleShape = draw4angleShape (turnAngleTop, turnAngleTop, poleLength, leftHeight, scale)
	var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, handrailExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, handrailMaterial);
	bottomPole.position.x = basePoint[0]
	bottomPole.position.y = basePoint[1] + deltaY*scale
	bottomPole.position.z =z0;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);
	}


}
if(stairAmt == 0) {	
	var leftHeight = handrailProfileY/Math.cos(glassAngle);
	var poleLength = glassSectionLength0;
	x0 = -platformLengthBottom*scale + glassDist*scale;
	if (bottomConnection) x0 = x0 - glassOffset *scale;
	y0 = (glassHeight - rackOffsetY - h1)*scale
	var bottomPoleShape = draw4angleShape (glassAngle, glassAngle, poleLength, leftHeight, scale)
	var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, handrailExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, handrailMaterial);
	bottomPole.position.x = x0;
	bottomPole.position.y = y0;
	bottomPole.position.z =z0;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);
	}
}
	
	}; //конец поручня
	
	return (railingSection)

} //end of drawRailingSection();






function drawRailingSectionPlatform(
			platformLength, offsetLeft, offsetRight,
			handrailOffsetLeft, handrailOffsetRight, railingSide, 
			scale) {

var railingSection = new THREE.Object3D();
var rackOffsetY = 150;
var rackLength = 900;
var railingPositionZ = -40;
if (turnFactor == -1) railingPositionZ = 0;
var basePoint = [];
if (turnFactor == -1) {
	var railingSideTemp = railingSide
	if (railingSideTemp == "left") railingSide = "right"
	if (railingSideTemp == "right") railingSide = "left"
	}
	
/*материалы*/
var timberMaterial = new THREE.MeshLambertMaterial( { color: 0x804000, overdraw: 0.5} );
var railingMaterial =  new THREE.MeshLambertMaterial({color: 0xD0D0D0, wireframe: false});
var glassMaterial =  new THREE.MeshLambertMaterial({opacity:0.6, color: 0x3AE2CE, transparent:true});
var glassThickness = 8;
if (railingModel == "Самонесущее стекло") glassThickness = 12;
var handrailAngle = 0;
var glassExtrudeOptions = {
	amount: glassThickness*scale,
	bevelEnabled: false,
	curveSegments: 12,
	steps: 1
	};
var forgingExtrudeOptions = {
	amount: 40*scale,
	bevelEnabled: false,
	curveSegments: 12,
	steps: 1
	};

/* —“ќ… » */


if (railingModel == "Ригели" || railingModel == "Стекло на стойках") {

rackPosition = [];
rackNuber = 0;

var sectionLength = platformLength - offsetLeft - offsetRight - 40

/*первая стойка*/
	var x0 = offsetLeft * scale + 20*scale;
	var y0 = - rackOffsetY*scale;
	var z0 = railingPositionZ*scale;
	var basePoint = [x0, y0, z0];
	drawRack3d(basePoint, rackLength, handrailAngle, railingMaterial, scale, railingSection)	
	var rackPosition1 = basePoint; //сохраняем координаты стойки марша

/*средние стойки*/
	var middleRackAmt = Math.round(sectionLength/800)-1;
	if (middleRackAmt < 0) middleRackAmt = 0;
	
	var p0 = basePoint;
	var rackDist = sectionLength/(middleRackAmt + 1)
	for (i = 0; i < middleRackAmt+1; i++) {
		p0 = newPoint_x(p0, rackDist*scale, 0);
		drawRack3d(p0, rackLength, handrailAngle, railingMaterial, scale, railingSection)
		}			
	var rackPosition2 = p0; //сохраняем координаты стойки марша
}


/* ригели */


if (railingModel == "Ригели") {
 
	//var rigelMaterial = railingMaterial;
	var rigelProfileY = 20;
	var rigelProfileZ = 20;
	
	if(rigelMaterial == "20х20 черн.") {
		rigelModel = "rect";
		rigelProfileY = 20;
		rigelProfileZ = 20;
		}
	if(rigelMaterial == "Ф12 нерж.") {
		rigelModel = "round";
		rigelProfileY = 12;
		rigelProfileZ = 12;
		}
	if(rigelMaterial == "Ф16 нерж.") {
		rigelModel = "round";
		rigelProfileY = 16;
		rigelProfileZ = 16;
		}

	var x0 = (offsetLeft - 30) * scale;
	var y0 = 0;
	var rigelLength = platformLength - offsetLeft - offsetRight + 60;
	if (railingSide == "left") z0 = railingPositionZ*scale + 40*scale;
	if (railingSide == "right") z0 = railingPositionZ*scale - rigelProfileZ*scale;
	rigelAmt = Number(rigelAmt);
	var rigelDist = (rackLength-rackOffsetY)/(rigelAmt+1);
	for (var i=1; i < rigelAmt+1; i++) {
		y0 = rigelDist*i*scale// + rackOffsetY*scale;
		basePoint = [x0, y0, z0];
		drawPole3D(rigelModel, rigelProfileY, rigelProfileZ, basePoint, rigelLength, 0, railingMaterial, scale, railingSection);
		}
}

/* стекла на стойках */

if (railingModel == "Стекло на стойках") {
var glassDist = 60;
var glassHeight = 600;
for (i=0; i<rackPosition.length-1; i++) {
	if (rackPosition[i][1] == rackPosition[i+1][1]) 
		var glassShape = drawGlassShape (rackPosition[i], rackPosition[i+1], 0, glassDist, glassHeight, scale);
	else
		var glassShape = drawGlassShape (rackPosition[i], rackPosition[i+1], handrailAngle, glassDist, glassHeight, scale);
	var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	
	var glass = new THREE.Mesh(geom, glassMaterial);
	glass.position.x = rackPosition[i][0] + 30*scale;
	glass.position.y = rackPosition[i][1] + 230*scale;
	glass.position.z = railingPositionZ*scale + 16*scale;
	
	glass.castShadow = true;
	railingSection.add(glass);

	}
	
} //конец стекол на стойках


/* —јћќЌ?—”ў?? —“? Ћќ */

if (railingModel == "Самонесущее стекло") {

	var glassDist = 10; //зазор между стеклами
	var glassOffset = 15; //зазор от стекла до торца ступени
	var glassHeight = 1030;
	if (glassHandrail == "сбоку") glassHeight = 1100;
	if (railingSide == "right") z0 = glassOffset*scale;
	if (railingSide == "left") z0 = (0 - glassOffset - glassThickness)*scale;
	var sectionLength = platformLength;
	var glassAngle = 0
	var glassAmt_1 = Math.round(sectionLength/800);
	var glassLengthX = sectionLength/glassAmt_1;
	var p1 = [0, 0];
	var p2 = [glassLengthX * scale, 0];
	var rackPosition0 = p1;
	var rackPosition1 = p2;
	x0 = glassDist*scale;
	y0 = - rackOffsetY*scale;
	
	for (i=0; i<glassAmt_1; i++) {
		var glassShape = drawGlassShape (p1, p2, glassAngle, glassDist, glassHeight, scale);
		var geom = new THREE.ExtrudeGeometry(glassShape, glassExtrudeOptions);
		geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));		
		var glass = new THREE.Mesh(geom, glassMaterial);
		glass.position.x = x0 + glassLengthX * scale * i;
		glass.position.y = y0 
		glass.position.z = z0;
		glass.castShadow = true;
		railingSection.add(glass);
		}
	
	basePoint[0] = glass.position.x + glassLengthX * scale;
	basePoint[1] = glass.position.y + glassLengthX*scale * Math.tan(handrailAngle);
	basePoint[2] = glass.position.z	
	}// конец самонесущего стекла
	
	/*  ковка */


if (railingModel == "Кованые балясины") {

rackPosition = [];
rackNuber = 0;

var angleBottom = 0;
var angleTop = 0;
var forgedRackProfile = 40;
var forgedRackLength = 900;
var longRackLength = 900;
var shortRackLength = rackOffsetY;
var sectionLength = platformLength - offsetLeft - offsetRight - 40

/*первая стойка площадки*/
	var x0 = offsetLeft * scale;
	var y0 = - rackOffsetY*scale;
	var z0 = railingPositionZ*scale;
	var basePoint = [x0, y0, z0];
	drawForgedRack3d(basePoint, longRackLength, 0, railingMaterial, scale, railingSection)
	var rackPosition0 = basePoint; //сохраняем координаты стойки марша
 
 	var middleRackAmt = Math.round(platformLength/800)-1;
	if (middleRackAmt < 0) middleRackAmt = 0;
	
	var p0 = basePoint;
	var rackDist = (platformLength - offsetLeft - offsetRight - 40)/(middleRackAmt + 1)
	for (i = 0; i < middleRackAmt; i++) {
		p0 = newPoint_x(p0, rackDist*scale, 0);
		drawForgedRack3d(p0, shortRackLength, 0, railingMaterial, scale, railingSection)
		}
/*последняя стойка*/
	p0 = newPoint_x(p0, rackDist*scale, 0);
	drawForgedRack3d(p0, longRackLength, 0, railingMaterial, scale, railingSection)		
	var rackPosition1 = p0; //сохраняем координаты стойки марша
	
	
/*нижняя перемычка*/

	var leftHeight = 20;
	var poleLength = sectionLength - 40;
	var bottomPoleShape = draw4angleShape (0, 0, poleLength, leftHeight, scale)
	var bottomPoleGeom = new THREE.ExtrudeGeometry(bottomPoleShape, forgingExtrudeOptions);
	bottomPoleGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var bottomPole = new THREE.Mesh(bottomPoleGeom, railingMaterial);
	bottomPole.position.x = rackPosition0[0] + 40*scale
	bottomPole.position.y = rackPosition0[1] + rackOffsetY*scale
	bottomPole.position.z =z0;
	bottomPole.castShadow = true;
	railingSection.add(bottomPole);
	

/*балясины*/ 

	var p0t = rackPosition0;
	p0t = newPoint_x(p0t, 40*scale, 0); 
	var p1t = rackPosition1;
	var balAmt = Math.round((p1t[0] - p0t[0])/(balDist[0]*scale))
	balDist[1] = (p1t[0] - p0t[0])/(balAmt + 1);
	var angle_1 = 0;
	var insertPoint = newPoint_x(p0t, balDist[1], angle_1);
	insertPoint[1] += leftHeight/2*scale + rackOffsetY*scale
	var bal_1 = banister1;
	var bal_2 = banister2;
	var balAmt1 = 0;
	var balAmt2 = 0;	
	var balType = bal_2;
	for (i = 0; i < balAmt; i++) {
		if (balType == bal_1) {
			balType = bal_2;
			balAmt2 = balAmt2 + 1;
			}
		else {
			balType = bal_1;
			balAmt1 = balAmt1 + 1; 
			}
		drawBanister (balType, insertPoint, scale, railingMaterial, railingSection);
		insertPoint = newPoint_x(insertPoint, balDist[1], angle_1);
		}

	
}//конец кованых ограждений

/* ѕќ–”„?Ќ№ */

if(handrail !="нет") {
	
/*параметры поручня в зависимости от модели*/

	var handrailMaterial = railingMaterial;
	var handrailProfileY = 40;
	var handrailProfileZ = 60;
	
	if(handrail == "40х20 черн.") {
		handrailModel = "rect";
		handrailProfileY = 20;
		handrailProfileZ = 40;
		}				
	if(handrail == "40х40 черн.") {
		handrailModel = "rect";
		handrailProfileY = 40;
		handrailProfileZ = 40;
		}
	if(handrail == "60х30 черн.") {
		handrailModel = "rect";
		handrailProfileY = 30;
		handrailProfileZ = 60;
		}
	if(handrail == "кованый полукруглый") {
		handrailModel = "rect";
		handrailProfileY = 30;
		handrailProfileZ = 50;
		}
	if(handrail == "40х40 нерж.") {
		handrailModel = "rect";
		handrailProfileY = 40;
		handrailProfileZ = 40;
		}
	if(handrail == "Ф50 нерж.") {
		handrailModel = "round";
		handrailProfileY = 50;
		handrailProfileZ = 50;
		}		
	if(handrail == "Ф50 сосна") {
		handrailModel = "round";
		handrailProfileY = 50;
		handrailProfileZ = 50;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "омега-образный сосна") {
		handrailModel = "omega";
		handrailProfileY = 55;
		handrailProfileZ = 75;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "50х50 сосна") {
		handrailModel = "rect";
		handrailProfileY = 60;
		handrailProfileZ = 40;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "40х60 береза") {
		handrailModel = "rect";
		handrailProfileY = 60;
		handrailProfileZ = 40;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "омега-образный дуб") {
		handrailModel = "omega";
		handrailProfileY = 55;
		handrailProfileZ = 75;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "40х60 дуб") {
		handrailModel = "rect";
		handrailProfileY = 60;
		handrailProfileZ = 40;
		handrailMaterial = timberMaterial;
		}	
	if(handrail == "40х60 дуб с пазом") {
		handrailModel = "rect";
		handrailProfileY = 60;
		handrailProfileZ = 40;
		handrailMaterial = timberMaterial;
		}
	if(handrail == "Ф50 нерж. с пазом") {
		handrailModel = "round";
		handrailProfileY = 50;
		handrailProfileZ = 50;
		}
	if(handrail == "40х60 нерж. с пазом") {
		handrailModel = "rect";
		handrailProfileY = 40;
		handrailProfileZ = 60;
		}	


if (railingModel != "Самонесущее стекло") {
	var handrailLength = sectionLength + handrailOffsetLeft + handrailOffsetRight + 40;
	basePoint[0] = (offsetLeft - handrailOffsetLeft)*scale;
	basePoint[1] = - rackOffsetY*scale + rackLength*scale;
	basePoint[2] = railingPositionZ*scale - (handrailProfileZ-40)/2*scale;
	drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint, handrailLength, 0, handrailMaterial, scale, railingSection);
	}

if (railingModel == "Самонесущее стекло") {
	var handrailLength = sectionLength// + handrailOffsetLeft + handrailOffsetRight + 40;
	basePoint[0] = 0;
	basePoint[1] =  (glassHeight - rackOffsetY)*scale;
	basePoint[2] = railingPositionZ*scale - (handrailProfileZ-40)/2*scale;
	drawPole3D(handrailModel, handrailProfileY, handrailProfileZ, basePoint, handrailLength, 0, handrailMaterial, scale, railingSection);
	//console.log(basePoint)
	}
	
	}; //конец поручня

	
	
	return (railingSection)
	
}// end of drawRailingSectionPlatform







/***   ¬Ќ”“–?ЌЌ»? ‘”Ќ ?»»   ***/

/*стойка 40х40 с кронштейном поручня*/

function drawRack3d(basePoint, rackLength, handrailAngle, rackMaterial, scale, railingSection){

//тело стойки
var rackProfile = 40;
var handrailHolderLength = 70;
var rackGeometry = new THREE.BoxGeometry( rackProfile * scale, (rackLength - handrailHolderLength) * scale, rackProfile * scale );
var rack = new THREE.Mesh( rackGeometry, rackMaterial);
rack.position.x = basePoint[0];
rack.position.y = basePoint[1] + (rackLength-handrailHolderLength)/2*scale;
rack.position.z = basePoint[2] + rackProfile /2 * scale;	
rack.castShadow = true;
railingSection.add( rack );

//кронштейн поручня
var handrailHolderRadius = 6;

var radiusTop = handrailHolderRadius*scale
var radiusBottom = handrailHolderRadius*scale; 
var height = handrailHolderLength*scale;
var segmentsX = 20 
var segmentsY = 0 
var openEnded = false;


var handrailHolderGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segmentsX, segmentsY, openEnded);
var handrailHolder = new THREE.Mesh( handrailHolderGeometry, rackMaterial);
handrailHolder.position.x = basePoint[0] //+ handrailHolderProfile /2 * scale;
handrailHolder.position.y = basePoint[1] + (rackLength - handrailHolderLength/2)*scale;
handrailHolder.position.z = basePoint[2] + rackProfile /2 * scale;	
handrailHolder.castShadow = true;
railingSection.add( handrailHolder );
////stairCase.push(handrailHolder);


/*сохраняем координаты в массив*/
rackPosition[rackNuber] = [basePoint[0], basePoint[1]]
rackNuber += 1;

}

/*стойка кованой сеции*/

function drawForgedRack3d(basePoint, rackLength, handrailAngle, rackMaterial, scale, railingSection) {
	var angleBottom = 0;
	var angleTop = handrailAngle;
	var forgedRackProfile = 40;
	var forgingExtrudeOptions = {
		amount: 40*scale,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};

	var rackShape = draw4angleShape (angleBottom, angleTop, forgedRackProfile, rackLength, scale)
	var geom = new THREE.ExtrudeGeometry(rackShape, forgingExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));	
	var forgedRack = new THREE.Mesh(geom, rackMaterial);
	forgedRack.position.x = basePoint[0];
	forgedRack.position.y = basePoint[1];
	forgedRack.position.z = basePoint[2];
	forgedRack.castShadow = true;
	railingSection.add(forgedRack);
	
	/*сохраняем координаты в массив*/
	rackPosition[rackNuber] = [basePoint[0], basePoint[1]]
	rackNuber += 1;	
}

/*палка в 3D*/


function drawPole3D(poleType, poleProfileY, poleProfileZ, basePoint, length, poleAngle, poleMaterial, scale, railingSection){


/*прямоугольная палка*/
if (poleType != "round") {

	var poleGeometry = new THREE.BoxGeometry( length * scale, poleProfileY * scale, poleProfileZ * scale );
	var pole = new THREE.Mesh( poleGeometry, poleMaterial);
	pole.rotation.z = poleAngle;
	pole.position.x = basePoint[0] + (length/2*Math.cos(poleAngle) - poleProfileY/2 * Math.sin(poleAngle)) * scale;
	pole.position.y = basePoint[1] + (length/2*Math.sin(poleAngle) + poleProfileY/2 * Math.cos(poleAngle)) * scale;
	pole.position.z = basePoint[2] + poleProfileZ /2 * scale;	
	pole.castShadow = true;
	railingSection.add( pole );
	////stairCase.push(pole);
	}
/*круглая палка*/
if (poleType == "round") {
	var poleRadius = poleProfileY/2;
	var radiusTop = poleRadius*scale
	var radiusBottom = poleRadius*scale; 
	var height = length*scale;
	var segmentsX = 20 
	var segmentsY = 0 
	var openEnded = false;


	var poleGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segmentsX, segmentsY, openEnded);
	var pole = new THREE.Mesh( poleGeometry, poleMaterial);
	pole.rotation.z = poleAngle-Math.PI/2;
	pole.position.x = basePoint[0] + (length/2*Math.cos(poleAngle) - poleRadius/2 * Math.sin(poleAngle)) * scale;
	pole.position.y = basePoint[1] + (length/2*Math.sin(poleAngle) + poleRadius/2 * Math.cos(poleAngle)) * scale;
	pole.position.z = basePoint[2] + poleRadius * scale;	
	pole.castShadow = true;
	railingSection.add( pole );
	//stairCase.push(pole);
	
	}
	return pole;

}


/*стекло в форме параллелограмма*/


function drawGlassShape(p1, p2, angle, glassDist, glassHeight, scale) {
var glassHeight1 = glassHeight*scale;
var glassHeight2 = glassHeight1 + (p2[1]-p1[1]) - glassDist*scale * Math.tan(angle);
var glassWidth = p2[0] - p1[0] - glassDist*scale;

var glassShape = new THREE.Shape();
	glassShape.moveTo(0, 0);
	var x = 0;
	var y = glassHeight1;
	glassShape.lineTo(x, y);
	x = glassWidth;
	y = glassHeight2;
	glassShape.lineTo(x, y);
	x = glassWidth;
	y = glassHeight2-glassHeight1;
	glassShape.lineTo(x, y);
	glassShape.lineTo(0, 0);
	
	return glassShape;
}


/*параллелограмм*/

function draw4angleShape(angleBottom, angleTop, width, leftHeight, scale) {
var glassShape = new THREE.Shape();
	glassShape.moveTo(0, 0);	
	var x = 0;
	var y = leftHeight * scale;
	glassShape.lineTo(x, y);
	x = width * scale;
	y = y + width * Math.tan(angleTop) * scale;
	glassShape.lineTo(x, y);
	x = x;
	y = width * Math.tan(angleBottom) * scale;
	glassShape.lineTo(x, y);
	glassShape.lineTo(0, 0);	
	return glassShape;
}



/*кованая балясина*/


function drawBanister(type, basePoint, scale, railingMaterial, railingSection) {

	var testValue = getInputValue("testValue")
	var banisterLength = 750;
	var poleSize = 12
		
	var banisterExtrudeOptions = {
		amount: 12*scale,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};

if (type == "bal_1" || type == "bal_3" ) {
	//шишка
	var bulbGeometry = new THREE.OctahedronGeometry(25*scale, 0);
	var bulb = new THREE.Mesh( bulbGeometry, railingMaterial);
	bulb.rotation.y = Math.PI/4;
	bulb.position.x = basePoint[0];
	bulb.position.y = basePoint[1] + banisterLength/2*scale;
	bulb.position.z = basePoint[2] + poleSize/2*scale;
	bulb.castShadow = true;
	railingSection.add(bulb);
	//stairCase.push(bulb); 
	
	//палка
	var poleGeometry = new THREE.BoxGeometry( poleSize * scale, banisterLength * scale, poleSize * scale );
	var pole = new THREE.Mesh( poleGeometry, railingMaterial);
	pole.position.x = basePoint[0];
	pole.position.y = basePoint[1] + banisterLength/2 * scale;
	pole.position.z = basePoint[2] + poleSize/2*scale;	
	pole.castShadow = true;
	railingSection.add( pole );
	//stairCase.push(pole);
	}
	
if (type == "bal_2" || type == "bal_4" ) {
	//шишка
	var bulbGeometry = new THREE.OctahedronGeometry(25*scale, 0);
	var bulb = new THREE.Mesh( bulbGeometry, railingMaterial);
	bulb.rotation.y = Math.PI/4;
	bulb.position.x = basePoint[0];
	bulb.position.y = basePoint[1] + banisterLength/3*scale;
	bulb.position.z = basePoint[2] + poleSize/2*scale;
	bulb.castShadow = true;
	railingSection.add(bulb);
	//stairCase.push(bulb); 
	
	var bulb = new THREE.Mesh( bulbGeometry, railingMaterial);
	bulb.rotation.y = Math.PI/4;
	bulb.position.x = basePoint[0];
	bulb.position.y = basePoint[1] + banisterLength*2/3*scale;
	bulb.position.z = basePoint[2] + poleSize/2*scale;
	bulb.castShadow = true;
	railingSection.add(bulb);
	//stairCase.push(bulb);
	
	//палка
	var poleGeometry = new THREE.BoxGeometry( poleSize * scale, banisterLength * scale, poleSize * scale );
	var pole = new THREE.Mesh( poleGeometry, railingMaterial);
	pole.position.x = basePoint[0];
	pole.position.y = basePoint[1] + banisterLength/2 * scale;
	pole.position.z = basePoint[2] + poleSize/2*scale;	
	pole.castShadow = true;
	railingSection.add( pole );
	//stairCase.push(pole);
	}
		
if (type == "bal_5" || type == "bal_9") {
var rad1 = 40;
var rad2 = 50;
var height1 = banisterLength/2 - rad2*2 


var banisterPart1 = new THREE.Shape();
	banisterPart1.moveTo(0, 0);
	banisterPart1.lineTo(0, height1*scale);
	banisterPart1.arc(0, rad2*scale, rad2*scale, 1.5*Math.PI, 0, true)
	banisterPart1.lineTo(rad1*scale, (height1+rad2)*scale);
	banisterPart1.arc(-rad1*scale, 0, rad1*scale,0, 1.5*Math.PI, true)
	banisterPart1.lineTo(poleSize*scale, (height1 + poleSize)*scale);
	banisterPart1.lineTo(poleSize*scale, height1*scale);
	banisterPart1.lineTo(poleSize*scale, 0);
	banisterPart1.lineTo(0, 0);

var banisterPart2 = new THREE.Shape();
	banisterPart2.moveTo(poleSize*scale, banisterLength*scale);
	banisterPart2.lineTo(poleSize*scale, (banisterLength - height1)*scale);	
	banisterPart2.arc(0, -rad2*scale, rad2*scale, 0.5*Math.PI, -Math.PI, true)
	banisterPart2.lineTo(-(rad1-poleSize)*scale, (banisterLength - height1 - rad2)*scale);
	banisterPart2.arc(rad1*scale, 0, rad1*scale,-Math.PI, 0.5*Math.PI, true)
	banisterPart2.lineTo(0*scale, (banisterLength - height1 - poleSize)*scale);
	banisterPart2.lineTo(0*scale, banisterLength*scale);
	
	var banisterShape = [banisterPart1, banisterPart2]

	var geom = new THREE.ExtrudeGeometry(banisterShape, banisterExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));	
	var banister = new THREE.Mesh(geom, railingMaterial);
	banister.position.x = basePoint[0];
	banister.position.y = basePoint[1];
	banister.position.z = basePoint[2];
	banister.castShadow = true;
	railingSection.add(banister);
	//stairCase.push(banister);
	

}

if (type == "bal_6") {
	var bagelWidth = 70;
	var bagelHeight = 140;

	var bagelShape = drawBagel (bagelWidth, bagelHeight, poleSize, scale);
	
	var geom = new THREE.ExtrudeGeometry(bagelShape, banisterExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));	
	//бублик 1
	var bagel1 = new THREE.Mesh(geom, railingMaterial);
	bagel1.position.x = basePoint[0];
	bagel1.position.y = basePoint[1] - bagelHeight/2*scale + banisterLength/2 * scale;
	bagel1.position.z = basePoint[2];
	bagel1.castShadow = true;
	railingSection.add(bagel1);
	//stairCase.push(bagel1);
	
	//бублик 2
	var bagel2 = new THREE.Mesh(geom, railingMaterial);
	bagel2.rotation.z = Math.PI;
	bagel2.position.x = basePoint[0];
	bagel2.position.y = basePoint[1] + bagelHeight/2*scale + banisterLength/2 * scale;
	bagel2.position.z = basePoint[2];
	bagel2.castShadow = true;
	railingSection.add(bagel2);
	//stairCase.push(bagel2);
	
	//палка
	var poleGeometry = new THREE.BoxGeometry( poleSize * scale, banisterLength * scale, poleSize * scale );
	var pole = new THREE.Mesh( poleGeometry, railingMaterial);
	pole.position.x = basePoint[0];
	pole.position.y = basePoint[1] + banisterLength/2 * scale;
	pole.position.z = basePoint[2] + poleSize/2*scale;	
	pole.castShadow = true;
	railingSection.add( pole );
	//stairCase.push(pole);	
	}
	
if (type == "bal_7") {
	var bagelWidth = 70;
	var bagelHeight = 140;

	var bagelShape = drawBagel (bagelWidth, bagelHeight, poleSize, scale);
	
	var geom = new THREE.ExtrudeGeometry(bagelShape, banisterExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));	
	//бублик 1
	var bagel1 = new THREE.Mesh(geom, railingMaterial);
	bagel1.position.x = basePoint[0];
	bagel1.position.y = basePoint[1] - bagelHeight/2*scale + banisterLength/3 * scale;
	bagel1.position.z = basePoint[2];
	bagel1.castShadow = true;
	railingSection.add(bagel1);
	//stairCase.push(bagel1);
	
	//бублик 2
	var bagel2 = new THREE.Mesh(geom, railingMaterial);
	bagel2.rotation.z = Math.PI;
	bagel2.position.x = basePoint[0];
	bagel2.position.y = basePoint[1] + bagelHeight/2*scale + banisterLength/3 * scale;
	bagel2.position.z = basePoint[2];
	bagel2.castShadow = true;
	railingSection.add(bagel2);
	//stairCase.push(bagel2);
	
	//бублик 3
	var bagel1 = new THREE.Mesh(geom, railingMaterial);
	bagel1.position.x = basePoint[0];
	bagel1.position.y = basePoint[1] - bagelHeight/2*scale + banisterLength*2/3 * scale;
	bagel1.position.z = basePoint[2];
	bagel1.castShadow = true;
	railingSection.add(bagel1);
	//stairCase.push(bagel1);
	
	//бублик 4
	var bagel2 = new THREE.Mesh(geom, railingMaterial);
	bagel2.rotation.z = Math.PI;
	bagel2.position.x = basePoint[0];
	bagel2.position.y = basePoint[1] + bagelHeight/2*scale + banisterLength*2/3 * scale;
	bagel2.position.z = basePoint[2];
	bagel2.castShadow = true;
	railingSection.add(bagel2);
	//stairCase.push(bagel2);
	
	
	
	//палка
	var poleGeometry = new THREE.BoxGeometry( poleSize * scale, banisterLength * scale, poleSize * scale );
	var pole = new THREE.Mesh( poleGeometry, railingMaterial);
	pole.position.x = basePoint[0];
	pole.position.y = basePoint[1] + banisterLength/2 * scale;
	pole.position.z = basePoint[2] + poleSize/2*scale;	
	pole.castShadow = true;
	railingSection.add( pole );
	//stairCase.push(pole);	
	}

if (type == "bal_8") {
	var bagelWidth = 50;
	var bagelHeight = 120;

	var bagelShape = drawBagel (bagelWidth, bagelHeight, poleSize, scale);
	
	var geom = new THREE.ExtrudeGeometry(bagelShape, banisterExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));	
	//бублик 1
	
	var deltaX = bagelWidth*scale + bagelHeight*0.5*scale;
	var bagel1 = new THREE.Mesh(geom, railingMaterial);
	bagel1.position.x = basePoint[0] - deltaX
	bagel1.position.y = basePoint[1] - bagelHeight/2*scale + banisterLength/2 * scale;
	bagel1.position.z = basePoint[2];
	bagel1.castShadow = true;
	railingSection.add(bagel1);
	//stairCase.push(bagel1);
	
	//бублик 2
	var bagel2 = new THREE.Mesh(geom, railingMaterial);
	bagel2.rotation.z = 0.75 * Math.PI;
	bagel2.position.x = basePoint[0] + bagelHeight*1*scale - deltaX
	bagel2.position.y = basePoint[1] + bagelHeight*1.6*scale - bagelHeight/2*scale + banisterLength/2 * scale;
	bagel2.position.z = basePoint[2];
	bagel2.castShadow = true;
	railingSection.add(bagel2);
	//stairCase.push(bagel2);
	
	//бублик 3
	var bagel3 = new THREE.Mesh(geom, railingMaterial);
	bagel3.rotation.z = 1.25 * Math.PI;
	bagel3.position.x = basePoint[0] + bagelHeight*0.3*scale - deltaX
	bagel3.position.y = basePoint[1] + bagelHeight*0.1*scale - bagelHeight/2*scale + banisterLength/2 * scale;
	bagel3.position.z = basePoint[2];
	bagel3.castShadow = true;
	railingSection.add(bagel3);
	//stairCase.push(bagel3);
	
	//бублик 4
	
	var deltaX = bagelWidth*scale + bagelHeight*0.5*scale;
	var bagel4 = new THREE.Mesh(geom, railingMaterial);
	bagel4.rotation.z = Math.PI;
	bagel4.position.x = basePoint[0] + bagelWidth*scale + bagelHeight*0.5*scale;
	bagel4.position.y = basePoint[1] + bagelHeight/2*scale + banisterLength/2 * scale;
	bagel4.position.z = basePoint[2];
	bagel4.castShadow = true;
	railingSection.add(bagel4);
	//stairCase.push(bagel4);
	
	//бублик 5
	var bagel5 = new THREE.Mesh(geom, railingMaterial);
	bagel5.rotation.z = 0.25 * Math.PI;
	bagel5.position.x = basePoint[0] + bagelHeight*0.65*scale
	bagel5.position.y = basePoint[1] + bagelHeight*0.9*scale - bagelHeight/2*scale + banisterLength/2 * scale;
	bagel5.position.z = basePoint[2];
	bagel5.castShadow = true;
	railingSection.add(bagel5);
	//stairCase.push(bagel5);
	
	//бублик 6
	var bagel6 = new THREE.Mesh(geom, railingMaterial);
	bagel6.rotation.z = -0.25 * Math.PI;
	bagel6.position.x = basePoint[0] - bagelHeight*0.1*scale
	bagel6.position.y = basePoint[1] - bagelHeight*1.1*scale + banisterLength/2 * scale;
	bagel6.position.z = basePoint[2];
	bagel6.castShadow = true;
	railingSection.add(bagel6);
	//stairCase.push(bagel6);
	
	//шишка 
	var bulbGeometry = new THREE.OctahedronGeometry(25*scale, 0);
	var bulb = new THREE.Mesh( bulbGeometry, railingMaterial);
	bulb.rotation.y = Math.PI/4;
	bulb.position.x = basePoint[0];
	bulb.position.y = basePoint[1] + banisterLength/2*scale;
	bulb.position.z = basePoint[2] + poleSize/2*scale;
	bulb.castShadow = true;
	railingSection.add(bulb);
	//stairCase.push(bulb); 
	
	//палка
	var poleGeometry = new THREE.BoxGeometry( poleSize * scale, banisterLength * scale, poleSize * scale );
	var pole = new THREE.Mesh( poleGeometry, railingMaterial);
	pole.position.x = basePoint[0];
	pole.position.y = basePoint[1] + banisterLength/2 * scale;
	pole.position.z = basePoint[2] + poleSize/2*scale;	
	pole.castShadow = true;
	railingSection.add( pole );
	//stairCase.push(pole);	
	}
	
if (type == "bal_10" || type == "bal_11" ) {

	//палка
	var poleGeometry = new THREE.BoxGeometry( poleSize * scale, banisterLength * scale, poleSize * scale );
	var pole = new THREE.Mesh( poleGeometry, railingMaterial);
	pole.position.x = basePoint[0];
	pole.position.y = basePoint[1] + banisterLength/2 * scale;
	pole.position.z = basePoint[2] + poleSize/2*scale;	
	pole.castShadow = true;
	railingSection.add( pole );
	//stairCase.push(pole);
	}
	
if (type == "bal_12") {
	/*волюта*/
	var radBottom = 65;
	var radTop = 65; 
	var valutHeight = 400; 	
	var poleSize = 12
	var valutShape = drawValut (radBottom, radTop, valutHeight, poleSize, scale);
	
	var geom = new THREE.ExtrudeGeometry(valutShape, banisterExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));	
	
	var dist = valutHeight - radBottom - radTop
	var angle = Math.atan( (radBottom + radTop - poleSize) / dist  );
	var valutHeightRotated = dist/Math.cos(angle) + radBottom + radTop;
	

	var valut1 = new THREE.Mesh(geom, railingMaterial);
	valut1.rotation.z = - angle;
	valut1.position.x = basePoint[0] - (radBottom - poleSize/2)*scale;
	valut1.position.y = basePoint[1] + radBottom *(1 + Math.sin(angle))*scale + (banisterLength - valutHeightRotated) * 0.5*scale;
	valut1.position.z = basePoint[2];
	valut1.castShadow = true;
	railingSection.add(valut1);
	//stairCase.push(valut1);
	
	/*бублики*/
	var bagelWidth = 70;
	var bagelHeight = 120;
	var poleSize = 12
	var bagelShape = drawBagel (bagelWidth, bagelHeight, poleSize, scale);
	
	var geom = new THREE.ExtrudeGeometry(bagelShape, banisterExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));	
	
	var bagel1 = new THREE.Mesh(geom, railingMaterial);
	bagel1.rotation.z = - angle;
	bagel1.position.x = basePoint[0] - bagelHeight/2*scale*Math.sin(angle);
	bagel1.position.y = basePoint[1]- bagelHeight/2*scale*Math.cos(angle) + banisterLength/2*scale;
	bagel1.position.z = basePoint[2];
	bagel1.castShadow = true;
	railingSection.add(bagel1);
	//stairCase.push(bagel1);
	
	var bagel2 = new THREE.Mesh(geom, railingMaterial);
	bagel2.rotation.z = Math.PI - angle;
	bagel2.position.x = basePoint[0] + bagelHeight/2*scale*Math.sin(angle);
	bagel2.position.y = basePoint[1] + bagelHeight/2*scale*Math.cos(angle) + banisterLength/2*scale;
	bagel2.position.z = basePoint[2];
	bagel2.castShadow = true;
	railingSection.add(bagel2);
	//stairCase.push(bagel2);
	
	/*окончания*/
	var length = (banisterLength - valutHeightRotated) * 0.5;
	var poleGeometry = new THREE.BoxGeometry( poleSize * scale, length * scale, poleSize * scale );
	var pole = new THREE.Mesh( poleGeometry, railingMaterial);
	pole.position.x = basePoint[0];
	pole.position.y = basePoint[1] + length/2 * scale;
	pole.position.z = basePoint[2] + poleSize/2*scale;	
	pole.castShadow = true;
	railingSection.add( pole );
	//stairCase.push(pole);
	
	var pole = new THREE.Mesh( poleGeometry, railingMaterial);
	pole.position.x = basePoint[0];
	pole.position.y = basePoint[1] + 1.5*length * scale + valutHeightRotated*scale;
	pole.position.z = basePoint[2] + poleSize/2*scale;	
	pole.castShadow = true;
	railingSection.add( pole );
	//stairCase.push(pole);

	
	}
	
if (type == "bal_13") {
	/*волюта*/
	var radBottom = 55;
	var radTop = 25; 
	var valutHeight = 300; 	
	var poleSize = 12
	var valutShape = drawValut (radBottom, radTop, valutHeight, poleSize, scale);
	
	var geom = new THREE.ExtrudeGeometry(valutShape, banisterExtrudeOptions);
	geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));	
	
	var angle = 26/180*Math.PI;
	var valutHeightRotated = 445;

	var valut1 = new THREE.Mesh(geom, railingMaterial);
	valut1.rotation.z = 0 - angle;
	valut1.position.x = basePoint[0] - (radBottom - poleSize/2)*scale;
	valut1.position.y = basePoint[1] + radBottom *(1 + Math.sin(angle))*scale + (banisterLength - valutHeightRotated) * 0.5*scale;
	valut1.position.z = basePoint[2];
	valut1.castShadow = true;
	railingSection.add(valut1);
	//stairCase.push(valut1);
	
	var valut2 = new THREE.Mesh(geom, railingMaterial);
	valut2.rotation.z = Math.PI - angle;
	valut2.position.x = basePoint[0] + 99*scale - (radBottom - poleSize/2)*scale;
	valut2.position.y = basePoint[1] + 290*scale  + radBottom *(1 + Math.sin(angle))*scale + (banisterLength - valutHeightRotated) * 0.5*scale;
	valut2.position.z = basePoint[2];
	valut2.castShadow = true;
	railingSection.add(valut2);
	//stairCase.push(valut2);
	
	/*окончания*/
	
	var length = (banisterLength - valutHeightRotated) * 0.5;
	var poleGeometry = new THREE.BoxGeometry( poleSize * scale, length * scale, poleSize * scale );
	var pole = new THREE.Mesh( poleGeometry, railingMaterial);
	pole.position.x = basePoint[0];
	pole.position.y = basePoint[1] + length/2 * scale;
	pole.position.z = basePoint[2] + poleSize/2*scale;	
	pole.castShadow = true;
	railingSection.add( pole );
	//stairCase.push(pole);
	
	var pole = new THREE.Mesh( poleGeometry, railingMaterial);
	pole.position.x = basePoint[0];
	pole.position.y = basePoint[1] + 1.5*length * scale + valutHeightRotated*scale;
	pole.position.z = basePoint[2] + poleSize/2*scale;	
	pole.castShadow = true;
	railingSection.add( pole );
	//stairCase.push(pole);

	
	}

}


/*кованый бублик */


function drawBagel(bagelWidth, bagelHeight, poleSize, scale) {
var rad1 = (bagelWidth - 2*poleSize)/2
var rad2 = bagelWidth/2; 
var bagelShape = new THREE.Shape();
	bagelShape.moveTo(rad2*2*scale, rad2*scale);
	bagelShape.lineTo((bagelWidth - poleSize)*scale, bagelWidth/2*scale);
	bagelShape.arc(-rad1*scale, 0*scale, rad1*scale, 0, -Math.PI, true)
	bagelShape.lineTo(poleSize*scale, (bagelHeight-rad2)*scale);
	bagelShape.arc(rad1*scale, 0, rad1*scale, Math.PI, 0, true)
	bagelShape.lineTo(bagelWidth*scale, (bagelHeight-rad2)*scale);
	bagelShape.arc(-rad2*scale, 0, rad2*scale, 0, Math.PI, true)
	bagelShape.lineTo(0*scale, rad2*scale);
	bagelShape.arc(rad2*scale, 0, rad2*scale, Math.PI, 2*Math.PI, true)
	
	return bagelShape;
}


/*кованая волюта*/

function drawValut(radBottom, radTop, valutHeight, poleSize, scale) {
var rad1 = radBottom - poleSize
var rad2 = radBottom
var dist = valutHeight - radBottom - radTop;
var valutShape = new THREE.Shape();
	//нижний завиток
	valutShape.moveTo(0, 0);
	valutShape.absarc(rad2*scale, 0, rad2*scale, Math.PI, 2.5*Math.PI, true)
	valutShape.lineTo(rad2*scale, rad1*scale);
	valutShape.absarc(rad2*scale, 0, rad1*scale, 0.5*Math.PI, -1*Math.PI, true)
	//перемычка
	valutShape.lineTo(poleSize*scale, dist*scale);
	//верхний завиток
	rad1 = radTop - poleSize
	rad2 = radTop
	valutShape.absarc(-rad1*scale, dist*scale, rad2*scale, 0, 1.5*Math.PI, true)
	valutShape.lineTo(-rad1*scale, (dist - rad1)*scale);
	valutShape.absarc(-rad1*scale, dist*scale, rad1*scale, 1.5*Math.PI, 0, true)	
	//перемычка
	valutShape.lineTo(0, 0);
	
	return valutShape;
}

function drawLathePart(length, minSize, maxSize) {
var points = [];
var point = new THREE.Vector3( minSize, 0, 0);
points.push(point);
point = new THREE.Vector3( maxSize, 10/500*length, 0);
points.push(point);
point = new THREE.Vector3( minSize, 20/500*length, 0);
points.push(point);
point = new THREE.Vector3( maxSize, 200/500*length, 0);
points.push(point);
point = new THREE.Vector3( minSize, 230/500*length, 0);
points.push(point);
point = new THREE.Vector3( maxSize, 250/500*length, 0);
points.push(point);
point = new THREE.Vector3( minSize, 270/500*length, 0);
points.push(point);
point = new THREE.Vector3( maxSize, 300/500*length, 0);
points.push(point);
point = new THREE.Vector3( minSize, 480/500*length, 0);
points.push(point);
point = new THREE.Vector3( maxSize, 490/500*length, 0);
points.push(point);
point = new THREE.Vector3( minSize, 500/500*length, 0);
points.push(point);

return points;

}
function drawLatheBanister(banisterLength){
	var maxSize = params.banisterSize;
	var minSize = 25;
	var endPartHeight = 100;
	var lathePartLength = banisterLength - 2 * endPartHeight
	
	var timberMaterial = new THREE.MeshLambertMaterial( { color: 0x804000, overdraw: 0.5} );
	
var banister = new THREE.Object3D();

//точеный участок

var points = drawLathePart(lathePartLength, minSize/2, maxSize/2);

var latheGeometry = new THREE.LatheGeometry (points, 12, 2, 2*Math.PI);
var balPart = new THREE.Mesh( latheGeometry, timberMaterial);
	balPart.position.y = endPartHeight;
	balPart.castShadow = true;
	banister.add(balPart)

//нижний участок

if (params.timberBalBotEnd == "квадрат")
	var geom = new THREE.BoxGeometry( maxSize, endPartHeight, maxSize );
else 
	var geom = new THREE.CylinderGeometry(minSize/2, minSize/2, endPartHeight);
	
	var balPart = new THREE.Mesh(geom, timberMaterial);
		balPart.position.x = 0;
		balPart.position.y = endPartHeight/2;
		balPart.position.z = 0;
		balPart.castShadow = true;
		banister.add(balPart);
		
		
//верхний участок
if (params.timberBalTopEnd == "квадрат")
	var geom = new THREE.BoxGeometry( maxSize, endPartHeight, maxSize );
else 
	var geom = new THREE.CylinderGeometry(minSize/2, minSize/2, endPartHeight);
	
		
	var balPart = new THREE.Mesh(geom, timberMaterial);
		balPart.position.x = 0;
		balPart.position.y = banisterLength-endPartHeight/2;
		balPart.position.z = 0;
		balPart.castShadow = true;
		banister.add(balPart);	
		
	
	return banister;
} // end of drawLatheBanister(); 

function drawLatheRack(rackSize){
	var timberMaterial = new THREE.MeshLambertMaterial( { color: 0x804000, overdraw: 0.5} );
	var rackLength = 1000;
	var maxSize = params.rackSize;
	var minSize = maxSize*0.6;
	var endPartHeight = rackLength*0.25;
	var lathePartLength = rackLength - 2 * endPartHeight
		

var rack = new THREE.Object3D();

//точеный участок

var points = drawLathePart(lathePartLength, minSize/2, maxSize/2);

var latheGeometry = new THREE.LatheGeometry (points, 12, 2, 2*Math.PI);
var rackPart = new THREE.Mesh( latheGeometry, timberMaterial);
	rackPart.position.y = endPartHeight;
	rackPart.castShadow = true;
	rack.add(rackPart)
	
	
//нижний квадратный участок
	var geom = new THREE.BoxGeometry( rackSize, endPartHeight, rackSize );		
	var rackPart = new THREE.Mesh(geom, timberMaterial);
		rackPart.position.x = 0;
		rackPart.position.y = endPartHeight/2;
		rackPart.position.z = 0;
		rackPart.castShadow = true;
		rack.add(rackPart);
		
//верхний квадратный участок
	var geom = new THREE.BoxGeometry( rackSize, endPartHeight, rackSize );		
	var rackPart = new THREE.Mesh(geom, timberMaterial);
		rackPart.position.x = 0;
		rackPart.position.y = rackLength - endPartHeight/2;
		rackPart.position.z = 0;
		rackPart.castShadow = true;
		rack.add(rackPart);	
		
/*средний точеный участок
	var radius = rackSize/2-10;
	var height = rackLength/2;
	var geom = new THREE.CylinderGeometry(radius, radius, height);
	var rackPart = new THREE.Mesh( geom, timberMaterial);
	rackPart.position.x = 0;
	rackPart.position.y = rackLength*0.5;
	rackPart.position.z = 0;	
	rackPart.castShadow = true;
	rack.add(rackPart);	
	*/
	return rack;	
	
} // end of drawLatheRack(); 


function newPoint_xyz(basePoint, deltaX, deltaY, deltaZ){
/*функция выдает массив координат точки, удаленной от базовой на заданное расстояние по
оси х и у*/
var newPoint=[];
newPoint[0] = basePoint[0] + deltaX;
newPoint[1] = basePoint[1] + deltaY;
newPoint[2] = basePoint[2] + deltaZ;
return newPoint;
}

function newPoint_x(basePoint, deltaX, angle){
/*функция выдает массив координат точки, удаленной от базовой при заданном расстоянии и угле смещения
относительно оси x*/
alert("gh")
console.log(basePoint);

if (basePoint instanceof Array) {
	var newPoint=[];
	newPoint[0] = basePoint[0] + deltaX;
	newPoint[1] = basePoint[1] - deltaX * Math.tan(angle);
	newPoint[2] = basePoint[2];
	return newPoint;
	}

if (basePoint.x) {
	var newPoint = {};
	newPoint.x = basePoint.x + deltaX;
	newPoint.y = basePoint.y - deltaX * Math.tan(angle);
	newPoint.z = basePoint.z;
	return newPoint;
	console.log(newPoint)
	}
}

function newPoint_x_obj(basePoint, deltaX, angle){
/*функция выдает массив координат точки, удаленной от базовой при заданном расстоянии и угле смещения
относительно оси x*/
if (basePoint instanceof Array) {
	var newPoint=[];
	newPoint[0] = basePoint[0] + deltaX;
	newPoint[1] = basePoint[1] - deltaX * Math.tan(angle);
	newPoint[2] = basePoint[2];
	return newPoint;
	}

if (basePoint.x) {
	var newPoint = {};
	newPoint.x = basePoint.x + deltaX;
	newPoint.y = basePoint.y - deltaX * Math.tan(angle);
	newPoint.z = basePoint.z;
	return newPoint;
	console.log(newPoint)
	}
}

function newPoint_z(basePoint, deltaZ, angle){
/*функция выдает массив координат точки, удаленной от базовой при заданном расстоянии и угле смещения
относительно оси z*/
if (basePoint instanceof Array) {
	var newPoint=[];
	newPoint[0] = basePoint[0];
	newPoint[1] = basePoint[1] - deltaX * Math.tan(angle);
	newPoint[2] = basePoint[2] + deltaZ;
	return newPoint;
	}
}


function setRackPosition(stairAmt) { 
var rackPosition = [];
if (stairAmt == 0) rackPosition = [];
if (stairAmt == 1) rackPosition = [];
if (stairAmt == 2) rackPosition = [];
if (stairAmt == 3) rackPosition = [];
if (stairAmt == 4) rackPosition = [];
if (stairAmt == 5) rackPosition = [3];
if (stairAmt == 6) rackPosition = [4];
if (stairAmt == 7) rackPosition = [4]; 
if (stairAmt == 8) rackPosition = [3,6];
if (stairAmt == 9) rackPosition = [4,6];
if (stairAmt == 10) rackPosition = [4,7];
if (stairAmt == 11) rackPosition = [3,6,9];
if (stairAmt == 12) rackPosition = [3,6,9];
if (stairAmt == 13) rackPosition = [4,7,10];
if (stairAmt == 14) rackPosition = [3,6,9,12];
if (stairAmt == 15) rackPosition = [3,6,9,12];
if (stairAmt == 16) rackPosition = [4,7,10,13];
if (stairAmt == 17) rackPosition = [3,6,9,12,15];
if (stairAmt == 18) rackPosition = [4,7,10,13,16];
if (stairAmt == 19) rackPosition = [4,7,10,13,16];

return (rackPosition);
}