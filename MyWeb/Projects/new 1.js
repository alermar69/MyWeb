

function setStairAngles(stringerParams, scale) {
  // верхний уголок
  if (stringerParams.a1 < 285 * scale) {
    stringerParams.anglesTopType = "У2-40х40х160";
    stringerParams.holeDist2 = stringerParams.holeDistU2_160;
    stringerParams.angle2Len = 160.0 * scale;
  }
  else {
    stringerParams.anglesTopType = "У2-40х40х200";
    stringerParams.holeDist2 = stringerParams.holeDistU2_200;
    stringerParams.angle2Len = 200.0 * scale;
  }
  // остальные уголки
  if (stringerParams.a1 > 260 * scale) {
    stringerParams.angleBottomType = "У2-40х40х230";
    stringerParams.holeDist = stringerParams.holeDistU2_230;
    stringerParams.angleLen = 230.0 * scale;
  }
  else {
    stringerParams.angleBottomType = "У2-40х40х200";
    stringerParams.holeDist = stringerParams.holeDistU2_200;
    stringerParams.angleLen = 200.0 * scale;
  }
  if (stringerParams.a1 < 230 * scale) {
    stringerParams.angleBottomType = "У2-40х40х160";
    stringerParams.holeDist = stringerParams.holeDistU2_160;
    stringerParams.angleLen = 160.0 * scale;
  }

  stringerParams.anglePosX = 25.0 * scale;
  stringerParams.anglePosY = 20.0 * scale;
}


/**
 * Тетива
 * Вычерчивает первый подъем
 */
function lt_first_step(stringerParams) {
  var hole1, hole2;

  var p0 = copyPoint(stringerParams.p0);

  // подъем
  var h_1 = stringerParams.h1 + 5;            // высота первого подъема

  var p1 = newPoint_xy(p0, 0.0, h_1);
  var p1_1 = newPoint_xy(p0, stringerParams.rad1, h_1);
  var p2 = newPoint_xy(p1_1, stringerParams.b1 - stringerParams.rad1, 0.0);
  var p3 = newPoint_xy(p0, 0.0, h_1 - stringerParams.rad1);
  var p4 = newPoint_xy(p3, stringerParams.rad1, 0.0);

  // срез передней кромки
  var p11 = newPoint_xy(p0, 0.0, 100.0);
  var p12 = polar(p11, Math.PI * (5.0 / 3.0), 30.0);
  var fil1 = fillet(p12, Math.PI * (2.0 / 3.0), p3, Math.PI * 1.5, stringerParams.rad1);

  // нижний край тетивы
  var p20 = newPoint_xy(p2, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // первая точка на нижней линии марша
  var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии
  var p00 = polar(p0, 0.0, 100.0);                         // вторая точка нижнего края косоура
  var bottomLineP1 = itercection(p0, p00, p20, p21);       // точка пересчечения нижнего края и нижней линии марша
  var fil2 = fillet(bottomLineP1, Math.PI, p11, Math.PI * (5.0 / 3.0), stringerParams.rad1);
  //addLine(stringerParams.stringerShape, dxfPrimitivesArr, bottomLineP1, fil2.start, dxfBasePoint);
  addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, dxfBasePoint);
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, fil1.start, dxfBasePoint);

  // срез передней кромки
  addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, dxfBasePoint);
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, p3, dxfBasePoint);

  // подъем
  addArc(stringerParams.stringerShape, dxfPrimitivesArr, p4, stringerParams.rad1, Math.PI, Math.PI * 0.5, dxfBasePoint);
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1_1, newPoint_xy(p2, -stringerParams.rad2, 0.0), dxfBasePoint);

  // отверстия под уголок/рамку ступени
  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
  var center2 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, dxfBasePoint);
  stringerParams.anglesPointInsert.push({ "x": center1.x - stringerParams.anglePosX, "y": center1.y + stringerParams.anglePosY });
  stringerParams.framesPointInsert.push({ "x": p1.x + 20.0, "y": p1.y - stringerParams.treadThickness - 5 });
  stringerParams.stringerShape.holes.push(hole1);
  stringerParams.stringerShape.holes.push(hole2);

  // отверстия под стойку
  if (stringerParams.stairAmt > 2) {
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p1_1, stringerParams.b1 * 0.5, stringerParams.stepHoleY);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, dxfBasePoint);
    stringerParams.stringerShape.holes.push(hole1);
    stringerParams.stringerShape.holes.push(hole2);
    // ... ограждения
  }

  // отверстия под нижний крепежный уголок
  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  center1 = newPoint_xy(bottomLineP1, -20.0, 35.0);
  center2 = newPoint_xy(center1, -60.0, 0.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, dxfBasePoint);
  stringerParams.angleBPointInsert.push({ "x": center2.x - 20.0, "y": center2.y - 35.0 });
  stringerParams.stringerShape.holes.push(hole1);
  stringerParams.stringerShape.holes.push(hole2);

  stringerParams.pstart = fil2.start;
  stringerParams.p2 = p2;
}

/**
 * Косоур
 * Вычерчивает первый подъем
 */
function ko_first_step(stringerParams) {
  var hole1, hole2;

  var p0 = copyPoint(stringerParams.p0);

  // подъем
  var h_1 = stringerParams.h1 - stringerParams.treadThickness;            // высота первого подъема

  var p1 = polar(p0, Math.PI * 0.5, h_1);

  // проступь
  var p2 = polar(p1, 0.0, stringerParams.b1);

  // нижний край косоура
  var p20 = newPoint_xy(p2, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // первая точка на нижней линии марша
  var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии
  var p00 = polar(p0, 0.0, 100.0);                         // вторая точка нижнего края косоура
  var bottomLineP1 = itercection(p0, p00, p20, p21);       // точка пересчечения нижнего края и нижней линии марша
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, bottomLineP1, p0, dxfBasePoint);

  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p0, p1, dxfBasePoint);

  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, dxfBasePoint);

  // отверстия под рамку
  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
  var center2 = newPoint_xy(p1, stringerParams.stepHoleX2, stringerParams.stepHoleY);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, dxfBasePoint);
  stringerParams.framesPointInsert.push({ "x": p1.x, "y": p1.y });
  stringerParams.stringerShape.holes.push(hole1);
  stringerParams.stringerShape.holes.push(hole2);


  // отверстия под стойку
  if (stringerParams.stairAmt > 2) {
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p1, (stringerParams.stepHoleX1 + stringerParams.stepHoleX2) * 0.5, stringerParams.stepHoleY);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, dxfBasePoint);
    stringerParams.stringerShape.holes.push(hole1);
    stringerParams.stringerShape.holes.push(hole2);
    // ... ограждения
  }

  // отверстия под нижний крепежный уголок
  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  center1 = newPoint_xy(p0, 140.0, 35.0);
  center2 = newPoint_xy(center1, 60.0, 0.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, dxfBasePoint);
  stringerParams.angleBPointInsert.push({ "x": center1.x - 20.0, "y": center1.y - 35.0 });
  stringerParams.stringerShape.holes.push(hole1);
  stringerParams.stringerShape.holes.push(hole2);

  stringerParams.pstart = bottomLineP1;
  stringerParams.p2 = p2;
}

/**
 * ЗАДАНИЕ РАСПОЛОЖЕНИЯ СТОЕК, ПЕРЕМЫЧЕК, РАЗРЕЗА СРЕДНИХ СТУПЕНЕЙ ;;;
 */
function ltko_set_railing(stringerParams) {
  // номера ступеней, где устанавливается стойка
  stringerParams.railing = [];
  // номера ступеней, где устанавливается перемычка
  stringerParams.brige = [];
  // номера ступени, разделения
  stringerParams.divide = 0;

  if (stringerParams.stairAmt == 3) {
      stringerParams.railing = [1, 3];
      stringerParams.brige = [];
  }
  if (stringerParams.stairAmt == 4) {
      stringerParams.railing = [1, 4];
      stringerParams.brige = [];
  }
  if (stringerParams.stairAmt == 5) {
      stringerParams.railing = [1, 3, 5];
      stringerParams.brige = [3];
  }
  if (stringerParams.stairAmt == 6) {
      stringerParams.railing = [1, 4, 6];
      stringerParams.brige = [4];
  }
  if (stringerParams.stairAmt == 7) {
      stringerParams.railing = [1, 4, 7];
      stringerParams.brige = [4];
  }
  if (stringerParams.stairAmt == 8) {
      stringerParams.railing = [1, 3, 6, 8];
      stringerParams.brige = [5];
  }
  if (stringerParams.stairAmt == 9) {
      stringerParams.railing = [1, 4, 6, 9];
      stringerParams.brige = [4, 6];
  }
  if (stringerParams.stairAmt == 10) {
      stringerParams.railing = [1, 4, 7, 10];
      stringerParams.brige = [4, 7];
  }
  if (stringerParams.stairAmt == 11) {
      stringerParams.railing = [1, 3, 6, 9, 11];
      stringerParams.brige = [5, 8];
      stringerParams.divide = 7;
  }
  if (stringerParams.stairAmt == 12) {
      stringerParams.railing = [1, 3, 6, 9, 12];
      stringerParams.brige = [5, 8];
      stringerParams.divide = 7;
  }
  if (stringerParams.stairAmt == 13) {
      stringerParams.railing = [1, 4, 7, 10, 13];
      stringerParams.brige = [5, 9];
      stringerParams.divide = 8;
  }
  if (stringerParams.stairAmt == 14) {
      stringerParams.railing = [1, 3, 6, 9, 12, 14];
      stringerParams.brige = [6, 10];
      stringerParams.divide = 8;
  }
  if (stringerParams.stairAmt == 15) {
      stringerParams.railing = [1, 3, 6, 9, 12, 15];
      stringerParams.brige = [6, 10];
      stringerParams.divide = 8;
  }
  if (stringerParams.stairAmt == 16) {
      stringerParams.railing = [1, 4, 7, 10, 13, 16];
      stringerParams.brige = [6, 11];
      stringerParams.divide = 9;
  }
  if (stringerParams.stairAmt == 17) {
      stringerParams.railing = [1, 3, 6, 9, 12, 15, 17];
      stringerParams.brige = [7, 12];
      stringerParams.divide = 10;
  }
  if (stringerParams.stairAmt == 18) {
      stringerParams.railing = [1, 4, 7, 10, 13, 16, 18];
      stringerParams.brige = [7, 12];
      stringerParams.divide = 11;
  }
  if (stringerParams.stairAmt == 19) {
      stringerParams.railing = [1, 4, 7, 10, 13, 16, 19];
      stringerParams.brige = [7, 12];
      stringerParams.divide = 11;
  }
}

/**
 * Тетива
 * средние ступени
 */
function lt_middle_steps(stringerParams) {
  var hole1, hole2, hole3, hole4;

  var p2 = copyPoint(stringerParams.p2);
  var p1 = copyPoint(p2);

  var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // первая точка на нижней линии марша
  var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии

  // номер ступени
  var ii = 2;                // цикл начинаем со ступени №2
  for (; ii < stringerParams.stairAmt; ii++) {
    // подъем ступени
    var p1 = copyPoint(p2);
    var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
    var p10 = newPoint_xy(p1, 0.0, stringerParams.rad2);
    var p3 = newPoint_xy(p1, 0.0, stringerParams.h1 - stringerParams.rad1);
    var pc2 = newPoint_xy(p3, stringerParams.rad1, 0.0);
    var p4 = newPoint_xy(p3, stringerParams.rad1, stringerParams.rad1);
    var p2 = newPoint_xy(p4, stringerParams.b1 - stringerParams.rad1, 0.0);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p10, p3, dxfBasePoint);
    addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 0.5, dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p4, newPoint_xy(p2, -stringerParams.rad2, 0.0), dxfBasePoint);

    p1 = newPoint_xy(p1, 0.0, stringerParams.h1);

    // отверстия под уголок/рамку ступени
    if (stringerParams.stairFrame == "есть" || (stringerParams.brige.indexOf(ii) == -1 && (ii != stringerParams.divide))) {
      hole1 = new THREE.Path();
      hole2 = new THREE.Path();
      var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
      var center2 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
      addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, dxfBasePoint);
      addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, dxfBasePoint);
      stringerParams.anglesPointInsert.push({ "x": center1.x - stringerParams.anglePosX, "y": center1.y + stringerParams.anglePosY });
      stringerParams.stringerShape.holes.push(hole1);
      stringerParams.stringerShape.holes.push(hole2);
    }
    stringerParams.framesPointInsert.push({ "x": p1.x + 20.0, "y": p1.y - stringerParams.treadThickness - 5 });

    // отверстия под перемычку
    if (stringerParams.stairFrame == "нет" && stringerParams.brige.indexOf(ii) != -1) {
      var pi = newPoint_xy(p1, 35.0, -45.0);
      stringerParams.brigePointInsert.push(pi);
      hole1 = new THREE.Path();
      hole2 = new THREE.Path();
      hole3 = new THREE.Path();
      hole4 = new THREE.Path();
      center1 = newPoint_xy(p1, 73.0, -65.0);
      center2 = newPoint_xy(center1, 0.0, -60.0);
      var center4 = newPoint_xy(center1, stringerParams.holeDist, 0.0);
      var center3 = newPoint_xy(center4, -50.0, 0.0);
      addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, dxfBasePoint);
      addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, dxfBasePoint);
      addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, dxfBasePoint);
      addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, dxfBasePoint);
      stringerParams.stringerShape.holes.push(hole1);
      stringerParams.stringerShape.holes.push(hole2);
      stringerParams.stringerShape.holes.push(hole3);
      stringerParams.stringerShape.holes.push(hole4);
    }

    // стыковка деталей тетивы
    if (ii == stringerParams.divide) {
      if (stringerParams.stairFrame == "нет") {
        var divideY = 95.0;
      }
      else {
        var divideY = stringerParams.treadThickness + 100.0; // 5.0 + 40.0 + 50.0 + 5.0
      }

      var divideP1 = newPoint_xy(p1, 0.0, -divideY);
      var divideP2 = newPoint_xy(divideP1, 20.0, 0.0);
      divideP2 = itercection(divideP1, divideP2, p20, p21);
      // точка пересчечения линии стыка и нижней линии марша
      addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, divideP1, divideP2, dxfBasePoint);
      // фланец
      p0 = newPoint_xy(p1, 10.0, -(divideY - 50.0));
      stringerParams.flanPointInsert = p0;
      flanLt(stringerParams, p0, stringerParams.stringerShape.holes);
    }

    // отверстия под стойку по центру ступени
    if (stringerParams.railing.indexOf(ii) != -1) {
      hole1 = new THREE.Path();
      hole2 = new THREE.Path();
      center1 = newPoint_xy(p1, stringerParams.b1 * 0.5, stringerParams.stepHoleY);
      center2 = newPoint_xy(center1, 0.0, -60.0);
      addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, dxfBasePoint);
      addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, dxfBasePoint);
      stringerParams.stringerShape.holes.push(hole1);
      stringerParams.stringerShape.holes.push(hole2);
      // ... ограждение
    }
  }

  stringerParams.p2 = p2;
}

/**
 * Косоур
 * средние ступени
 */
function ko_middle_steps(stringerParams) {
  var hole1, hole2;

  var p2 = copyPoint(stringerParams.p2);
  var p1 = copyPoint(p2);

  var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // первая точка на нижней линии марша
  var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии

  // номер ступени
  var ii = 2;                // цикл начинаем со ступени №2
  for (; ii < stringerParams.stairAmt; ii++) {
    // подъем ступени
    var p1 = copyPoint(p2);
    var p3 = newPoint_xy(p1, 0.0, stringerParams.h1);
    var p2 = newPoint_xy(p3, stringerParams.b1, 0.0);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p3, dxfBasePoint);
    addLine(stringerParams.stringerShape, dxfPrimitivesArr, p3, p2, dxfBasePoint);

    p1 = copyPoint(p3);

    // отверстия под рамку
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
    var center2 = newPoint_xy(p1, stringerParams.stepHoleX2, stringerParams.stepHoleY);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, dxfBasePoint);
    stringerParams.framesPointInsert.push({ "x": p3.x, "y": p3.y });
    stringerParams.stringerShape.holes.push(hole1);
    stringerParams.stringerShape.holes.push(hole2);

    // стыковка деталей косоура
    if (ii == stringerParams.divide) {
      var divideP1 = newPoint_xy(p2, -stringerParams.b1 * 0.5, 0.0);
      var divideP2 = newPoint_xy(divideP1, 0.0, -20.0);
      divideP2 = itercection(divideP1, divideP2, p20, p21);
      // точка пересчечения линии стыка и нижней линии марша
      addLine(stringerParams.stringerShapeNo, dxfPrimitivesArr, divideP1, divideP2, dxfBasePoint);
      // фланец
      p0 = newPoint_xy(p1, 5.0, -50.0);
      stringerParams.flanPointInsert = p0;
      flanKo(stringerParams, p0, stringerParams.stringerShape.holes);
    }

    // отверстия под стойку
    if (stringerParams.railing.indexOf(ii) != -1) {
      hole1 = new THREE.Path();
      hole2 = new THREE.Path();
      center1 = newPoint_xy(p1, (stringerParams.stepHoleX1 + stringerParams.stepHoleX2) * 0.5, stringerParams.stepHoleY);
      center2 = newPoint_xy(center1, 0.0, -60.0);
      addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, dxfBasePoint);
      addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, dxfBasePoint);
      stringerParams.stringerShape.holes.push(hole1);
      stringerParams.stringerShape.holes.push(hole2);
      // ... ограждение
    }
  }

  stringerParams.p2 = p2;
}

/**
 * Тетива
 * ПОСТРОЕНИЕ СОЕДИНИТЕЛЬНОГО ФЛАНЦА
 * контур
 * отверстия
 */
function flanLt(stringerParams, p0, holes) {
  if (p0 === undefined || holes === undefined) {
    stringerParams.flanShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };

    var p1 = newPoint_xy(p0, 0.0, 0.0);
    var p2 = newPoint_xy(p0, stringerParams.rad1, -100.0);
    var pc2 = newPoint_xy(p2, 0.0, stringerParams.rad1);
    var p3 = newPoint_xy(p0, stringerParams.a1 - 10.0, -(100.0 - stringerParams.rad1));
    var pc3 = newPoint_xy(p3, -stringerParams.rad1, 0.0);
    var p4 = newPoint_xy(p0, stringerParams.a1 - 10.0, 0.0);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p1,
      newPoint_xy(p1, 0.0, -(100.0 - stringerParams.rad1)), dxfBasePoint);
    addArc(stringerParams.flanShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 1.5, dxfBasePoint);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p2,
      newPoint_xy(p2, (stringerParams.a1 - 10.0 - stringerParams.rad1 - stringerParams.rad1), 0.0), dxfBasePoint);
    addArc(stringerParams.flanShape, dxfPrimitivesArr, pc3, stringerParams.rad1, Math.PI * 1.5, Math.PI * 2.0, dxfBasePoint);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p3, p4, dxfBasePoint);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p4, p1, dxfBasePoint);

    holes = stringerParams.flanShape.holes;
  }
  else {
    stringerParams.flanangle1PointInsert = newPoint_xy(p0, 5.0, 0.0);
    stringerParams.flanangle2PointInsert = newPoint_xy(p0, stringerParams.a1 - 10.0 - 5.0, 0.0);
  }

  // отверстия

  var p1 = copyPoint(p0);
  var p4 = newPoint_xy(p1, stringerParams.a1 - 10.0, 0.0);

  // левые отверстия
  var hole1 = new THREE.Path();
  var hole2 = new THREE.Path();
  var hole3 = new THREE.Path();
  var hole4 = new THREE.Path();
  var center1 = newPoint_xy(p1, 25.0, -20.0);
  var center2 = newPoint_xy(center1, 50.0, 0.0);
  var center3 = newPoint_xy(center1, 0.0, -60.0);
  var center4 = newPoint_xy(center1, 50.0, -60.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, dxfBasePoint);
  addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, dxfBasePoint);
  addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, dxfBasePoint);
  holes.push(hole1);
  holes.push(hole2);
  holes.push(hole3);
  holes.push(hole4);

  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  hole3 = new THREE.Path();
  hole4 = new THREE.Path();
  center1 = newPoint_xy(p4, -75.0, -20.0);
  center2 = newPoint_xy(center1, 50.0, 0.0);
  center3 = newPoint_xy(center1, 0.0, -60.0);
  center4 = newPoint_xy(center1, 50.0, -60.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, dxfBasePoint);
  addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, dxfBasePoint);
  addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, dxfBasePoint);
  holes.push(hole1);
  holes.push(hole2);
  holes.push(hole3);
  holes.push(hole4);
}

/**
 * Косоур
 * ПОСТРОЕНИЕ СОЕДИНИТЕЛЬНОГО ФЛАНЦА
 * контур
 * отверстия
 */
function flanKo(stringerParams, p0, holes) {
  if (p0 === undefined || holes === undefined) {
    stringerParams.flanShape = new THREE.Shape();

    var p0 = { "x": 0.0, "y": 0.0 };

    var cha = 15.0;
    var p1 = newPoint_xy(p0, 0.0, 0.0);
    var p2 = newPoint_xy(p0, 0.0, -150.0);
    var p3 = newPoint_xy(p0, stringerParams.b1 - 10.0 - cha, -150.0);
    var p4 = newPoint_xy(p0, stringerParams.b1 - 10.0, -(150.0 - cha));
    var p5 = newPoint_xy(p0, stringerParams.b1 - 10.0, 0.0);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p2, p3, dxfBasePoint);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p3, p4, dxfBasePoint);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p4, p5, dxfBasePoint);
    addLine(stringerParams.flanShape, dxfPrimitivesArr, p5, p1, dxfBasePoint);

    holes = stringerParams.flanShape.holes;
  }

  // отверстия

  var p1 = copyPoint(p0);
  var p4 = newPoint_xy(p1, stringerParams.b1 - 10.0, 0.0);

  // левые отверстия
  var hole1 = new THREE.Path();
  var hole2 = new THREE.Path();
  var hole3 = new THREE.Path();
  var hole4 = new THREE.Path();
  var center1 = newPoint_xy(p1, 25.0, -20.0);
  var center2 = newPoint_xy(center1, 50.0, 0.0);
  var center3 = newPoint_xy(center1, 0.0, -110.0);
  var center4 = newPoint_xy(center3, 50.0, 0.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, dxfBasePoint);
  addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, dxfBasePoint);
  addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, dxfBasePoint);
  holes.push(hole1);
  holes.push(hole2);
  holes.push(hole3);
  holes.push(hole4);

  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  hole3 = new THREE.Path();
  hole4 = new THREE.Path();
  center1 = newPoint_xy(p4, -25.0, -20.0);
  center2 = newPoint_xy(center1, -50.0, 0.0);
  center3 = newPoint_xy(center1, 0.0, -110.0);
  center4 = newPoint_xy(center3, -50.0, 0.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, dxfBasePoint);
  addCircle(hole3, dxfPrimitivesArr, center3, stringerParams.holeRad, dxfBasePoint);
  addCircle(hole4, dxfPrimitivesArr, center4, stringerParams.holeRad, dxfBasePoint);
  holes.push(hole1);
  holes.push(hole2);
  holes.push(hole3);
  holes.push(hole4);
}

/**
 * Тетива
 * последняя ступень
 */
function lt_last_step(stringerParams) {
  var p1 = copyPoint(stringerParams.p2);
  var p2 = newPoint_xy(p1, 0.0, stringerParams.h1);

  var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // первая точка на нижней линии марша
  var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии

  // подъем ступени
  var pc1 = newPoint_xy(p1, -stringerParams.rad2, stringerParams.rad2);
  var p10 = newPoint_xy(p1, 0.0, stringerParams.rad2);
  var p3 = newPoint_xy(p1, 0.0, stringerParams.h1 - stringerParams.rad1);
  addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc1, stringerParams.rad2, Math.PI * 1.5, Math.PI * 2.0, dxfBasePoint);
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p10, p3, dxfBasePoint);

  // проступь
  p1 = copyPoint(p2);
  if (stringerParams.topFlan == "есть") {
    p2 = newPoint_xy(p2, stringerParams.a1 + 13.0, 0.0);
  }
  else {
    p2 = newPoint_xy(p2, stringerParams.a1 + 5.0, 0.0);
  }
  var pc2 = newPoint_xy(p3, stringerParams.rad1, 0.0);
  var p4 = newPoint_xy(p3, stringerParams.rad1, stringerParams.rad1);
  addArc(stringerParams.stringerShape, dxfPrimitivesArr, pc2, stringerParams.rad1, Math.PI, Math.PI * 0.5, dxfBasePoint);
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p4, p2, dxfBasePoint);

  // отверстия под уголок/рамку ступени
  var hole1 = new THREE.Path();
  var hole2 = new THREE.Path();
  var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
  var center2 = newPoint_xy(center1, stringerParams.holeDist2, 0.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, dxfBasePoint);
  stringerParams.anglesPointInsert.push({ "x": center1.x - stringerParams.anglePosX, "y": center1.y + stringerParams.anglePosY });
  stringerParams.framesPointInsert.push({ "x": p1.x + 20.0, "y": p1.y - stringerParams.treadThickness - 5.0 });
  stringerParams.stringerShape.holes.push(hole1);
  stringerParams.stringerShape.holes.push(hole2);

  // отверстия под стойку
  if (stringerParams.stairAmt > 2) {
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p1, stringerParams.b1 * 0.5, stringerParams.stepHoleY);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, dxfBasePoint);
    stringerParams.stringerShape.holes.push(hole1);
    stringerParams.stringerShape.holes.push(hole2);
      // ... ограждение
  }

  // Задняя кромка
  p1 = copyPoint(p2);
  var fil1 = fillet(p2, Math.PI * 1.5, p20, stringerParams.stairAngle1, stringerParams.rad1);
  var fil2 = fillet(p20, stringerParams.stairAngle1 + Math.PI, stringerParams.pstart, 0.0, stringerParams.rad1);
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, fil1.start, dxfBasePoint);
  addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil1.center, stringerParams.rad1, fil1.angstart, fil1.angend, dxfBasePoint);
  // нижняя линия марша
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil1.end, fil2.start, dxfBasePoint);
  addArc(stringerParams.stringerShape, dxfPrimitivesArr, fil2.center, stringerParams.rad1, fil2.angstart, fil2.angend, dxfBasePoint);
  // низ
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, fil2.end, stringerParams.pstart, dxfBasePoint);


  // отверстия под верхний крепежный уголок
  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  var angleOffset;
  if (stringerParams.stairFrame == "есть") {
    angleOffset = - (stringerParams.treadThickness + 65.0);
  }
  else {
    if (stringerParams.a1 < 245) {
      angleOffset = -105;
    }
    else {
      angleOffset = -65;
    }
  }

  if (stringerParams.topFlan == "есть") {
    center1 = newPoint_xy(p1, -48.0, angleOffset);
  }
  else {
    center1 = newPoint_xy(p1, -40.0, angleOffset);
  }
  center2 = newPoint_xy(center1, 0.0, -60.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, dxfBasePoint);
  stringerParams.angleUPointInsert.push({ "x": center2.x + 35.0, "y": center2.y - 20.0 });
  stringerParams.stringerShape.holes.push(hole1);
  stringerParams.stringerShape.holes.push(hole2);
}

/**
 * Косоур
 * последняя ступень
 */
function ko_last_step(stringerParams) {
  var p1 = copyPoint(stringerParams.p2);
  var p2 = newPoint_xy(p1, 0.0, stringerParams.h1);

  var p20 = newPoint_xy(p1, (stringerParams.stringerWidth / Math.sin(stringerParams.stairAngle1)), 0.0) // первая точка на нижней линии марша
  var p21 = polar(p20, stringerParams.stairAngle1, 100.0); // вторая точка на нижней линии

  // подъем ступени
  //var p3 = newPoint_xy(p2, stringerParams.b1, 0.0);
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, dxfBasePoint);
  //addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, p3, dxfBasePoint);

  // проступь
  p1 = copyPoint(p2);
  if (stringerParams.topFlan == "есть") {
    p2 = newPoint_xy(p2, stringerParams.b1 + 8.0, 0.0);
  }
  else {
    p2 = newPoint_xy(p2, stringerParams.b1, 0.0);
  }
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p1, p2, dxfBasePoint);

  // отверстия под рамку
  var hole1 = new THREE.Path();
  var hole2 = new THREE.Path();
  var center1 = newPoint_xy(p1, stringerParams.stepHoleX1, stringerParams.stepHoleY);
  var center2 = newPoint_xy(p1, stringerParams.stepHoleX2, stringerParams.stepHoleY);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, dxfBasePoint);
  stringerParams.framesPointInsert.push({ "x": p1.x, "y": p1.y });
  stringerParams.stringerShape.holes.push(hole1);
  stringerParams.stringerShape.holes.push(hole2);

  // отверстия под стойку
  if (stringerParams.stairAmt > 2) {
    hole1 = new THREE.Path();
    hole2 = new THREE.Path();
    center1 = newPoint_xy(p1, (stringerParams.stepHoleX1 + stringerParams.stepHoleX2) * 0.5, stringerParams.stepHoleY);
    center2 = newPoint_xy(center1, 0.0, -60.0);
    addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, dxfBasePoint);
    addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, dxfBasePoint);
    stringerParams.stringerShape.holes.push(hole1);
    stringerParams.stringerShape.holes.push(hole2);
      // ... ограждение
  }

  // Задняя кромка
  var p00 = newPoint_xy(p2, 0.0, -100.0);
  var bottomLineP2 = itercection(p2, p00, p20, p21);       // точка пересечения нижней линии марша и задней кромки
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, p2, bottomLineP2, dxfBasePoint);
  // нижняя линия марша
  addLine(stringerParams.stringerShape, dxfPrimitivesArr, bottomLineP2, stringerParams.pstart, dxfBasePoint);

  // отверстия под верхний крепежный уголок
  hole1 = new THREE.Path();
  hole2 = new THREE.Path();
  if (stringerParams.topFlan == "есть") {
    center1 = newPoint_xy(p2, -48.0, -70.0);
  }
  else {
    center1 = newPoint_xy(p2, -40.0, -70.0);
  }
  center2 = newPoint_xy(center1, 0.0, -60.0);
  addCircle(hole1, dxfPrimitivesArr, center1, stringerParams.holeRad, dxfBasePoint);
  addCircle(hole2, dxfPrimitivesArr, center2, stringerParams.holeRad, dxfBasePoint);
  stringerParams.angleUPointInsert.push({ "x": center2.x + 35.0, "y": center2.y - 20.0 });
  stringerParams.stringerShape.holes.push(hole1);
  stringerParams.stringerShape.holes.push(hole2);
}



/**
 * косоур или тетива
 * прямой одномаршевой лестницы
 */
function drawStringer0(stringerParams, scale) {
    var stringerOffset_x = 0;
    var stringerOffset_y = 0;

    stringerParams.stringerShape = new THREE.Shape();
    stringerParams.stringerShapeNo = new THREE.Shape();

    // константы
    stringerParams.holeRad = 6.5 * scale;            // радиус (диаметра) отверстий в тетивах
    stringerParams.stepHoleX1 = 45 * scale;          // координата Х первого отверстия крепления уголка ступени относительно угла косоура
    stringerParams.holeDistU2_230 = 180 * scale;     // расстояние между отверстиями для уголка У2-230
    stringerParams.holeDistU2_200 = 150 * scale;     // расстояние между отверстиями для уголка У2-200
    stringerParams.holeDistU2_160 = 110 * scale;     // расстояние между отверстиями для уголка У2-160
    stringerParams.stepHoleY = -65 * scale;          // координата Y отверстий крепления уголка ступени
    stringerParams.stringerWidth = 150 * scale;      // ширина тетивы
    stringerParams.rad1 = 10.0 * scale;              // Радиус скругления внешних углов
    stringerParams.rad2 = 5.0 * scale;               // Радиус скругления внутренних углов
    stringerParams.stairAngle1 = Math.atan(stringerParams.h1 / stringerParams.b1);   // вычисляем угол наклона лестницы

    if (stringerParams.stairAmt > 10) {      // марш более 10 ступеней шириной 200мм
      stringerParams.stringerWidth = 200.0 * scale;
    }

    stringerParams.railingModel = "нет";
    stringerParams.railingSide_1 = "нет";
    stringerParams.railingPresence = "есть";

    if (stringerParams.railingSide_1 == "нет") {
      stringerParams.railingModel = "нет";
    }
    if (stringerParams.railingSide_1 != "нет") stringerParams.railingPresence = "есть";

    setStairAngles(stringerParams, scale);

    if (stringerParams.model == "ко") {
      stringerOffset_x = stringerParams.a1 - stringerParams.b1;
      //stringerOffset_y = stringerParams.treadThickness;
      //if (stringerParams.frameType == "уг") {
      //  stringerParams.stepHoleX1 = 25.0 * scale;
      //  stringerParams.stepHoleX2 = 175.0 * scale;
      //}
      //else {
      //  stringerParams.stepHoleX1 = 35.0 * scale;
      //  stringerParams.stepHoleX2 = 165.0 * scale;
      //}
      stringerParams.stepHoleX2 = stringerParams.b1 - 45.0 * scale;
      stringerParams.stepHoleY = -20.0 * scale;      // координата Y отверстий крепления рамки

      stringerParams.p0 = { "x": stringerOffset_x, "y": -stringerOffset_y };

      // первая ступень
      ko_first_step(stringerParams);

      // средние ступени
      ltko_set_railing(stringerParams);
      ko_middle_steps(stringerParams);

      // последняя ступень
      ko_last_step(stringerParams);
    }
    else {
      stringerParams.p0 = { "x": stringerOffset_x, "y": -stringerOffset_y };

      if (stringerParams.stairFrame == "есть") {
        stringerParams.stepHoleX1 = 65.0 * scale;
        stringerParams.holeDist = stringerParams.a1 - (40.0 + 90.0) * scale;
        stringerParams.holeDist2 = stringerParams.a1 - (40.0 + 90.0) * scale;
        stringerParams.stepHoleY = -(stringerParams.treadThickness + 20.0 + 5.0) * scale;      // координата Y отверстий крепления рамки
      }

      // первая ступень
      lt_first_step(stringerParams);

      // средние ступени
      ltko_set_railing(stringerParams);
      lt_middle_steps(stringerParams);

      // последняя ступень
      lt_last_step(stringerParams);
    }

    return stringerParams;
} //end of drawStringer0


var stringerPlatformHeight = 150;

/*внешний косоур нижнего марша*/

function drawStringer1(
                model, stringerTurn , stringerType,
                h1, b1, a1, stairAmt1, h3, L1, L2,
                turnLength, scale, stringerSideOffset) {

    var stringerOffset_x = 0;
    var stringerOffset_y = 0;

    if (model == "ко") {
        stringerOffset_x = a1-b1;
        stringerOffset_y = treadThickness;
        }
    //console.log ("stringerOffset_x = " + stringerOffset_x);
    var stringerShape = new THREE.Shape();
    stringerShape.moveTo(stringerOffset_x*scale, 0);

if (stairAmt1 == 0 ) {
/* STRINGER TOP LINE */
    if (stringerTurn == "площадка"){
        x1 = stringerOffset_x*scale;
        y1 = -stringerOffset_x*scale + h1*scale;
        stringerShape.lineTo(x1, y1);
        x2 = x1 + turnLength*scale - stringerOffset_x*scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);
        }
    if (stringerTurn == "забег"){
        //забег 1
        x1 = stringerOffset_x*scale;;
        y1 = -stringerOffset_x*scale + h1*scale;
        stringerShape.lineTo(x1, y1);
        x2 = x1 + L2 *(turnLength - stringerSideOffset) / turnLength *scale;
        y2 = y1;
        if (stringerType != "прямая") stringerShape.lineTo(x2, y2);
        //сохраняем точку
        x1t = x1;
        y1t = y1;

        //забег 2
        x1 = x2;
        y1 = y2 + h3*scale;
        stringerShape.lineTo(x1, y1);
        x2 = x1t + turnLength*scale - stringerOffset_x*scale;;
        y2 = y1;
        stringerShape.lineTo(x2, y2);

        //зад площадки
        if (stringerType != "ломаная") {
            p1_x = x2;
            p1_y = y2 - Math.max(h1, h3)*scale;
            stringerShape.lineTo(p1_x, p1_y);
            }
        else {
            p1_x = x2;
            p1_y = y2 - stringerWidth*scale;
            stringerShape.lineTo(p1_x, p1_y);
            }

        }



    /* STRINGER BOTTOM LINE */
    if (stringerTurn == "площадка"){
        stringerShape.lineTo(x2, 0);
        stringerShape.moveTo(stringerOffset_x*scale, 0);
        }
    if (stringerTurn == "забег"){
        if (stringerType == "ломаная") {
            x1 = x1t + L2 *(turnLength - stringerSideOffset) / turnLength *scale + stringerWidth*scale;
            y1 = p1_y
            stringerShape.lineTo(x1, y1);
            x2 = x1;
            y2 = y1 - h3*scale
            stringerShape.lineTo(x2, y2);

            x2 = x2-L2*scale;
            stringerShape.lineTo(x2, y2);
            stringerShape.lineTo(x2, 0);
            stringerShape.moveTo(stringerOffset_x*scale, 0);


            }
        else {
            stringerShape.lineTo(b1*scale, 0);
            stringerShape.moveTo(stringerOffset_x*scale, 0);
            }
        }
}


else { // ненулевое количество ступеней в марше

/* STRINGER TOP LINE */

if (stringerType == "пилообразная" || stringerType == "ломаная") {
    for (var i = 1; i < stairAmt1; i++) {
        x1 = b1*(i-1)*scale + stringerOffset_x*scale;
        y1 = h1*i*scale - stringerOffset_y*scale;
        stringerShape.lineTo(x1, y1);
        x2 = x1 + b1*scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);
        }

    if (stairAmt1 == 1) {
        x2 = stringerOffset_x*scale;
        y2 = -stringerOffset_y*scale;
        }

    if (stringerTurn == "площадка"){

    x1 = x2;
    y1 = y2 + h1*scale;
    stringerShape.lineTo(x1, y1);
    x2 = x1 + b1*scale;
    y2 = y1;
    stringerShape.lineTo(x2, y2);

    //площадка
    x1 = x2;
    y1 = y2 + h1*scale;
    stringerShape.lineTo(x1, y1);
    x2 = x1 + turnLength*scale - stringerOffset_y*scale;
    y2 = y1;
    stringerShape.lineTo(x2, y2);
    }

    if (stringerTurn == "забег"){
      //последний подъем
    x1 = x2;
    y1 = y2 + h1*scale;
    stringerShape.lineTo(x1, y1);
    x2 = x1 + b1*scale;
    y2 = y1;
    stringerShape.lineTo(x2, y2);

    //забег 1
    x1 = x2;
    y1 = y2 + h1*scale;
    stringerShape.lineTo(x1, y1);
    x2 = x1 + L2 *(turnLength - stringerSideOffset) / turnLength *scale;
    y2 = y1;
    stringerShape.lineTo(x2, y2);
    //сохраняем точку
    x1t = x1;
    y1t = y1;

    //забег 2
    x1 = x2;
    y1 = y2 + h3*scale;
    stringerShape.lineTo(x1, y1);
    x2 = x1t + turnLength*scale - stringerOffset_x*scale;;
    y2 = y1;
    stringerShape.lineTo(x2, y2);

    }

    //зад площадки
    if (stringerType != "ломаная") {
        p1_x = x2;
        p1_y = y2 - Math.max(h1, h3)*scale;
        stringerShape.lineTo(p1_x, p1_y);
        }
    else {
        p1_x = x2;
        p1_y = y2 - stringerWidth*scale;
        stringerShape.lineTo(p1_x, p1_y);
        }

}
if (stringerType == "прямая") {
    stringerShape.lineTo(0, h1*scale);

    if (stringerTurn == "площадка"){

    //верхняя линия марша
    x1 = b1*stairAmt1*scale;
    y1 = h1*(stairAmt1 +1)*scale;
    stringerShape.lineTo(x1, y1);

    //площадка
    x2 = x1 + turnLength*scale;
    y2 = y1;
    stringerShape.lineTo(x2, y2);

    //зад площадки
    p1_x = x2;
    p1_y = y2 - Math.max(h1, h3)*scale;
    stringerShape.lineTo(p1_x, p1_y);
    }

    if (stringerTurn == "забег"){
      //последний подъем
    x1 = b1*stairAmt1*scale;
    y1 = h1*(stairAmt1+1)*scale;
    stringerShape.lineTo(x1, y1);

    //забег 1
    x1 = x1 + L2 *scale;
    y1 = y1 + h3*scale;
    stringerShape.lineTo(x1, y1);

    //сохраняем точку
    x1t = x1 - L2 *scale;
    y1t = y1 - h3*scale;

    //забег 2
    x2 = x1t + turnLength*scale;
    y2 = y1t + h3*scale;
    stringerShape.lineTo(x2, y2);

    //зад площадки
    p1_x = x2;
    p1_y = y2 - Math.max(h1, h3)*scale;
    stringerShape.lineTo(p1_x, p1_y);
    }

}

/* STRINGER BOTTOM LINE */

if (stringerType == "пилообразная" || stringerType == "прямая") {
    if (stringerTurn == "площадка"){
        x2 = p1_x - turnLength*scale + b1 * scale + stringerOffset_y*scale;
        y2 = p1_y;
        stringerShape.lineTo(x2, y2);
        }

    if (stringerTurn == "забег"){
        x2 = x1t + b1 * scale;
        y2 = y1t - h1*scale;
        stringerShape.lineTo(x2, y2);
        }

        stringerShape.lineTo(b1*scale, 0);
        stringerShape.lineTo(0, 0);
    }
if (stringerType == "ломаная") {
    if (stringerTurn == "площадка"){
        x2 = p1_x - turnLength*scale + stringerWidth * scale + stringerOffset_y*scale;
        y2 = p1_y;
        stringerShape.lineTo(x2, y2);
        x1 = x2;
        y1 = y2 - h1*scale;
        stringerShape.lineTo(x1, y1);
        }

    if (stringerTurn == "забег"){
        x2 = p1_x - (turnLength - L2)*scale + stringerWidth * scale;
        y2 = p1_y;
        stringerShape.lineTo(x2, y2);
        x1 = x2;
        y1 = y2 - h3*scale;
        stringerShape.lineTo(x1, y1);
        x2 = x1 - L2*scale //+ stringerWidth * scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);
        x1 = x2;
        y1 = y2 - h1*scale;
        stringerShape.lineTo(x1, y1);
        }


        for (var i = 1; i < stairAmt1; i++) {
            x2 = x1 - b1*i*scale;
            y2 = y1 - h1*(i-1)*scale;
            stringerShape.lineTo(x2, y2);
            y2 = y2 - h1*scale
            stringerShape.lineTo(x2, y2);
            }
        //y2 = y2 - h1*scale
        //stringerShape.lineTo(x2, y2);
        x2 = x2 - b1*scale;
        stringerShape.lineTo(x2, y2);
        stringerShape.lineTo((stringerWidth + stringerOffset_x) * scale, 0);
        stringerShape.lineTo(stringerOffset_x*scale, 0);

    }
}//end of stairAmt1 > 2
    return stringerShape;
} //end of drawStringer1


/*внутренний косоур нижнего марша*/

function drawStringer2(
            model, stringerTurn , stringerType,
            h1, b1, a1, stairAmt1, h3, L1, L2,
            turnLength, scale, stringerSideOffset) {

    if (stringerTurn == "площадка"){
        var stringerShape = drawStringer1(
                                model, stringerTurn , stringerType,
                                h1, b1,a1, stairAmt1, h3, L1, L2,
                                turnLength, scale, stringerSideOffset);
        return stringerShape;
        }



    if (stringerTurn == "забег"){
        var stringerOffset_x = 0;
        var stringerOffset_y = 0;

        if (model == "ко") {
            stringerOffset_x = a1-b1;
            stringerOffset_y = treadThickness;
            }

        var stringerShape = new THREE.Shape();
        stringerShape.moveTo(stringerOffset_x*scale, 0);



        if (stairAmt1 == 0) {
            x1 = stringerOffset_x*scale
            y1 = h1*scale - stringerOffset_y*scale;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + 100*scale;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
            stringerShape.lineTo(x2, 0);
            stringerShape.lineTo(stringerOffset_x*scale, 0);

            return stringerShape;
            }

    /* STRINGER TOP LINE */
        if (stringerType == "пилообразная" || stringerType == "ломаная") {
            for (var i = 1; i < stairAmt1; i++) {
                x1 = b1*(i-1)*scale + stringerOffset_x*scale;
                y1 = h1*i*scale - stringerOffset_y*scale;
                stringerShape.lineTo(x1, y1);
                x2 = x1 + b1*scale;
                y2 = y1;
                stringerShape.lineTo(x2, y2);
                }
            if (stairAmt1 == 1) {
                x2 = stringerOffset_x*scale;
                y2 = -stringerOffset_y*scale;
                }

            //последний подъем
            x1 = x2// + b1*scale;
            y1 = y2 + h1*scale;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + b1*scale;
            y2 = y1;
            stringerShape.lineTo(x2, y2);

            //забег 1
            x1 = x2;
            y1 = y2 + h1*scale;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + L1*scale;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
            //сохраняем точку
            x1t = x1;
            y1t = y1;

            //зад площадки
            if (stringerType != "ломаная"){
                p1_x = x2;
                p1_y = y2 - h1*scale - (b1 - L1) * h1 * scale / b1;
                stringerShape.lineTo(p1_x, p1_y);
                }
            else {
                p1_x = x2;
                p1_y = y2 - h1*scale - stringerWidth*scale;
                stringerShape.lineTo(p1_x, p1_y);

                }

            }
        if (stringerType == "прямая") {
            stringerShape.lineTo(0, h1*scale);

            x1 = b1*stairAmt1*scale;
            y1 = h1*(stairAmt1+1)*scale;
            stringerShape.lineTo(x1, y1);

            x2 = x1 + L1 *scale;
            y2 = y1;
            stringerShape.lineTo(x2, y2);

            //зад площадки
            x1 = x2;
            y1 = y2 - h1*scale - (b1 - L1) * h1 * scale / b1;
            stringerShape.lineTo(x1, y1);
            }

        /*stringer bottom line*/
        if (stringerType == "пилообразная" || stringerType == "прямая") {
            stringerShape.lineTo(b1*scale, 0);
            stringerShape.lineTo(0, 0);
            }

        if (stringerType == "ломаная") {
            x2 = p1_x - b1*scale - L1*scale + stringerWidth*scale;
            y2 = p1_y;
            stringerShape.lineTo(x2, y2);
            x1 = x2;
            y1 = y2 - h1*scale;
            stringerShape.lineTo(x1, y1);



        for (var i = 1; i < stairAmt1-1; i++) {
            x2 = x1 - b1*i*scale;
            y2 = y1 - h1*(i-1)*scale;
            stringerShape.lineTo(x2, y2);
            y2 = y2 - h1*scale
            stringerShape.lineTo(x2, y2);
            }

        x2 = x2 - b1*scale;
        stringerShape.lineTo(x2, y2);
        stringerShape.lineTo(stringerWidth * scale, 0);
        stringerShape.moveTo(stringerOffset_x*scale, 0);

            }

        return stringerShape;
        }



} //end of drawStringer2


/*внешний косоур верхнего марша*/

function drawStringer3(model, stringerTurn , stringerType, h1, b1, stairAmt1, h3, b3, stairAmt3, a3, L1, L2, turnLength, scale, stringerSideOffset) {

    var stringerOffset_x = 0;
    var stringerOffset_y = 0;

    if (model == "ко") {
        stringerOffset_x = a3-b3;
        stringerOffset_y = treadThickness;
        }

    var stringerShape = new THREE.Shape();
    stringerShape.moveTo(stringerOffset_x*scale, -stringerOffset_y*scale);

    /*stringer top line*/
    if (stringerType == "пилообразная" || stringerType == "ломаная") {

    if (stringerTurn == "площадка"){

    //площадка
    x1 = stringerOffset_x*scale;
    y1 = Math.max(h1, h3)*scale - stringerOffset_y*scale;
    if (stringerType == "ломаная") y1 = stringerWidth*scale - stringerOffset_y*scale;
    stringerShape.lineTo(x1, y1);
    x2 = x1 + turnLength*scale;
    y2 = y1;
    stringerShape.lineTo(x2, y2);

    //прямые ступени
    x0 = x2;
    y0 = y2;
    for (var i = 1; i < stairAmt3; i++) {
        x1 = b3*(i-1)*scale + x0;
        y1 = h3*i*scale + y0
        stringerShape.lineTo(x1, y1);
        x2 = b3*i*scale + x0;
        y2 = h3*i*scale + y0;
        stringerShape.lineTo(x2, y2);
        }

    //последний подъем
    if (stairAmt3 !=0) {
        x1 = x2;
        y1 = y2 + h3*scale;
        stringerShape.lineTo(x1, y1);
        x2 = x1 + a3*scale - stringerOffset_x*scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);
        }
    }

    if (stringerTurn == "забег"){

    //первый забег
    x1 = stringerOffset_x*scale;
    y1 = Math.max(h1, h3)*scale - stringerOffset_y*scale;
    if (stringerType == "ломаная") y1 = stringerWidth*scale - stringerOffset_y*scale;
    stringerShape.lineTo(x1, y1);
    x2 = x1 + (turnLength-L2)*scale;
    if (model == 'ко') x2 = (turnLength + L1 - (turnLength - stringerSideOffset)*Math.tan(Math.PI/6))*scale;
    y2 = y1;
    stringerShape.lineTo(x2, y2);
    //сохраняем точку
    x1t = x2;
    y1t = y2;

    //второй забег
    x1 = x2;
    y1 = y2 + h3*scale;
    stringerShape.lineTo(x1, y1);
    x2 = turnLength*scale;
    if (model == 'ко') x2 = x2 + L1*scale;
    y2 = y1;
    stringerShape.lineTo(x2, y2);
    //сохраняем
    x2t = x2;
    y2t = y2;


    //прямые ступени
    x0 = x2;
    y0 = y2;
    for (var i = 1; i < stairAmt3; i++) {
        x1 = b3*(i-1)*scale + x0;
        y1 = h3*i*scale + y0
        stringerShape.lineTo(x1, y1);
        x2 = b3*i*scale + x0;
        y2 = h3*i*scale + y0;
        stringerShape.lineTo(x2, y2);
        }

        if (stairAmt3 ==0) {
            x2 = x2 + L1*scale - stringerOffset_x*scale;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
            }
        else {
            //последний подъем
            x1 = x2;
            y1 = y2 + h3*scale;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + a3*scale - stringerOffset_x*scale;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
            }

    }
    //зад марша
    p1_x = x2;
    p1_y = y2 - h3*scale;
    if (stringerType == "ломаная") p1_y = y2 - stringerWidth*scale;
    stringerShape.lineTo(p1_x, p1_y);
    }

    if (stringerType == "прямая") {
        if (stringerTurn == "площадка"){

    //площадка
    x1 = 0;
    y1 = Math.max(h1, h3)*scale;
    stringerShape.lineTo(x1, y1);
    x2 = x1 + turnLength*scale - b3*scale;
    y2 = y1;
    stringerShape.lineTo(x2, y2);

    if (stairAmt3 ==0){
        x2 = x2 + b3*scale;
        stringerShape.lineTo(x2, y2);
        }
    else{
        //последний подъем
        x1 = b3*stairAmt3*scale + x2;
        y1 = h3*stairAmt3*scale + y2;
        stringerShape.lineTo(x1, y1);
        x2 = x1 + a3*scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);
        }

    //зад марша
    x1 = x2;
    y1 = y2 - h3*scale;
    stringerShape.lineTo(x1, y1);

    }

    if (stringerTurn == "забег"){

    //первый забег
    x1 = 0;
    y1 = Math.max(h1, h3)*scale;
    stringerShape.lineTo(x1, y1);

    //сохраняем точку
    x1t = x1 + (turnLength-L2)*scale;
    y1t = y1;

    //второй забег
    x1 = x1 + (turnLength-L2)*scale;
    y1 = y1 + h3*scale;
    stringerShape.lineTo(x1, y1);

    if (stairAmt3 ==0){
        x2 = x1 + L1*scale + L2*scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);
        //сохраняем
        x2t = x2;
        y2t = y2 + h3*scale;
        }

    else {
        x2 = x1 + L2*scale;
        y2 = y1 + h3*scale;
        stringerShape.lineTo(x2, y2);
        //сохраняем
        x2t = x2;
        y2t = y2 - h3*scale;
        //последний подъем
        x1 = x2 + b3*(stairAmt3-1)*scale;
        y1 = y2 + h3*(stairAmt3-1)*scale;
        stringerShape.lineTo(x1, y1);
        x2 = x1 + a3*scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);
        }

    //зад марша
    x1 = x2;
    y1 = y2 - h3*scale;
    stringerShape.lineTo(x1, y1);

    }



    }//end of stringerType == "прямая"


    /*stringer bottom line*/

    if (stringerType == "пилообразная" || stringerType == "прямая") {

    if (stringerTurn == "площадка"){
        x2 = turnLength*scale + stringerOffset_x*scale;;
        y2 = -stringerOffset_y*scale;
        stringerShape.lineTo(x2, y2);
        }

    if (stringerTurn == "забег"){
        if (stairAmt3 !=0 || stringerType == "пилообразная") {
            x1 = x2t;
            y1 = y2t - h3*scale;
            stringerShape.lineTo(x1, y1);
            x2 = x1t;
            y2 = y1t - Math.max(h1, h3)*scale;
            stringerShape.lineTo(x2, y2);
            }
        }
    }

    if (stringerType == "ломаная") {
        if (stairAmt3 !=0) {
            x2 = p1_x - a3*scale + stringerWidth*scale;
            y2 = p1_y;
            stringerShape.lineTo(x2, y2);
            x1 = x2;
            y1 = y2 - h3*scale;
            stringerShape.lineTo(x1, y1);

        for (var i = 1; i < stairAmt3; i++) {
            x2 = x1 - b3*i*scale;
            y2 = y1 - h3*(i-1)*scale;
            stringerShape.lineTo(x2, y2);
            y2 = y2 - h3*scale
            stringerShape.lineTo(x2, y2);
            }

        if (stringerTurn == "площадка"){

            x2 = turnLength*scale// + a3*scale;
            y2 = -stringerOffset_y*scale;
            stringerShape.lineTo(x2, y2);
            }

        if (stringerTurn == "забег"){
            x1 = x2 - L2*scale;
            if (model == 'ко') x1 = x2 + (L1 - (turnLength - stringerSideOffset)*Math.tan(Math.PI/6))*scale;
            y1 = y2// - h3*scale;
            stringerShape.lineTo(x1, y1);
            x2 = x1;
            y2 = y1 - h3*scale;
            stringerShape.lineTo(x2, y2);
            }
        }

    if (stairAmt3 ==0 && stringerTurn == "забег") {
        x2 = p1_x - (L1 + L2 - stringerWidth-stringerOffset_x)*scale;
        y2 = p1_y;
        stringerShape.lineTo(x2, y2);
        y2 = y2 - h3*scale;
        stringerShape.lineTo(x2, y2);
        }
    }
        //stringerShape.lineTo(0, 0);
        stringerShape.lineTo(stringerOffset_x*scale, -stringerOffset_y*scale);





return stringerShape;
}//end of drawStringer3


/*внутренний косоур верхнего марша*/

function drawStringer4 (model, stringerTurn , stringerType, h1, b1, stairAmt1, h3, b3, stairAmt3, a3, L1, L2, turnLength, scale, stringerSideOffset) {

    var stringerOffset_x = 0;
    var stringerOffset_y = 0;

    if (model == "ко") {
        stringerOffset_x = a3-b3;
        stringerOffset_y = treadThickness;
        }

    var stringerShape = new THREE.Shape();
    //stringerShape.moveTo(stringerOffset_x*scale, 0);
    stringerShape.moveTo(0, 0);

    /*stringer top line*/
    if (stringerType == "пилообразная" || stringerType == "ломаная") {

    if (stringerTurn == "площадка"){
            //выступ под площадкой
            if (model == "ко") {
            //console.log (stringerSideOffset);
            //
            x1 = -stringerSideOffset*scale;
            y1 = 0;
            stringerShape.lineTo(x1, y1);
            x2 = x1;
            y2 = h3*scale - stringerOffset_y*scale;
            stringerShape.lineTo(x2, y2);
            x2 = 0//stringerSideOffset*scale;
            stringerShape.lineTo(x2, y2);
            }
        else {
            //первый подъем
            x2 = 0//stringerOffset_x*scale;
            y2 = h3*scale - stringerOffset_y*scale;
            stringerShape.lineTo(x2, y2);
            }

        //прямые ступени
        x0 = x2;
        y0 = y2;
        for (var i = 1; i < stairAmt3; i++) {
            x1 = b3*(i-1)*scale + x0;
            y1 = h3*i*scale + y0
            stringerShape.lineTo(x1, y1);
            x2 = b3*i*scale + x0;
            y2 = h3*i*scale + y0;
            stringerShape.lineTo(x2, y2);
            }
        }


    if (stringerTurn == "забег"){
    //выступ под площадкой
        if (model == "ко") {
            x1 = -stringerSideOffset*scale;
            y1 = 0;
            stringerShape.lineTo(x1, y1);
            x2 = x1;
            y2 = h3*scale - stringerOffset_y*scale;
            stringerShape.lineTo(x2, y2);
            x1 = - (stringerSideOffset - L1)/Math.tan(Math.PI/6)*scale;
            y1 = y2;
            stringerShape.lineTo(x1, y1);
            x1 = x1;
            y1 = y1 + h3*scale;
            stringerShape.lineTo(x1, y1);

            x2 = L1*scale - stringerSideOffset*Math.tan(Math.PI/6)*scale;
            y2 = y1
            stringerShape.lineTo(x2, y2);

            x2 = x2;
            y2 = y2 + h3*scale;
            stringerShape.lineTo(x2, y2);

            x2 = L1*scale;
            y2 = y2;
            stringerShape.lineTo(x2, y2);
            }
        else {
            //первый подъем
            x2 = 0;
            y2 = 3*h3*scale;
            stringerShape.lineTo(x2, y2);
            }

        //прямые ступени
        x0 = x2;
        y0 = y2;
        for (var i = 1; i < stairAmt3; i++) {
            x1 = b3*(i-1)*scale + x0;
            y1 = h3*i*scale + y0
            stringerShape.lineTo(x1, y1);
            x2 = b3*i*scale + x0;
            y2 = h3*i*scale + y0;
            stringerShape.lineTo(x2, y2);
            }
        }
    if (stairAmt3 ==0) {
        x2 = x2 + L1*scale - stringerOffset_x*scale;
        y2 = y2;
        stringerShape.lineTo(x2, y2);
        }
    else {
        //последний подъем
        x1 = x2;
        y1 = y2 + h3*scale;
        stringerShape.lineTo(x1, y1);
        x2 = x1 + a3*scale - stringerOffset_x*scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);
        }
    //зад марша
    p1_x = x2;
    p1_y = y2 - h3*scale;
    if (stringerType == "ломаная") p1_y = y2 - stringerWidth*scale;
    stringerShape.lineTo(p1_x, p1_y);

    }

    if (stringerType == "прямая") {


    if (stringerTurn == "площадка"){
        //первый подъем
        x2 = 0;
        y2 = h3*2*scale;
        stringerShape.lineTo(x2, y2);

    if (stairAmt3 ==0) {
    /*
        x2 = x2 + L1*scale - stringerOffset_x*scale;
        y2 = y2;
        stringerShape.lineTo(x2, y2);*/
        }
    else {
        x1 = b3*(stairAmt3 - 1)*scale;
        y1 = h3*(stairAmt3 + 1)*scale;
        stringerShape.lineTo(x1, y1);
        x2 = x1 + a3*scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);
        }
    }


    if (stringerTurn == "забег"){



    if (stairAmt3 ==0) {
        //первый подъем
        x2 = 0;
        y2 = 3*h3*scale;
        stringerShape.lineTo(x2, y2);
        //последний подъем
        x2 = x2 + L1*scale - stringerOffset_x*scale;
        y2 = y2;
        stringerShape.lineTo(x2, y2);
        }
    else {
        //первый подъем
        x2 = 0;
        y2 = 4*h3*scale;
        stringerShape.lineTo(x2, y2);
        //последний подъем
        x1 = b3*(stairAmt3 - 1)*scale;
        y1 = h3*(stairAmt3 + 3)*scale;
        stringerShape.lineTo(x1, y1);
        x2 = x1 + a3*scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);
        }

        }

    //зад марша
    p1_x = x2;
    p1_y = y2 - h3*scale;
    stringerShape.lineTo(p1_x, p1_y);

    }

    /*stringer bottom line*/
    //if (stringerType == "пилообразная" || stringerType == "прямая") {
    if (stringerType != "ломаная" || stairAmt3 == 0) {

    if (stringerTurn == "забег"){
    if (stairAmt3 ==0) {
        if (model == "ко") x2 = p1_x//(L1 + 130)*scale;
        else p1_x//x2 = 130*scale;
        y2 = p1_y - treadThickness*scale;//2*h3*scale + 130*h3/b3*scale;
        stringerShape.lineTo(x2, y2);
        if (model == "ко") x1 = (80 - stringerSideOffset)*scale;
        else x1 = 70*scale;
        y1 = 0;
        stringerShape.lineTo(x1, y1);
    }
    else {
        if (model == "ко") x2 = (L1 + 130)*scale;
        else x2 = 130*scale;
        y2 = 2*h3*scale + 130*h3/b3*scale;
        stringerShape.lineTo(x2, y2);
        if (model == "ко") x1 = (80 - stringerSideOffset)*scale;
        else x1 = 70*scale;
        y1 = 0;
        stringerShape.lineTo(x1, y1);
        }
    }
    //stringerShape.lineTo(stringerOffset_x*scale, 0);
    stringerShape.lineTo(0, 0);

    }

    //if (stringerType == "ломаная") {
    else {
            x2 = p1_x - a3*scale + stringerWidth*scale;
            y2 = p1_y;
            stringerShape.lineTo(x2, y2);
            x1 = x2;
            y1 = y2 - h3*scale;
            stringerShape.lineTo(x1, y1);

        for (var i = 1; i < stairAmt3; i++) {
            x2 = x1 - b3*i*scale;
            y2 = y1 - h3*(i-1)*scale;
            stringerShape.lineTo(x2, y2);
            y2 = y2 - h3*scale
            stringerShape.lineTo(x2, y2);
            }


        if (model == "ко") stringerShape.lineTo((120 - stringerSideOffset)*scale, 0);
        else stringerShape.lineTo(stringerWidth*scale, 0);
        stringerShape.lineTo(0, 0);

    }

return stringerShape;
}//end of drawStringer4


/*внешний косоур среднего марша П-образной лестницы*/

function drawStringer5(
            model,
            stringerType,
            turnType_1, turnType_2,
            h1, b1, stairAmt1,
            h2, b2, stairAmt2,
            h3, b3, stairAmt3,
            a2, a3, L1, L2, turnLength,
            marshDist, scale, stringerSideOffset) {


    var stringerOffset_x = 0;
    var stringerOffset_y = 0;

    if (model == "ко") {
        stringerOffset_x = a2-b2;
        stringerOffset_y = treadThickness;
        //console.log(stringerOffset_y);
        }

    var stringerShape = new THREE.Shape();
    stringerShape.moveTo(stringerOffset_x*scale, -stringerOffset_y*scale);


/*stringer top line*/

    if (stringerType == "пилообразная" || stringerType == "ломаная") {


    /*низ марша*/
    stringerPlatformHeight = Math.max(h1, h2);
    if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;

    if (turnType_1 == "площадка") {
        //площадка
        x1 = stringerOffset_x*scale;
        y1 = stringerPlatformHeight*scale - stringerOffset_y*scale;
        stringerShape.lineTo(x1, y1);
        x2 = x1 + turnLength*scale - stringerOffset_x*scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);
        //базовая точка для прямых ступеней
        x0 = x2;
        y0 = y2;
        }

    if (turnType_1 == "забег") {

        //первый забег
        x1 = stringerOffset_x*scale;
        y1 = Math.max(h1, h2)*scale - stringerOffset_y*scale;
        if (stringerType == "ломаная") y1 = stringerWidth*scale - stringerOffset_y*scale;
        stringerShape.lineTo(x1, y1);
        x2 = x1 + (turnLength-L2)*scale;
        if (model == 'ко') x2 = (turnLength + L1 - (turnLength - stringerSideOffset)*Math.tan(Math.PI/6))*scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);
        //сохраняем точку
        x1t = x2;
        y1t = y2;

        //второй забег
        x1 = x2;
        y1 = y2 + h2*scale;
        stringerShape.lineTo(x1, y1);
        x2 = turnLength*scale;
        if (model == 'ко') x2 = x2 + L1*scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);
        //сохраняем
        x2t = x2;
        y2t = y2;
        //базовая точка для прямых ступеней
        x0 = x2;
        y0 = y2;
        }

    /*прямые ступени*/

    for (var i = 1; i < stairAmt2; i++) {
            x1 = b2*(i-1)*scale + x0;
            y1 = h2*i*scale + y0
            stringerShape.lineTo(x1, y1);
            x2 = b2*i*scale + x0;
            y2 = h2*i*scale + y0;
            stringerShape.lineTo(x2, y2);
            }
    x0 = x2;
    y0 = y2;

    /*верх марша*/

    stringerPlatformHeight = Math.max(h2, h3);

    if (turnType_2 == "площадка"){
        //последний подъем
        x1 = x0;
        y1 = y0 + h2*scale;
        stringerShape.lineTo(x1, y1);
        x2 = x1 + b2*scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);

        //площадка
        x1 = x2;
        y1 = y2 + h2*scale;
        stringerShape.lineTo(x1, y1);
        x2 = x1 + turnLength*scale - stringerSideOffset*scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);
        }

    if (turnType_2 == "забег"){
        //последний подъем
        if (stairAmt2) {
            x1 = x0;
            y1 = y0 + h2*scale;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + b2*scale;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
            }
        else {
            x2 = x0 + marshDist*scale;
            y2 = y0;
            stringerShape.lineTo(x2, y2);
            }

        //забег 1
        x1 = x2;
        y1 = y2 + h2*scale;
        stringerShape.lineTo(x1, y1);
        x2 = x1 + L2 *scale;
        if (model == "ко") x2 = x1 + L2 *(turnLength - stringerSideOffset)/turnLength *scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);
        //сохраняем точку
        x1t = x1;
        y1t = y1;

        //забег 2
        x1 = x2;
        y1 = y2 + h3*scale;
        stringerShape.lineTo(x1, y1);
        x2 = x1t + turnLength*scale;
        if (model == "ко") x2 = x2 - stringerSideOffset *scale
        y2 = y1;
        stringerShape.lineTo(x2, y2);


        }
        //зад площадки
        var p1_x = x2;
        var p1_y = y2 - stringerPlatformHeight*scale;
        if (stringerType == "ломаная") p1_y = y2 - stringerWidth*scale;
        stringerShape.lineTo(p1_x, p1_y);
    }

    if (stringerType == "прямая") {

    /*низ марша*/
    stringerPlatformHeight = Math.max(h1, h2);
    x1 = 0;
    y1 = stringerPlatformHeight*scale;
    stringerShape.lineTo(x1, y1);

    if (turnType_1 == "площадка") {
        //площадка

        x2 = x1 + turnLength*scale - b2*scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);
        //базовая точка для прямых ступеней
        x0 = x2 + b2*scale;;
        y0 = y2 + h2*scale;;
        }

    if (turnType_1 == "забег") {
        //первый забег
        x2 = x1 + (turnLength-L2)*scale;
        y2 = y1 + h2*scale;
        stringerShape.lineTo(x2, y2);
        //сохраняем точку
        x1t = x2;
        y1t = y2;

        //второй забег
        //x1 = x2 //+ L2*scale;
        //y1 = y2 + h2*scale;
        //stringerShape.lineTo(x1, y1);
        x2 = x2 + L2*scale;
        y2 = y2 + h2*scale;
        if (stairAmt2) stringerShape.lineTo(x2, y2);
        //сохраняем
        x2t = x2;
        y2t = y2;
        //базовая точка для прямых ступеней
        x0 = x2;
        y0 = y2;
        }


    x0 = b2*stairAmt2*scale + x0;
    y0 = h2*(stairAmt2-1)*scale + y0;

    if (!stairAmt2) x0 = x0 + marshDist*scale;

    /*верх марша*/

    stringerPlatformHeight = Math.max(h2, h3);

    if (turnType_2 == "площадка"){
        x2 = x0
        y2 = y0 + h2*scale;
        stringerShape.lineTo(x2, y2);

        //площадка

        x2 = x2 + turnLength*scale;
        y2 = y2;
        stringerShape.lineTo(x2, y2);
        }

    if (turnType_2 == "забег"){

        //забег 1
        x1 = x0;
        y1 = y0 + h2*scale;
        if (stairAmt2) stringerShape.lineTo(x1, y1);
        x2 = x1 + L2 *scale;
        y2 = y1 + h3*scale;
        stringerShape.lineTo(x2, y2);
        //сохраняем точку
        x1t = x1;
        y1t = y1;

        //забег 2

        x2 = x1t + turnLength*scale;
        y2 = y1t + h3*scale;
        stringerShape.lineTo(x2, y2);


        }
        //зад площадки
        var p1_x = x2;
        var p1_y = y2 - stringerPlatformHeight*scale;
        stringerShape.lineTo(p1_x, p1_y);



    }

/*stringer bottom line*/

    if (stringerType == "пилообразная" || stringerType == "прямая") {

    if (turnType_2 == "забег"){
        if (stairAmt2) {
            x1 = x1t + b2 * scale;
            y1 = y1t - h2*scale;
            stringerShape.lineTo(x1, y1);
            }
        else {
            x1 = p1_x;
            y1 = p1_y;
            }

        }
    if (turnType_2 == "площадка"){
        x1 = p1_x - turnLength*scale + b2*scale;
        y1 = p1_y;
        stringerShape.lineTo(x1, y1);
        }

    if (turnType_1 == "площадка"){
    //stringerShape.moveTo(stringerOffset_x*scale, -stringerOffset_y*scale);
        stringerShape.lineTo(turnLength*scale + stringerOffset_x*scale, -stringerOffset_y*scale);
        stringerShape.lineTo(stringerOffset_x*scale, -stringerOffset_y*scale);

        }

    if (turnType_1 == "забег"){
        if (stairAmt2) {
            x1 = turnLength*scale + b2*scale;
            y1 = h2*scale + stringerPlatformHeight*scale;
            stringerShape.lineTo(x1, y1);
            }
        stringerShape.lineTo(b2*scale + stringerOffset_x*scale, -stringerOffset_y*scale);
        stringerShape.lineTo(stringerOffset_x*scale, -stringerOffset_y*scale);
        }
    }

    if (stringerType == "ломаная") {

    if (turnType_2 == "забег"){
        //if (stairAmt2) {
            //второй забег
            x1 = p1_x - (turnLength - L2) * scale + stringerWidth*scale;
            y1 = p1_y //- h2*scale;
            stringerShape.lineTo(x1, y1);
            x2 = x1;
            y2 = y1 - h3*scale;
            stringerShape.lineTo(x2, y2);
            //первый забег
            x1 = x2 - L2 * scale;
            y1 = y2;
            stringerShape.lineTo(x1, y1);
            x1 = x1;
            y1 = y1 - h2*scale;
            stringerShape.lineTo(x1, y1);

        }
    if (turnType_2 == "площадка"){
        x1 = p1_x - turnLength*scale + stringerWidth*scale;
        y1 = p1_y;
        stringerShape.lineTo(x1, y1);
        y1 = y1-h2*scale;
        stringerShape.lineTo(x1, y1);

        }

    for (var i = 1; i < stairAmt2+1; i++) {
            x2 = x1 - b2*i*scale;
            y2 = y1 - h2*(i-1)*scale;
            stringerShape.lineTo(x2, y2);
            y2 = y2 - h2*scale
            stringerShape.lineTo(x2, y2);
            }
    if (!stairAmt2) {
        x2 = x1 - marshDist*scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);
        }

    if (turnType_1 == "забег"){

        x2 = x2 - L2*scale;
        y2 = y2
        stringerShape.lineTo(x2, y2);
        y2 = y2 - h2*scale
        stringerShape.lineTo(x2, y2);
        }


    stringerShape.lineTo(stringerOffset_x*scale, -stringerOffset_y*scale);
    }

    return stringerShape;
}//end of drawStringer5


/*внутренний косоур среднего марша П-образной лестницы*/

function drawStringer6(
            model,
            stringerType,
            turnType_1, turnType_2,
            h1, b1, stairAmt1,
            h2, b2, stairAmt2,
            h3, b3, stairAmt3,
            a2, a3, L1, L2, turnLength,
            marshDist, scale, stringerSideOffset) {

    var stringerOffset_x = 0;
    var stringerOffset_y = 0;

    if (model == "ко") {
        stringerOffset_x = a2-b2;
        stringerOffset_y = treadThickness;
        }
    var stringerPlatformHeight = Math.max(h1, h2);
    if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;
    var stringerShape = new THREE.Shape();
    stringerShape.moveTo(0, 0);


    /*stringer top line*/
    if (stringerType == "пилообразная" || stringerType == "ломаная") {

    /*низ марша*/

    if (turnType_1 == "площадка") {
        if (model == "ко") {
            //выступ под площадкой
            x1 = -stringerSideOffset*scale;
            y1 = 0;
            stringerShape.lineTo(x1, y1);
            x2 = x1;
            y2 = stringerPlatformHeight*scale - stringerOffset_y*scale;
            stringerShape.lineTo(x2, y2);
            x2 = 0
            stringerShape.lineTo(x2, y2);
            }
        else {
            //первый подъем
            x2 = 0; //stringerOffset_x*scale;
            y2 = stringerPlatformHeight*scale;
            stringerShape.lineTo(x2, y2);
            }
        //базовая точка для прямых ступеней
        x0 = x2;
        y0 = y2;
        }

    if (turnType_1 == "забег") {
    //выступ под площадкой
        if (model == "ко") {
            x1 = -stringerSideOffset*scale;
            y1 = 0;
            stringerShape.lineTo(x1, y1);
            x2 = x1;
            y2 = h2*scale - stringerOffset_y*scale;
            stringerShape.lineTo(x2, y2);
            x1 = - (stringerSideOffset - L1)/Math.tan(Math.PI/6)*scale;
            y1 = y2;
            stringerShape.lineTo(x1, y1);
            x1 = x1;
            y1 = y1 + h2*scale;
            stringerShape.lineTo(x1, y1);

            x2 = L1*scale - stringerSideOffset*Math.tan(Math.PI/6)*scale;
            y2 = y1
            stringerShape.lineTo(x2, y2);

            x2 = x2;
            y2 = y2 + h2*scale;
            stringerShape.lineTo(x2, y2);

            x2 = L1*scale;
            y2 = y2;
            stringerShape.lineTo(x2, y2);
            }
        else {
            //первый подъем
            x2 = 0;
            y2 = 3*h2*scale;
            stringerShape.lineTo(x2, y2);
            }

        //базовая точка для прямых ступеней
        x0 = x2;
        y0 = y2;
        }

    /*прямые ступени*/

    for (var i = 1; i < stairAmt2; i++) {
            x1 = b2*(i-1)*scale + x0;
            y1 = h2*i*scale + y0
            stringerShape.lineTo(x1, y1);
            x2 = b2*i*scale + x0;
            y2 = h2*i*scale + y0;
            stringerShape.lineTo(x2, y2);
            }
    x0 = x2;
    y0 = y2;

    /*верх марша*/

    stringerPlatformHeight = Math.max(h2, h3);
    if (stringerType == "ломаная") stringerPlatformHeight = stringerWidth;

    if (turnType_2 == "площадка"){
        //последний подъем
        x1 = x0;
        y1 = y0 + h2*scale;
        stringerShape.lineTo(x1, y1);
        x2 = x1 + b2*scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);

        //площадка
        x1 = x2;
        y1 = y2 + h2*scale;
        stringerShape.lineTo(x1, y1);
        x2 = x1 + turnLength*scale - stringerSideOffset*scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);

        //зад площадки
        var p1_x = x2;
        var p1_y = y2 - stringerPlatformHeight*scale;
        stringerShape.lineTo(p1_x, p1_y);

        }

    if (turnType_2 == "забег"){
        //последний подъем
        if (stairAmt2) {
            x1 = x0;
            y1 = y0 + h2*scale;
            stringerShape.lineTo(x1, y1);
            x2 = x1 + b2*scale;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
            }
        else {
            x2 = x0 + marshDist*scale;
            y2 = y0;
            stringerShape.lineTo(x2, y2);
            }

        //забег 1
        x1 = x2;
        y1 = y2 + h2*scale;
        stringerShape.lineTo(x1, y1);
        x2 = x1 + L1 *scale + stringerSideOffset*scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);
        //сохраняем точку
        x1t = x1;
        y1t = y1;

        //зад площадки
        if (stringerType == "пилообразная") {
            if (stairAmt2) {
                p1_x = x2;
                p1_y = y2 - 2*h2*scale + L1 * h2 * scale / b2;
                stringerShape.lineTo(p1_x, p1_y);
                }
            else {
                p1_x = x2;
                p1_y = y2 - h2*scale + L1 * h2 * scale / b2;
                stringerShape.lineTo(p1_x, p1_y);
                }
            }
        if (stringerType == "ломаная") {
            p1_x = x2;
            p1_y = y2 - h2*scale - stringerWidth*scale;
            stringerShape.lineTo(p1_x, p1_y);
            }

        }

    }

    if (stringerType == "прямая") {

    /*низ марша*/

    if (turnType_1 == "площадка") {
        //площадка
        x1 = 0;
        y1 = stringerPlatformHeight*scale + h2*scale;
        stringerShape.lineTo(x1, y1);

        //базовая точка для прямых ступеней
        x0 = x1;
        y0 = y1;
        }

    if (turnType_1 == "забег") {

        //первый подъем
        x2 = 0;
        y2 = 3*h2*scale;
        stringerShape.lineTo(x2, y2);
        if (stairAmt2) {
            x2 = x2;
            y2 = y2 + h2*scale;
            stringerShape.lineTo(x2, y2);
            }
        else {
            x2 = x2 + marshDist*scale;
            y2 = y2 + h2*scale;
            stringerShape.lineTo(x2, y2);
            }
        //базовая точка для прямых ступеней
        x0 = x2;
        y0 = y2;
        }

    x0 = b2*stairAmt2*scale + x0;
    y0 = h2*stairAmt2*scale + y0;

    /*верх марша*/

    stringerPlatformHeight = Math.max(h2, h3);

    if (turnType_2 == "площадка"){
        //площадка
        x1 = x0;
        y1 = y0;
        stringerShape.lineTo(x1, y1);
        x2 = x0 + turnLength*scale;
        y2 = y0;
        stringerShape.lineTo(x2, y2);

        //зад площадки
        var p1_x = x2;
        var p1_y = y2 - stringerPlatformHeight*scale;
        stringerShape.lineTo(p1_x, p1_y);

        }

    if (turnType_2 == "забег"){
        //забег 1
        x1 = x0;
        y1 = y0// + h2*scale;
        stringerShape.lineTo(x1, y1);
        x2 = x1 + L1 *scale;
        y2 = y1;
        stringerShape.lineTo(x2, y2);
        //сохраняем точку
        x1t = x1;
        y1t = y1;

        //зад площадки
        if (stairAmt2) {
            x1 = x2;
            y1 = y2 - 2*h2*scale + L1 * h2 * scale / b2;
            stringerShape.lineTo(x1, y1);
            }
        else {
            x1 = x2;
            y1 = y2 - h2*scale + L1 * h2 * scale / b2;
            stringerShape.lineTo(x1, y1);
            }


        }

    }


/*stringer bottom line*/

    if (stringerType == "пилообразная" || stringerType == "прямая") {

    if (turnType_2 == "забег"){
        }

    if (turnType_2 == "площадка"){
        x1 = p1_x - turnLength*scale + b2*scale;
        y1 = p1_y;
        stringerShape.lineTo(x1, y1);
        }

    if (turnType_1 == "площадка"){
        }

    if (turnType_1 == "забег"){
    /*
        if (model == "ко") x2 = (L1 + 130)*scale;
        else x2 = 130*scale;
        y2 = 2*h2*scale + 130*h2/b2*scale;
        stringerShape.lineTo(x2, y2);
        x1 = 70*scale;
        y1 = 0;
        stringerShape.lineTo(x1, y1);
*/
        if (model == "ко") x2 = (L1 + 130)*scale;
        else x2 = 130*scale;
        y2 = 2*h2*scale + 130*h2/b2*scale;
        stringerShape.lineTo(x2, y2);
        if (model == "ко") x1 = (80 - stringerSideOffset)*scale;
        else x1 = 70*scale;
        y1 = 0;
        stringerShape.lineTo(x1, y1);


        }


    }

    if (stringerType == "ломаная") {
        if (turnType_2 == "площадка"){
            x1 = p1_x - turnLength*scale + stringerWidth*scale;
            y1 = p1_y;
            stringerShape.lineTo(x1, y1);
            y1 = y1 - h2*scale;
            stringerShape.lineTo(x1, y1);
            }

        if (turnType_2 == "забег"){
            x1 = p1_x - L1*scale + stringerWidth*scale - stringerSideOffset*scale;
            y1 = p1_y;
            }

        for (var i = 1; i < stairAmt2+1; i++) {
            x2 = x1 - b2*i*scale;
            y2 = y1 - h2*(i-1)*scale;
            stringerShape.lineTo(x2, y2);
            y2 = y2 - h2*scale
            stringerShape.lineTo(x2, y2);
            }

        if (!stairAmt2) {
            x2 = x1 - marshDist*scale;
            y2 = y1;
            stringerShape.lineTo(x2, y2);
            }

        if (turnType_1 == "забег"){
            x2 = stringerWidth*scale;
            y2 = 0;
            stringerShape.lineTo(x2, y2);
            }


    }

    stringerShape.lineTo(0, 0);



    return stringerShape;
}//end of drawStringer6




/**
 * расчет точек сопряжения двух отрезков
 * @param {Object} <начальная точка>
 * @param {Double} <угол первого сопрягаемого отрезка>
 * @param {Object} <конечная точка>
 * @param {Double} <угол второго сопрягаемого отрезка>
 * @param {Double} <радиус сопряжения>
 * @return {Object} -
 *   точка пересечения отрезков, начальная точка дуги, конечная точка дуги, центр дуги,
 *   начальный угол дуги, конечный угол дуги
 */
function fillet(pt1, ang1, pt2, ang2, rad) {
  var pti = itercection(pt1, polar(pt1, ang1, 1.0), pt2, polar(pt2, ang2, 1.0));
  if (pti.x !== undefined && pti.y !== undefined) {
    var n = Math.abs(rad / Math.tan((ang2 - ang1) * 0.5));
    var pta = polar(pti, ang1, -n);
    var ptb = polar(pti, ang2, -n);
    var ang = Math.abs(ang2 - ang1);
    ang = ang1 + Math.PI * ((ang2 > ang1 && ang > Math.PI) || (ang2 < ang1 && ang < Math.PI) ? 0.5 : -0.5);
    var ptc = polar(pta, ang, rad);
    return { "int": pti, "start": pta, "end": ptb, "center": ptc, "angstart": anglea(ptc, pta), "angend": anglea(ptc, ptb) };
  }
  else {
    return null;
  }
}

/**
 * угол между осью X и отрезком, соединяющим точки
 * @param {Object} - точка 1
 * @param {Object} - точка 2
 * @return {Double}
 */
function anglea(pt1, pt2) {
  var x = pt2.x - pt1.x;
  var y = pt2.y - pt1.y;
  var ang = Math.acos(x / Math.sqrt(x * x + y * y));
  return pt2.y > pt1.y ? ang : Math.PI + Math.PI - ang;
}


function toRadians(angle){
  return angle * (Math.PI / 180);
}
