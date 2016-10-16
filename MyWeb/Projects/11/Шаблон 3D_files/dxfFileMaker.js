function exportToDxf(dxfPrimitivesArr) {
	var text = generateDxfContent (dxfPrimitivesArr);
	var fileName = "draw.dxf"; //??? ?????
	var BB = window.Blob;
	saveAs(
		new BB([text], {type: "text/plain;charset=windows-1251"}), 
		fileName
		);
	}


function removeShape(shapeArr, id) {
	shapeArr[id] = "";
	}

function generateDxfContent(shapeArr) {
var dxfHeader = 
"0" + "\n" + 
"SECTION" + "\n" + 
"2" + "\n" + 
"HEADER" + "\n" + 
"0" + "\n" + 
"ENDSEC" + "\n" + 
"0" + "\n" + 
"SECTION" + "\n" + 
"2" + "\n" + 
"ENTITIES" + "\n";

var dxfFooter = 
"0" + "\n" + 
"ENDSEC" + "\n" + 
"0" + "\n" + 
"EOF";

var dxfBody = "";

for (var i=0; i<shapeArr.length; i++)
	if (shapeArr[i]) dxfBody = dxfBody + shapeArr[i];

var dxfContent = dxfHeader + dxfBody + dxfFooter;

return dxfContent; 
}