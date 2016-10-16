$(function(){
    var gui,
        viewportsParams = [],
        $renderer = [],
        $camera = [],
        $orbitControls = [],
        $spotLight = [],
        $ambientLight = [],
        $controls = [],
        clock;
    $sceneStruct = {};
    /***   СЦЕНА   ***/
    var imgWidth = 800;
    var imHeight = 600;
    var cameraType = "perspective";
    var wall1, wall2, wall3, wall4;

    clock = new THREE.Clock();
    var i=0;
    addViewport = function(outputDivId, viewportId, cameraType)
    {
        var stats = initStats();

        cameraType = cameraType || "perspective";
        //СЦЕНА
        $[viewportId] = new THREE.Scene();
        $renderer[viewportId] = new THREE.WebGLRenderer();
        $renderer[viewportId].setClearColor(new THREE.Color(0xEEEEEE));
        $renderer[viewportId].setSize(imgWidth, imHeight);
        $renderer[viewportId].shadowMap.enabled = true;
        $renderer[viewportId].shadowMap.type = 2;

        //КАМЕРА
        if (cameraType == "perspective") {

            $camera[viewportId] = new THREE.PerspectiveCamera(45, imgWidth / imHeight,  10, 100000);
            $camera[viewportId].position.set(-5000, 3000, 5000);
        }
        else {
            $camera[viewportId] = new THREE.OrthographicCamera(imgWidth / -16, imgWidth / 16, imHeight / 16, imHeight / -16, -20000, 50000);
            $camera[viewportId].position.set(-3000, 5000, 4000);
        }
        $camera[viewportId].lookAt($[viewportId].position);

        //СВЕТ
        $spotLight[viewportId] = new THREE.SpotLight(0xffffff);
        $spotLight[viewportId].position.set( -5000, 20000, 10000);
        $spotLight[viewportId].penumbra = 0.05;
        $spotLight[viewportId].decay = 1.5;
        $spotLight[viewportId].distance = 300000;
        $spotLight[viewportId].shadow.mapSize.width = 800;
        $spotLight[viewportId].shadow.mapSize.height = 800;
        $spotLight[viewportId].shadow.camera.near = 0.1;
        $spotLight[viewportId].shadow.camera.far = 200000;
        $[viewportId].add($spotLight[viewportId]);

        $ambientLight[viewportId] = new THREE.AmbientLight(0x494949);
        $[viewportId].add($ambientLight[viewportId]);

        /*управление камерой*/
        $orbitControls[viewportId] = new THREE.OrbitControls($camera[viewportId], $renderer[viewportId].domElement);
        $sceneStruct[viewportId] = [];
        $sceneStruct[viewportId]["shadows"] = false;
        $sceneStruct[viewportId]["perspective"] = true;
        change3dMenu($sceneStruct);
        var out = $('#'+outputDivId);

        //Удалим стартовое содержимое
        if(out.children().length == 1 &&  !out.children().attr('height') ){
            out.children().remove();
        }
        out.append($renderer[viewportId].domElement);

        //Перерисовка сцены
        renderScene = function (viewportId) {
            var delta = clock.getDelta();
            $orbitControls[viewportId].update(delta);
            stats.update();
            $spotLight[viewportId].castShadow = $sceneStruct[viewportId]["shadows"];
            requestAnimationFrame(function(){
                return renderScene(viewportId);
            });
            $renderer[viewportId].render($[viewportId], $camera[viewportId]);
        };

        renderScene(viewportId);
        return $[viewportId];
    };
    var $func = [];

    change3dMenu = function(viewportsParams){
        //добавляем элементы управления
        if(gui)
            gui.destroy();
        dat.GUI.TEXT_CLOSED = 'Закрыть панель';
        dat.GUI.TEXT_OPEN = 'Открыть панель';
        gui = new dat.GUI();
        var el;
        var controls = new function(){
            var self = this;
            self.selectvp = 'vp1';

            self.wall1 = true;
            self.wall2 = false;
            self.wall3 = true;
            self.wall4 = false;
            self.wallall = false;

            self.floorTop = false;
            self.floorBottom = true;

            self.perspective = true;
            self.shadows = false;

            self.stairs = false;
            self.frame = false;
            self.steps = false;
            self.fences = false;

            self.switchCamera = function(viewportId) {
                if ($camera[viewportId] instanceof THREE.PerspectiveCamera) {
                    $camera[viewportId] = new THREE.OrthographicCamera( imgWidth / - 0.25, imgWidth / 0.25, imHeight / 0.25, imHeight / - 0.25, -20000, 50000);
                    $camera[viewportId].position.set(-3000, 1000, 4000);
                } else {
                    $camera[viewportId] = new THREE.PerspectiveCamera(45, imgWidth / imHeight,  100, 100000);
                    $camera[viewportId].position.set(-3000, 2000, 3000);
                }
                $camera[viewportId].lookAt($[viewportId].position);
                $orbitControls[viewportId] = new THREE.OrbitControls($camera[viewportId], $renderer[viewportId].domElement);
                $orbitControls[viewportId].enableZoom = true;
                $orbitControls[viewportId].enableDamping = true;
                $orbitControls[viewportId].dampingFactor = 0.25;
                $orbitControls[viewportId].rotateSpeed = 0.05;
            };
        };
        var menu = [], i = 1;
        for(var key in viewportsParams){
            menu.push('vp'+i);
            i++;
        }
        hideShowObject = function(){
            $sceneStruct[controls.selectvp][this.property] = !$sceneStruct[controls.selectvp][this.property];
            controls[this.property] = $sceneStruct[controls.selectvp][this.property];
            if($[controls.selectvp].getObjectByName(this.property)){
                $[controls.selectvp].getObjectByName(this.property).visible = controls[this.property];
            }
        };
        updateGUI = function(){
            for (var i in gui.__controllers)
                gui.__controllers[i].updateDisplay();
            for(var i in gui.__folders)
                for (var j in gui.__folders[i].__controllers)
                    gui.__folders[i].__controllers[j].updateDisplay();
        };
        gui.add(controls, 'selectvp', menu).name('Экран').onChange(function(){
            controls.shadows = $sceneStruct[controls.selectvp]["shadows"];
            controls.perspective = $sceneStruct[controls.selectvp]["perspective"];
            controls.wall1 = $sceneStruct[controls.selectvp]["wall1"];
            controls.wall2 = $sceneStruct[controls.selectvp]["wall2"];
            controls.wall3 = $sceneStruct[controls.selectvp]["wall3"];
            controls.wall4 = $sceneStruct[controls.selectvp]["wall4"];
            controls.wallall = $sceneStruct[controls.selectvp]["wallall"];
            controls.floorTop = $sceneStruct[controls.selectvp]["floorTop"];
            controls.floorBottom = $sceneStruct[controls.selectvp]["floorBottom"];
            updateGUI();
        });
        i=1;
        for(var key in viewportsParams){
            $('select option[value="vp'+i+'"]').val(key);
            if(i==1)
                controls.selectvp = key;
            i++;
        }
        var guiWall = gui.addFolder("Видимость стен");
        guiWall.add(controls, 'wall1').name('Стена 1').onChange(hideShowObject);
        guiWall.add(controls, 'wall2').name('Стена 2').onChange(hideShowObject);
        guiWall.add(controls, 'wall3').name('Стена 3').onChange(hideShowObject);
        guiWall.add(controls, 'wall4').name('Стена 4').onChange(hideShowObject);
        guiWall.add(controls, 'wallall').name('Все стены').onChange(function(){
            $sceneStruct[controls.selectvp]["wallall"] = !$sceneStruct[controls.selectvp]["wallall"];
            controls.wallall = $sceneStruct[controls.selectvp]["wallall"];
            for(var i in guiWall.__controllers){
                if(guiWall.__controllers[i].property != 'wallall')
                {
                    if(controls.wallall != controls[guiWall.__controllers[i].property])
                        guiWall.__controllers[i].domElement.click();
                }
            }
        });
        guiWall.open();

        var guiFloor = gui.addFolder("Видимость перекрытия");
        guiFloor.add(controls, 'floorTop').name('Верхнее').onChange(hideShowObject);
        guiFloor.add(controls, 'floorBottom').name('Нижнее').onChange(hideShowObject);
        guiFloor.open();

        gui.add(controls, 'perspective').name('Перспектива').onChange(function(){
            $sceneStruct[controls.selectvp]["perspective"] = !$sceneStruct[controls.selectvp]["perspective"];
            controls.perspective = $sceneStruct[controls.selectvp]["perspective"];
            controls.switchCamera(controls.selectvp);
        });
        gui.add(controls, 'shadows').name('Тени').onChange(function(){
            $sceneStruct[controls.selectvp]["shadows"] = !$sceneStruct[controls.selectvp]["shadows"];
            controls.shadows = $sceneStruct[controls.selectvp]["shadows"];
        });

        var guiStair = gui.addFolder("Лестница");
        guiStair.add(controls, 'stairs').name("Отображать");
        guiStair.add(controls, 'frame').name("Каркас");
        guiStair.add(controls, 'steps').name("Ступени");
        guiStair.add(controls, 'fences').name("Ограждения");
	gui.close();
    };

    initStats = function () {
        var stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '100px';
        $("#Stats-output").append( stats.domElement );
        return stats;
    };

    addFloorPlane = function(viewportId, isVisible) {
        isVisible = isVisible || false;
        var planeGeometry = new THREE.PlaneGeometry(20000,20000);
        var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});

        var plane = new THREE.Mesh(planeGeometry,planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x=-0.5*Math.PI;
        plane.position.set(0, 0, 0);
        plane.visible = isVisible;
        plane.name = "floorBottom";
        $sceneStruct[viewportId]["floorBottom"] = isVisible;
        $[viewportId].add(plane);
    };

    _addWalls = function(viewportId, turnFactor){
        for(var i=1; i < 5; i++)
        {
            var visible = $sceneStruct[viewportId]["wall"+i] || false;
            //текущая стена
            var length = $('#wallLength_' + i).val();
            var height = $('#wallHeight_' + i).val();
            var thickness = $('#wallThickness_' + i).val();
            var positionX = $('#wallPositionX_' + i).val()*1 + (i>2?1:length/2) + (i==4?-thickness/2:i==3?thickness/2:0);
            var positionZ = $('#wallPositionZ_' + i).val()*1 + (i>2?length/2:thickness/2*(i==1?-1:1));
            var wallGeometry = new THREE.CubeGeometry(length,height,thickness);
            var wallMaterial = new THREE.MeshLambertMaterial({color: 0xE0E0E0, wireframe: false});//
            var wall = new THREE.Mesh(wallGeometry, wallMaterial);
            wall.position.set(positionX, height / 2, positionZ * turnFactor);
            addLedges(viewportId, wall, i);
            wall.visible = visible;
        }
    }
    addWalls = function(viewportId, isVisible)
    {
        /*вспомогательные оси*/
        var axes = new THREE.AxisHelper( 2000 );
        $[viewportId].add(axes);

        isVisible = isVisible || false;
        var wall, length, height, positionX, positionY, positionZ, thickness, turnSide, turnFactor;
        var wallGeometry, wallMaterial;
        var turnSide = $("#turnSide").val();
        var turnFactor = turnSide == "правое" ? 1 : turnSide == "левое" ? -1 : 1;
        //создаем стены
        //1 - дальняя, 2 - ближняя, 3 - правая, 4 - левая
        $sceneStruct[viewportId]["wall1"] = isVisible;
        $sceneStruct[viewportId]["wall2"] = false;
        $sceneStruct[viewportId]["wall3"] = isVisible;
        $sceneStruct[viewportId]["wall4"] = false;

        _addWalls(viewportId, turnFactor);
    };

    redrawWalls = function(){
        var turnSide = $("#turnSide").val();
        var turnFactor = turnSide == "правое" ? 1 : turnSide == "левое" ? -1 : 1;
        $.each($sceneStruct,function(k,v){
            var obj;
            //удаляем стены
            for(var i = 1; i < 5; i++){
                obj = $[k].getObjectByName('wall'+i);
                if(obj)
                     $[k].remove(obj);
            }
            _addWalls(k, turnFactor);
        });
    };
    addLedges = function(viewportId, wall, n){
        //найдем выступы, для этой стены
        var wallLedgeWidths = $('#ledgeForm [id^=wallLedgeBaseWall]').filter(function(){
            return this.value == n;
        });
        //если есть выступы для этой стены
        if(wallLedgeWidths.length) {
            //
            var x = wall.position.x,
                y = wall.position.y,
                z = wall.position.z,
                wallMaterial,
                w = wall.geometry.parameters.width,
                h = wall.geometry.parameters.height,
                d = wall.geometry.parameters.depth;
            var wallBSP = new ThreeBSP(wall);
            wallLedgeWidths.each(function (_i, val) {
                //узнаем Id текущих элементов
                var i = val.id.match(/^.*(\d+)$/)[1];
                //console.log(n+' > '+i);
                wallMaterial = new THREE.MeshLambertMaterial({color: 0xBFBFBF, wireframe: false});
                var wallLedgeWidth = $('#wallLedgeWidth' + i).val(),
                    wallLedgeType = $('#wallLedgeType' + i).val(),
                    wallLedgeBaseWall = $('#wallLedgeBaseWall' + i).val(),
                    wallLedgeHeight = $('#wallLedgeHeight' + i).val(),
                    wallLedgeDepth = $('#wallLedgeDepth' + i).val(),
                    wallLedgePosX = $('#wallLedgePosX' + i).val(),
                    wallLedgePosY = $('#wallLedgePosY' + i).val(),
                    geometry = new THREE.CubeGeometry(wallLedgeWidth, wallLedgeHeight, wallLedgeDepth),
                    ledge = new THREE.Mesh(geometry, wallMaterial);

                ledge.position.x = x - w / 2 + wallLedgeWidth / 2 + wallLedgePosX * 1;
                ledge.position.y = y - h / 2 + wallLedgeHeight / 2 + wallLedgePosY * 1;
                if (wallLedgeWidth > 0 && wallLedgeHeight > 0 && wallLedgeDepth > 0) {
                    if (wallLedgeType == "выступ") {
                        ledge.position.z = z + d / 2 + wallLedgeDepth / 2;
                        var ledgeBSP = new ThreeBSP(ledge);
                        wallBSP = wallBSP.union(ledgeBSP);
                    }
                    if (wallLedgeType == "проем") {
                        ledge.position.z = z + d / 2 - wallLedgeDepth / 2;
                        var ledgeBSP = new ThreeBSP(ledge);
                        wallBSP = wallBSP.subtract(ledgeBSP);
                    }
                }
            });

            wall = wallBSP.toMesh();
            wall.material = wallMaterial;
            wall.geometry.computeVertexNormals();
        }
        wall.name = 'wall' + n;
        wall.castShadow = true;
        wall.visible = $sceneStruct[viewportId]["wall" + n];
        wall.rotation.y = n == 3 ? 1.5 * Math.PI : n == 4 ? 0.5 * Math.PI : n == 2 ? Math.PI : 0;
        $[viewportId].add(wall);
    };
});

function addObjects(viewportId, objectsArr)
{
   //добавляем объекты в сцену
   for (i = 0; i < objectsArr.length; i++)
      $[viewportId].add(objectsArr[i]);
}

function removeObjects(viewportId, objectsArr)
{
   //удаляем объекты из сцены
   for (i = 0; i < objectsArr.length; i++)
      $[viewportId].remove(objectsArr[i]);
}
