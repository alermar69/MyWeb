function changeFormRailing(){
/*����� ���-�� ������ � ����������� �� ������*/
var stairModel = document.getElementById('stairModel').options[document.getElementById('stairModel').selectedIndex].value;
//������� ����
if (stairModel == "�-�������� ������������") 
	document.getElementById('marsh_2_perila_tr').style.display = "table-row";
else document.getElementById('marsh_2_perila_tr').style.display = "none";
//������� ����
if (stairModel == "������" || stairModel == "������ � ��������� �������") 
	document.getElementById('marsh_3_perila_tr').style.display = "none";
else document.getElementById('marsh_3_perila_tr').style.display = "table-row";

/*��������� �������� � ���������*/
if (stairModel == "�-�������� � ���������") {
document.getElementById('backRailing_1_tr').style.display = "table-row";
}
else {
document.getElementById('backRailing_1_tr').style.display = "none";
}

if (stairModel == "�-�������� � �������"){
document.getElementById('backRailing_2_tr').style.display = "table-row";
}
else {
document.getElementById('backRailing_2_tr').style.display = "none";
}


var platformTop = document.getElementById('platformTop').options[document.getElementById('platformTop').selectedIndex].value;
if (platformTop == "��������"){
document.getElementById('backRailing_3_tr').style.display = "table-row";
}
else {
document.getElementById('backRailing_3_tr').style.display = "none";
}

/*�������������� ����������*/

var railingModel = document.getElementById('railingModel').options[document.getElementById('railingModel').selectedIndex].value;

if (railingModel == "����������� ������") {
	document.getElementById('glass_tr_1').style.display = "table-row";
	}
else {
	document.getElementById('glass_tr_1').style.display = "none";
	}

if (railingModel == "������") {
	document.getElementById('rigel_tr_1').style.display = "table-row";
	document.getElementById('rigel_tr_2').style.display = "table-row";	
	}
else {
	document.getElementById('rigel_tr_1').style.display = "none";
	document.getElementById('rigel_tr_2').style.display = "none";
}

if (railingModel == "������� ��������") {
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

if (railingModel == "���������� ��������"){
	document.getElementById('timberBal_tr_1').style.display = "table-row";
	document.getElementById('timberBal_tr_2').style.display = "table-row";
	document.getElementById('timberBal_tr_3').style.display = "table-row";
	}
else {
	document.getElementById('timberBal_tr_1').style.display = "none";
	document.getElementById('timberBal_tr_2').style.display = "none";
	document.getElementById('timberBal_tr_3').style.display = "none";
	}
	
	
if (railingModel == "������" || railingModel == "������ �� �������")
	document.getElementById('banisterMaterial_tr').style.display = "table-row";	
else document.getElementById('banisterMaterial_tr').style.display = "none";

/*����� ��������*/
/*������ ������ ��������� ��������*/
var handrailCompatible = [];

// if (railingModel == "������") handRailCompatible = [1,2,3,5,6,7,9,10,12]; // ������� 7,9,10
if (railingModel == "������") handRailCompatible = [1,2,3,5,6,12];
// if (railingModel == "������ �� �������") handRailCompatible = [1,2,3,5,6,7,9,10,12]; // ������� 7,9,10
if (railingModel == "������ �� �������") handRailCompatible = [1,2,3,5,6,12];
// if (railingModel == "����������� ������") handRailCompatible = [10,12,13,14,15,16]; // ������� 7,9,10
if (railingModel == "����������� ������") handRailCompatible = [12,13,14,15,16];
if (railingModel == "������� ��������") handRailCompatible = [1,2,3,4,8,11];
if (railingModel == "���������� ��������") handRailCompatible = [8,11,17,18,19];

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

/*����� ����� ��� ����� ������������� �������� ����������*/
var topRailingAmt = document.getElementById('topRailingAmt').options[document.getElementById('topRailingAmt').selectedIndex].value;
if (topRailingAmt != "���") {
	topRailingAmt = Number(topRailingAmt);
	//������� ������ ������ ���� �������
	var i = 1;
	var tableBody = 	
	"<tr class='topRailing" + i + "'>" + 
	"<td>" + i + "</td>" + 
	"<td><input class='balustrade' id='balLength_" + i + "' type='number' value='1500'></td>" + 
	//"<td><input id='rigelLength" + i + "' type='number' value='1400'></td>" + 
	//"<td><input id='banisterAmt" + i + "' type='number' value='3'></td>"+
			"<td><select class='balustrade' id='jointRack_" + i + "' size='1'>" + 
			"<option value='���'>���</option>" +
			"<option value='�����'>�����</option>" +
			"<option value='������'>������</option>" +
			"<option value='���'>��� �������</option>" +
		"</select></td></tr>";
	for (var i = 2; i < topRailingAmt+1; i++) {
		//������� ��������� ������ ���� �������
		tableBody += 	
		"<tr class='topRailing" + i + "'>" + 
		"<td>" + i + "</td>" + 
		"<td><input class='balustrade' id='balLength_" + i + "' type='number' value='1500'></td>" + 
		//"<td><input id='rigelLength" + i + "' type='number' value='1400'></td>" + 
		//"<td><input id='banisterAmt" + i + "' type='number' value='3'></td>" + 
		"<td><select class='balustrade' id='jointRack_" + i + "' size='1'>" +  
			"<option value='���'>���</option>" +
			"<option value='�����'>�����</option>" +
			"<option value='������'>������</option>" +
			"<option value='���'>��� �������</option>" +
		"</select></td></tr>";
		}
	//������� �������
	document.getElementById('topRailingInputTable').innerHTML =
	"<h4>������ ����������:</h4>" + 
	"<table class='tab_2'><tbody><tr>" +
	"<th>����� �������</th>" + 
	"<th>�����, ��</th>" + 
	//"<th>����� �������, ��</th>" + 
	//"<th>���-�� �����</th>" + 
	"<th>����� ������</th></tr>" + 
	tableBody + 
	"</tbody></table>";
	}
else {
	document.getElementById('topRailingInputTable').innerHTML = "";	
	document.getElementById('balImages').innerHTML = "";	
}
}