function showOptions(selectId, compatibleOptions){
/*������� ���������� � input type=select �����, ������ �������
���������� � ������� compatibleOptions*/
var i;
var j;
for (i = 0; i < selectId.length; i++) {
	if (compatibleOptions[0] == (i+1)) selectId[i].selected = "true";
	selectId[i].style.display = "none";
	for (j = 0; j < compatibleOptions.length; j++)
		if (compatibleOptions[j] == (i+1)) {
		selectId[i].style.display = "block";		
		}
	}
}

function changeFormCarcas(){
var i; //������� ����� - ��������� ����������
var j; //������� ����� - ��������� ����������

/*����� ���-�� ������ � ����������� �� ������*/
var stairModel = document.getElementById('stairModel').options[document.getElementById('stairModel').selectedIndex].value;
//������� ����
if (stairModel == "�-�������� ������������") 
	document.getElementById('marsh_2_tr').style.display = "table-row";
else document.getElementById('marsh_2_tr').style.display = "none";
//������� ����
if (stairModel == "������") 
	document.getElementById('marsh_3_tr').style.display = "none";
else document.getElementById('marsh_3_tr').style.display = "table-row";

/*��������� �������� � ���������*/
if (stairModel == "�-�������� � ���������") {
//document.getElementById('middlePlatform_tr_1').style.display = "table-row";
document.getElementById('middlePlatform_tr_2').style.display = "table-row";
document.getElementById('middlePlatform_tr_3').style.display = "table-row";
}
else {
//document.getElementById('middlePlatform_tr_1').style.display = "none";
document.getElementById('middlePlatform_tr_2').style.display = "none";
document.getElementById('middlePlatform_tr_3').style.display = "none";
}

if (stairModel == "�-�������� � �������" || stairModel == "�-�������� � ���������"){
document.getElementById('marshDist_tr').style.display = "table-row";
//document.getElementById('turn_tr_2').style.display = "table-row";
}
else {
document.getElementById('marshDist_tr').style.display = "none";
//document.getElementById('turn_tr_2').style.display = "none";
}


if (stairModel == "�-�������� ������������"){
//document.getElementById('turn_tr_10').style.display = "table-row";
document.getElementById('turn_tr_11').style.display = "table-row";
document.getElementById('turn_tr_12').style.display = "table-row";
}
else {
//document.getElementById('turn_tr_10').style.display = "none";
document.getElementById('turn_tr_11').style.display = "none";
document.getElementById('turn_tr_12').style.display = "none";
}

var platformTop = document.getElementById('platformTop').options[document.getElementById('platformTop').selectedIndex].value;
if (platformTop == "��������"){
//document.getElementById('platformTop_tr_1').style.display = "table-row";
//document.getElementById('platformTop_tr_2').style.display = "table-row";
document.getElementById('platformTop_tr_3').style.display = "table-row";
document.getElementById('platformTopColumnAmt_tr').style.display = "table-row";
//document.getElementById('platformTop_tr_4').style.display = "none";
//document.getElementById('platformTop_tr_14').style.display = "none";
}
else {
//document.getElementById('platformTop_tr_1').style.display = "none";
//document.getElementById('platformTop_tr_2').style.display = "none";
document.getElementById('platformTop_tr_3').style.display = "none";
document.getElementById('platformTopColumnAmt_tr').style.display = "none";
//document.getElementById('platformTop_tr_4').style.display = "table-row";
//document.getElementById('platformTop_tr_14').style.display = "table-row";
}
/*
// ����� ��������� ����������� ��������
if (stairModel == "������") document.getElementById('turnSide_tr').style.display = "none";
else document.getElementById('turnSide_tr').style.display = "table-row";
*/
// ����� ������ ���� ������� �������� ��� �� �������
/*
var platformTopColumn = document.getElementById('platformTopColumn').options[document.getElementById('platformTopColumn').selectedIndex].value;
if (platformTop == "��������" && platformTopColumn == "�������") document.getElementById('inclinedBeamAngle_tr').style.display = "table-row";
else document.getElementById('inclinedBeamAngle_tr').style.display = "none";
*/

//var model = document.getElementById('model').options[document.getElementById('model').selectedIndex].value;




/*�������*/
var columnModel = getInputValue('columnModel');

if (columnModel != "���") {
	document.getElementById('columnPos_tr').style.display = "table-row";
	}
else {
	document.getElementById('columnPos_tr').style.display = "none";
	}

/*�������� ��� ��������*/
for (var i=1; i<9; i++) {
	var trId = "isColumn" + i + "_label";
	document.getElementById(trId).style.display = "none";
	}


var posCompatible = [];
if (stairModel == "������") {
	maxColumnAmt = 2;
	document.getElementById("columnPos_img").src = "/images/calculator/columnPos/001.jpg";
	}
if (stairModel == "�-�������� � ���������") {
	maxColumnAmt = 4;
	document.getElementById("columnPos_img").src = "/images/calculator/columnPos/002.jpg";
	}
if (stairModel == "�-�������� � �������") {
	maxColumnAmt = 4;
	document.getElementById("columnPos_img").src = "/images/calculator/columnPos/003.jpg";
	}
if (stairModel == "�-�������� � ���������") {
	maxColumnAmt = 7;
	document.getElementById("columnPos_img").src = "/images/calculator/columnPos/004.jpg";
	}
if (stairModel == "�-�������� � �������") {
	maxColumnAmt = 7;
	document.getElementById("columnPos_img").src = "/images/calculator/columnPos/005.jpg";
	}
if (stairModel == "�-�������� ������������") {
	maxColumnAmt = 8;
	document.getElementById("columnPos_img").src = "/images/calculator/columnPos/006.jpg";
	}

for (var i=1; i < maxColumnAmt+1; i++) {
	var trId = "isColumn" + i + "_label";
	document.getElementById(trId).style.display = "";
	}

/*����� �� ����� �� ���������*
if (model == "������") document.getElementById('wallDist').value = 10;
if (model == "�������") document.getElementById('wallDist').value = 40;
*/
} //����� ������� changeFormCarcas()

function setStairOption(){
/*����� ��� ���������*/
var stairFrame = document.getElementById('stairFrame').options;
var frame;
var stairTypeSelected = document.getElementById('stairType').options[document.getElementById('stairType').selectedIndex].value;

frame = "2 ��������";
if (model == "��") frame = "������ � �������";
if (model == "������") frame = "������ ��� �����";
if (model == "�������") frame = "������ ��� �����";
if (stairTypeSelected == "�������� �����") frame = "������ � �������";
if (stairTypeSelected == "�������� ��������") frame = "������ � �������";
if (stairTypeSelected == "�����") frame = "������ � �������";
if (stairTypeSelected == "���") frame = "������ � �������";
if (stairTypeSelected == "�����������") frame = "������ ��� �����";
if (stairTypeSelected == "������") frame = "������ � �������";

if (frame == "������ � �������") {
	stairFrame[0].style.display = "none";
	stairFrame[1].style.display = "block";
	stairFrame[1].selected="true";
	}
if (frame == "������ ��� �����") {
	stairFrame[0].style.display = "block";
	stairFrame[1].style.display = "none";
	stairFrame[0].selected="true";
	}
if (frame == "2 ��������") {
	stairFrame[0].style.display = "block";
	stairFrame[1].style.display = "block";
	stairFrame[0].selected="true";
	}
	

var timberPaintOptions = document.getElementById('timberPaint').options;
var timberPaintCompatible = 0;
		
if (stairTypeSelected == "����� ��.�") timberPaintCompatible = 1;
if (stairTypeSelected == "������ ������.") timberPaintCompatible = 1;
if (stairTypeSelected == "��� ������.") timberPaintCompatible = 1;
if (stairTypeSelected == "��� �/�") timberPaintCompatible = 1;

if (timberPaintCompatible == 1) {
	//timberPaintOptions[1].style.display = "block";
	//timberPaintOptions[2].style.display = "block";
	document.getElementById('timberPaint_tr').style.display = "table-row";
	
	}
else {
	//timberPaintOptions[1].style.display = "none";
	//timberPaintOptions[2].style.display = "none";
	timberPaintOptions[0].selected="true";
	document.getElementById('timberPaint_tr').style.display = "none";
	}
} //end of setStairOption()

function setTemplateCarcas() {
var template = document.getElementById('template').options[document.getElementById('template').selectedIndex].value;
var stairType = document.getElementById('stairType').options;
var metalPaint = document.getElementById('metalPaint').options;
var timberPaint = document.getElementById('timberPaint').options;
var install = document.getElementById('install').options;


if (template == "������ 1") {
stairType[3].selected="true";
metalPaint[2].selected="true";
timberPaint[2].selected="true";
install[1].selected="true";
}
if (template == "������ 2") {
stairType[2].selected="true";
metalPaint[2].selected="true";
timberPaint[1].selected="true";
install[0].selected="true";
}

if (template == "������ 3") {
stairType[1].selected="true";
metalPaint[2].selected="true";
timberPaint[0].selected="true";
install[0].selected="true";
}
if (template == "������ 4") {
stairType[0].selected="true";
metalPaint[0].selected="true";
timberPaint[0].selected="true";
install[0].selected="true";
}
}// end of setTemplateCarcas