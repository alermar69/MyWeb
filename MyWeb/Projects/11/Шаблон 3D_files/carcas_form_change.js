function showOptions(selectId, compatibleOptions){
/*Функция показывает в input type=select опции, номера которых
содержатся в массиве compatibleOptions*/
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
var i; //счетчик цикла - служебная переменная
var j; //счетчик цикла - служебная переменная

/*вывод кол-ва маршей в зависимости от модели*/
var stairModel = document.getElementById('stairModel').options[document.getElementById('stairModel').selectedIndex].value;
//средний марш
if (stairModel == "П-образная трехмаршевая") 
	document.getElementById('marsh_2_tr').style.display = "table-row";
else document.getElementById('marsh_2_tr').style.display = "none";
//верхний марш
if (stairModel == "Прямая") 
	document.getElementById('marsh_3_tr').style.display = "none";
else document.getElementById('marsh_3_tr').style.display = "table-row";

/*параметры площадок и поворотов*/
if (stairModel == "П-образная с площадкой") {
//document.getElementById('middlePlatform_tr_1').style.display = "table-row";
document.getElementById('middlePlatform_tr_2').style.display = "table-row";
document.getElementById('middlePlatform_tr_3').style.display = "table-row";
}
else {
//document.getElementById('middlePlatform_tr_1').style.display = "none";
document.getElementById('middlePlatform_tr_2').style.display = "none";
document.getElementById('middlePlatform_tr_3').style.display = "none";
}

if (stairModel == "П-образная с забегом" || stairModel == "П-образная с площадкой"){
document.getElementById('marshDist_tr').style.display = "table-row";
//document.getElementById('turn_tr_2').style.display = "table-row";
}
else {
document.getElementById('marshDist_tr').style.display = "none";
//document.getElementById('turn_tr_2').style.display = "none";
}


if (stairModel == "П-образная трехмаршевая"){
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
if (platformTop == "площадка"){
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
// показ селектора направления пооврота
if (stairModel == "Прямая") document.getElementById('turnSide_tr').style.display = "none";
else document.getElementById('turnSide_tr').style.display = "table-row";
*/
// показ инпута угла наклона подкосов при их наличии
/*
var platformTopColumn = document.getElementById('platformTopColumn').options[document.getElementById('platformTopColumn').selectedIndex].value;
if (platformTop == "площадка" && platformTopColumn == "подкосы") document.getElementById('inclinedBeamAngle_tr').style.display = "table-row";
else document.getElementById('inclinedBeamAngle_tr').style.display = "none";
*/

//var model = document.getElementById('model').options[document.getElementById('model').selectedIndex].value;




/*колонны*/
var columnModel = getInputValue('columnModel');

if (columnModel != "нет") {
	document.getElementById('columnPos_tr').style.display = "table-row";
	}
else {
	document.getElementById('columnPos_tr').style.display = "none";
	}

/*скрываем все чекбоксы*/
for (var i=1; i<9; i++) {
	var trId = "isColumn" + i + "_label";
	document.getElementById(trId).style.display = "none";
	}


var posCompatible = [];
if (stairModel == "Прямая") {
	maxColumnAmt = 2;
	document.getElementById("columnPos_img").src = "/images/calculator/columnPos/001.jpg";
	}
if (stairModel == "Г-образная с площадкой") {
	maxColumnAmt = 4;
	document.getElementById("columnPos_img").src = "/images/calculator/columnPos/002.jpg";
	}
if (stairModel == "Г-образная с забегом") {
	maxColumnAmt = 4;
	document.getElementById("columnPos_img").src = "/images/calculator/columnPos/003.jpg";
	}
if (stairModel == "П-образная с площадкой") {
	maxColumnAmt = 7;
	document.getElementById("columnPos_img").src = "/images/calculator/columnPos/004.jpg";
	}
if (stairModel == "П-образная с забегом") {
	maxColumnAmt = 7;
	document.getElementById("columnPos_img").src = "/images/calculator/columnPos/005.jpg";
	}
if (stairModel == "П-образная трехмаршевая") {
	maxColumnAmt = 8;
	document.getElementById("columnPos_img").src = "/images/calculator/columnPos/006.jpg";
	}

for (var i=1; i < maxColumnAmt+1; i++) {
	var trId = "isColumn" + i + "_label";
	document.getElementById(trId).style.display = "";
	}

/*зазор от стены по умолчанию*
if (model == "тетивы") document.getElementById('wallDist').value = 10;
if (model == "косоуры") document.getElementById('wallDist').value = 40;
*/
} //конец функции changeFormCarcas()

function setStairOption(){
/*рамки под ступенями*/
var stairFrame = document.getElementById('stairFrame').options;
var frame;
var stairTypeSelected = document.getElementById('stairType').options[document.getElementById('stairType').selectedIndex].value;

frame = "2 варианта";
if (model == "ко") frame = "только с рамками";
if (model == "тетивы") frame = "только без рамок";
if (model == "косоуры") frame = "только без рамок";
if (stairTypeSelected == "рифленая сталь") frame = "только с рамками";
if (stairTypeSelected == "рифленый алюминий") frame = "только с рамками";
if (stairTypeSelected == "лотки") frame = "только с рамками";
if (stairTypeSelected == "дпк") frame = "только с рамками";
if (stairTypeSelected == "пресснастил") frame = "только без рамок";
if (stairTypeSelected == "стекло") frame = "только с рамками";

if (frame == "только с рамками") {
	stairFrame[0].style.display = "none";
	stairFrame[1].style.display = "block";
	stairFrame[1].selected="true";
	}
if (frame == "только без рамок") {
	stairFrame[0].style.display = "block";
	stairFrame[1].style.display = "none";
	stairFrame[0].selected="true";
	}
if (frame == "2 варианта") {
	stairFrame[0].style.display = "block";
	stairFrame[1].style.display = "block";
	stairFrame[0].selected="true";
	}
	

var timberPaintOptions = document.getElementById('timberPaint').options;
var timberPaintCompatible = 0;
		
if (stairTypeSelected == "сосна кл.Б") timberPaintCompatible = 1;
if (stairTypeSelected == "береза паркет.") timberPaintCompatible = 1;
if (stairTypeSelected == "дуб паркет.") timberPaintCompatible = 1;
if (stairTypeSelected == "дуб ц/л") timberPaintCompatible = 1;

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


if (template == "дерево 1") {
stairType[3].selected="true";
metalPaint[2].selected="true";
timberPaint[2].selected="true";
install[1].selected="true";
}
if (template == "дерево 2") {
stairType[2].selected="true";
metalPaint[2].selected="true";
timberPaint[1].selected="true";
install[0].selected="true";
}

if (template == "дерево 3") {
stairType[1].selected="true";
metalPaint[2].selected="true";
timberPaint[0].selected="true";
install[0].selected="true";
}
if (template == "дерево 4") {
stairType[0].selected="true";
metalPaint[0].selected="true";
timberPaint[0].selected="true";
install[0].selected="true";
}
}// end of setTemplateCarcas