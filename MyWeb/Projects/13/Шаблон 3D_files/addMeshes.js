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
    
	var h = params.h;
	var b = params.b;	
	var staieAmt = params.staieAmt;
	var M = params.M;
    var risers = params.risers;
	var a = b + 40;
	var treadThickness = 40;

/*ступени*/
  
    var geometry = new THREE.BoxGeometry(a, treadThickness, M);
    for (var i = 0; i < staieAmt; i++) {
        var tread = new THREE.Mesh(geometry, timberMaterial);
		tread.position.x = a/2 + b*i;
		tread.position.y = treadThickness/2 + h*(i+1);
		tread.position.z = M/2;
		meshes.push(tread);
    }

	/*подступени*/
  console.log(risers);
    if (risers === "есть") {
        var riserThickness = 20;
        var riserSideOffset = 10;
        var riserHeigth = h - treadThickness;
        var riserLength = M - riserSideOffset * 2;

        var geometry = new THREE.BoxGeometry(riserThickness, riserHeigth, riserLength);
        for (var i = 0; i < staieAmt; i++) {
            var riser = new THREE.Mesh(geometry, timberMaterial);
            riser.position.x = riserThickness / 2 + b * i + (a - b - riserThickness);
            riser.position.y = -riserHeigth / 2 + h * (i + 1);
            riser.position.z = M / 2;
            meshes.push(riser);
        }
    }
	
		
    /*косоур*/
    var stringerParams = {};
    stringerParams.a = a;
    stringerParams.treadThickness = treadThickness;

    var height = 500;
    var width = 1000;
    var stringerThickness = 40;
    var stringerSideOffset = 70;
	var shape = drawShape(stringerParams);
	var extrudeOptions = {
	    amount: stringerThickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var exampleBox2 = new THREE.Mesh(geometry, metalMaterial);
		exampleBox2.position.x = a-b;
		exampleBox2.position.y = 0;		
		exampleBox2.position.z = stringerSideOffset;
		meshes.push(exampleBox2);
var exampleBox2 = new THREE.Mesh(geometry, metalMaterial);
		exampleBox2.position.x = a-b;
		exampleBox2.position.y = 0;		
		exampleBox2.position.z = M - stringerSideOffset -stringerThickness;
		meshes.push(exampleBox2);


		
   //добавляем объекты в сцену
   addObjects(viewportId, meshes);	
   
}
		
	 	 
		 
		 

