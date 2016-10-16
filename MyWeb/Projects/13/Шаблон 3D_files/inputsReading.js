/*функци¤ показывает/пр¤чет блок по id*/
function showHideDiv(id, speed){
var block = "#" + id;
setTimeout(function() { $(block).slideToggle(speed) }, 200);
}

/*функци¤ получает значение пол¤ формы по id*/
function getInputValue(inputId){
var value; //возвращаемое значение
var input = document.getElementById(inputId);

	if (input) {
	if (input.tagName == 'SPAN') value = input.innerHTML;
	if (input.tagName == "SELECT") value = input.options[input.selectedIndex].value;
	if (input.tagName == "INPUT") {
		value = input.value;	
		if(input.getAttribute("type") == "number") value = Number(value);
		if(input.getAttribute("type") == "checkbox") value = input.checked;
		}
	if (input.tagName == "TEXTAREA") value = input.value;	
	}
	return(value);
	if (!input)
		return '';
	}
	
/*функци¤ получает значени¤ всех инпутов на странице и записывает в объект*/

function getAllInputsValues(params){
var paramNamesArr = document.getElementsByTagName("input");
	for(var i=0; i<paramNamesArr.length; i++){
		var paramName = paramNamesArr[i].id;
		params[paramName] = getInputValue(paramName);
		}
	var paramNamesArr = document.getElementsByTagName("select");
	for(var i=0; i<paramNamesArr.length; i++){
		var paramName = paramNamesArr[i].id;
		params[paramName] = getInputValue(paramName);
		}
	}
		
	
/*функция устанавливает значение пол¤ формы по id*/
function setInputValue(selectId, value){
	var input = document.getElementById(selectId);
	if (input) {
		if (input.tagName == "SELECT") {
			var options = input.options;
			for (var i=0; i<options.length; i++) {
				if (options[i].value == value) options[i].selected = true;
				}
			}
		if (input.tagName == "INPUT") input.value = value;	
		if (input.tagName == "TEXTAREA") input.value = value;
	}
}
