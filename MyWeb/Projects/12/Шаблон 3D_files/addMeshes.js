//создаем глобальные массивы
var meshes = [];

function addMesh(viewportId, isVisible) {

   /*удаляем предыдущие объекты*/
   if (meshes) removeObjects(viewportId, meshes);

   //очищаем глобальные массивы
   meshes = [];

   /*задаем материалы*/
	var timberMaterial = new THREE.MeshLambertMaterial( { color: 0x804000, overdraw: 0.5} );
	var metalMaterial = new THREE.MeshLambertMaterial({color: 0x363636, wireframe: false});

/*задаем параметры объекта*/

   //var width = params.width;
   //var height = params.height;
    //var thickness = params.thickness;

	var h = 180;
	var b = 260;
	var staieAmt = 8;
	var M = 900;

	var a = 300;
	var treadThickness = 40;

     var geometry = new THREE.BoxGeometry(a, treadThickness, M);
	for (var i = 0; i < staieAmt; i++) {
	    var exampleBox = new THREE.Mesh(geometry, timberMaterial);     
        exampleBox.position.x = a / 2 + b*i;
        exampleBox.position.y = treadThickness / 2 + h*(i+1);
        exampleBox.position.z = M/2;
		meshes.push(exampleBox);
    }
/*параллелепипед*/
  
	
		
///*трапеция*/

//	var shape = drawShape(height, width);
//	var extrudeOptions = {
//		amount: thickness,
//		bevelEnabled: false,
//		curveSegments: 12,
//		steps: 1
//		};
//	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
//	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
//	var exampleBox2 = new THREE.Mesh(geometry, metalMaterial);
//		exampleBox2.position.x = 0;
//		exampleBox2.position.y = 0;		
//		exampleBox2.position.z = 1000;
//		meshes.push(exampleBox2);

//    /*трапеция*/

//		var shape1 = drawShape1(height, width);
//		var extrudeOptions = {
//		    amount: 100,
//		    bevelEnabled: false,
//		    curveSegments: 12,
//		    steps: 1
//		};
//		var geometry = new THREE.ExtrudeGeometry(shape1, extrudeOptions);
//		geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
//		var exampleBox3 = new THREE.Mesh(geometry, metalMaterial);
//		exampleBox3.position.x = 0;
//		exampleBox3.position.y = 0;
//		exampleBox3.position.z = 1500;
//		meshes.push(exampleBox3);
		
   //добавляем объекты в сцену
   addObjects(viewportId, meshes);	
   
}
		
	 	 
		 
		 

