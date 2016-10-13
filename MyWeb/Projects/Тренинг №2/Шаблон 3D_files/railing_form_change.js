function changeFormRailing(){
/*вывод кол-ва маршей в зависимости от модели*/
var stairModel = document.getElementById('stairModel').options[document.getElementById('stairModel').selectedIndex].value;
//средний марш
if (stairModel == "П-образная трехмаршевая") 
	document.getElementById('marsh_2_perila_tr').style.display = "table-row";
else document.getElementById('marsh_2_perila_tr').style.display = "none";
//верхний марш
if (stairModel == "Прямая" || stairModel == "Прямая с площадкой наверху") 
	document.getElementById('marsh_3_perila_tr').style.display = "none";
else document.getElementById('marsh_3_perila_tr').style.display = "table-row";

/*параметры площадок и поворотов*/
if (stairModel == "П-образная с площадкой") {
document.getElementById('backRailing_1_tr').style.display = "table-row";
}
else {
document.getElementById('backRailing_1_tr').style.display = "none";
}

if (stairModel == "П-образная с забегом"){
document.getElementById('backRailing_2_tr').style.display = "table-row";
}
else {
document.getElementById('backRailing_2_tr').style.display = "none";
}


var platformTop = document.getElementById('platformTop').options[document.getElementById('platformTop').selectedIndex].value;
if (platformTop == "площадка"){
document.getElementById('backRailing_3_tr').style.display = "table-row";
}
else {
document.getElementById('backRailing_3_tr').style.display = "none";
}

/*Характеристики ограждений*/

var railingModel = document.getElementById('railingModel').options[document.getElementById('railingModel').selectedIndex].value;

if (railingModel == "Самонесущее стекло") {
	document.getElementById('glass_tr_1').style.display = "table-row";
	}
else {
	document.getElementById('glass_tr_1').style.display = "none";
	}

if (railingModel == "Ригели") {
	document.getElementById('rigel_tr_1').style.display = "table-row";
	document.getElementById('rigel_tr_2').style.display = "table-row";	
	}
else {
	document.getElementById('rigel_tr_1').style.display = "none";
	document.getElementById('rigel_tr_2').style.display = "none";
}

if (railingModel == "Кованые балясины") {
	document.getElementById('kovka_tr_1').style.display = "table-row";
	document.getElementById('kovka_tr_2').style.display = "table-row";
	document.getElementById('kovka_tr_3').style.display = "table-row";
	document.getElementById('kovka_tr_4').style.display = "table-row";
	}
else {
	document.getElementById('kovka_tr_1').style.display = "none";
	document.getElementById('kovka_tr_2').style.display = "none";
	document.getElementById('kovka_tr_3').style.display = "none";
	document.getElementById('kovka_tr_4').style.display = "none";
}

if (railingModel == "Деревянные балясины"){
	document.getElementById('timberBal_tr_1').style.display = "table-row";
	document.getElementById('timberBal_tr_2').style.display = "table-row";
	document.getElementById('timberBal_tr_3').style.display = "table-row";
	}
else {
	document.getElementById('timberBal_tr_1').style.display = "none";
	document.getElementById('timberBal_tr_2').style.display = "none";
	document.getElementById('timberBal_tr_3').style.display = "none";
	}
	
	
if (railingModel == "Ригели" || railingModel == "Стекло на стойках")
	document.getElementById('banisterMaterial_tr').style.display = "table-row";	
else document.getElementById('banisterMaterial_tr').style.display = "none";

/*выбор поручней*/
/*задаем массив доступных значений*/
var handrailCompatible = [];

// if (railingModel == "Ригели") handRailCompatible = [1,2,3,5,6,7,9,10,12]; // убираем 7,9,10
if (railingModel == "Ригели") handRailCompatible = [1,2,3,5,6,12];
// if (railingModel == "Стекло на стойках") handRailCompatible = [1,2,3,5,6,7,9,10,12]; // убираем 7,9,10
if (railingModel == "Стекло на стойках") handRailCompatible = [1,2,3,5,6,12];
// if (railingModel == "Самонесущее стекло") handRailCompatible = [10,12,13,14,15,16]; // убираем 7,9,10
if (railingModel == "Самонесущее стекло") handRailCompatible = [12,13,14,15,16];
if (railingModel == "Кованые балясины") handRailCompatible = [1,2,3,4,8,11];
if (railingModel == "Деревянные балясины") handRailCompatible = [8,11,17,18,19];

var handrail = document.getElementById('handrail').options;
var i;
var j;
for (i = 0; i < handrail.length; i++) {
	if (handRailCompatible[0] == (i+1)) handrail[i].selected = "true";
	handrail[i].style.display = "none";
	for (j = 0; j < handRailCompatible.length; j++)
		if (handRailCompatible[j] == (i+1)) {
		handrail[i].style.display = "block";		
		}
}

} //end of changeForm

function showBalInput(){

/*показ полей для ввода характеристик участков балюстрады*/
var topRailingAmt = document.getElementById('topRailingAmt').options[document.getElementById('topRailingAmt').selectedIndex].value;
if (topRailingAmt != "нет") {
	topRailingAmt = Number(topRailingAmt);
	//создаем первую строку тела таблицы
	var i = 1;
	var tableBody = 	
	"<tr class='topRailing" + i + "'>" + 
	"<td>" + i + "</td>" + 
	"<td><input class='balustrade' id='balLength_" + i + "' type='number' value='1500'></td>" + 
	//"<td><input id='rigelLength" + i + "' type='number' value='1400'></td>" + 
	//"<td><input id='banisterAmt" + i + "' type='number' value='3'></td>"+
			"<td><select class='balustrade' id='jointRack_" + i + "' size='1'>" + 
			"<option value='нет'>нет</option>" +
			"<option value='слева'>слева</option>" +
			"<option value='справа'>справа</option>" +
			"<option value='две'>две стороны</option>" +
		"</select></td></tr>";
	for (var i = 2; i < topRailingAmt+1; i++) {
		//создаем остальные строки тела таблицы
		tableBody += 	
		"<tr class='topRailing" + i + "'>" + 
		"<td>" + i + "</td>" + 
		"<td><input class='balustrade' id='balLength_" + i + "' type='number' value='1500'></td>" + 
		//"<td><input id='rigelLength" + i + "' type='number' value='1400'></td>" + 
		//"<td><input id='banisterAmt" + i + "' type='number' value='3'></td>" + 
		"<td><select class='balustrade' id='jointRack_" + i + "' size='1'>" +  
			"<option value='нет'>нет</option>" +
			"<option value='слева'>слева</option>" +
			"<option value='справа'>справа</option>" +
			"<option value='две'>две стороны</option>" +
		"</select></td></tr>";
		}
	//выводим таблицу
	document.getElementById('topRailingInputTable').innerHTML =
	"<h4>Секции балюстрады:</h4>" + 
	"<table class='tab_2'><tbody><tr>" +
	"<th>Номер участка</th>" + 
	"<th>Длина, мм</th>" + 
	//"<th>Длина ригелей, мм</th>" + 
	//"<th>Кол-во стоек</th>" + 
	"<th>Общая стойка</th></tr>" + 
	tableBody + 
	"</tbody></table>";
	}
else {
	document.getElementById('topRailingInputTable').innerHTML = "";	
	document.getElementById('balImages').innerHTML = "";	
}
}