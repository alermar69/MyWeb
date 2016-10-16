var params = {}; //глобальный массив значений инпутов
var viewportsParams = []; //глобальный массив параметров видовых экранов
var dxfPrimitivesArr = []; //глобоальный массив примитивов для экспорта в dxf

window.onload = function () {
	//добавляем видовые экраны на страницу
	addViewport('WebGL-output', 'vl_1');//параметры outputDivId, viewportId
	//addViewport('WebGL-output', 'vl_2');
	
	//добавляем нижнее перекрытие
	addFloorPlane('vl_1', true);//параметры viewportId, isVisible
	
	/*вспомогательные оси*/		
	var axes = new THREE.AxisHelper( 2000 );
	$['vl_1'].add(axes);
	
	//addFloorPlane('vl_2', true);
	
	//добавляем стены
	//addWalls('vl_1', true);//параметры viewportId, isVisible 
	//addWalls('vl_2', true);
	
	//вешаем перерисовку стен на измененние инпутов формы параметров стен
   // $('.tabs').delegate('input,select,textarea', 'click', redrawWalls);	
	
	//конфигурируем правое меню
	//$(".tabs").lightTabs();
	
	//пересчитываем лестницу
	recalculate();
	
	

	}

function recalculate() {
	dxfPrimitivesArr = []; //Очищаем массив примитивов
 	getAllInputsValues(params);
	addMesh('vl_1', true);

}

function changeAllForms(){
	changeFormCarcas();
	changeFormRailing();
	changeFormLedges();
}