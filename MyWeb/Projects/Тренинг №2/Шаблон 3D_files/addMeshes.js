//������� ���������� �������
var meshes = [];

function addMesh(viewportId, isVisible) {

   /*������� ���������� �������*/
   if (meshes) removeObjects(viewportId, meshes);

   //������� ���������� �������
   meshes = [];

   /*������ ���������*/
	var timberMaterial = new THREE.MeshLambertMaterial( { color: 0x804000, overdraw: 0.5} );
	var metalMaterial = new THREE.MeshLambertMaterial({color: 0x363636, wireframe: false});

/*������ ��������� �������*/

   var width = params.width;
   var height = params.height;
   var thickness = params.thickness;

/*��������������*/
  
	var geometry = new THREE.BoxGeometry(width, height, thickness);
	var exampleBox = new THREE.Mesh(geometry, timberMaterial);
		exampleBox.position.x = width/2;
		exampleBox.position.y = height/2;		
		exampleBox.position.z = thickness/2;
		meshes.push(exampleBox);
		
/*��������*/

	var shape = drawShape(height, width);
	var extrudeOptions = {
		amount: thickness,
		bevelEnabled: false,
		curveSegments: 12,
		steps: 1
		};
	var geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions);
	geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
	var exampleBox2 = new THREE.Mesh(geometry, metalMaterial);
		exampleBox2.position.x = 0;
		exampleBox2.position.y = 0;		
		exampleBox2.position.z = 1000;
		meshes.push(exampleBox2);


		
   //��������� ������� � �����
   addObjects(viewportId, meshes);	
   
}
		
	 	 
		 
		 

