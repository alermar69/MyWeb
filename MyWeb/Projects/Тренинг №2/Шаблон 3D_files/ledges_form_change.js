$(function() {
    changeFormLedges = function(){
        removeLedges();
        var amt = $('#wallLedgeAmt').val();
        for(var i = 0; i < amt; i++)
            appendLedges(i);
    };
    removeLedges = function(){
        var inputs = $('table tr').filter(function(){
            return $(this).find('[id^=wallLedge]').length > 0;
        });
        $.each(inputs, function(i,v){
            $(v).remove();
        });
    };
    appendLedges = function (number) {
        var el = $('#wallLedgeType' + number);
        if (el.length > 0)
            return;
        $('<tr>' +
            '<td>' +
            '<select id="wallLedgeType' + number + '" size="1" onchange="">' +
            '<option value="проем">проем</option>' +
            '<option value="выступ" selected="">выступ</option>' +
            '</select>' +
            '</td>' +
            '<td>' +
            '<select id="wallLedgeBaseWall' + number + '" size="1" onchange="">' +
            '<option value="1">стена 1</option>' +
            '<option value="2">стена 2</option>' +
            '<option value="3">стена 3</option>' +
            '<option value="4">стена 4</option>' +
            '</select>' +
            '</td>' +
            '<td>X:<input type="number" id="wallLedgeWidth' + number + '" value="0"><br>' +
            '	Y:<input type="number" id="wallLedgeHeight' + number + '" value="0"><br>' +
            '	Z:<input type="number" id="wallLedgeDepth' + number + '" value="0"></td>' +
            '	<td><br><div class="button-block"><span class="close-block"></span>' +
            '</div>X:<input type="number" id="wallLedgePosX' + number + '" value="2000">' +
            '		Y:<input type="number" id="wallLedgePosY' + number + '" value="2000"></td>' +
            '</tr>').clone().appendTo($('#ledgeForm tbody'));
        reindexId();
    };


    reindexId = function(){
        var group = $('#ledgeForm tbody tr'), amt = 0;
        //перебираем все строки таблицы
        $.each(group, function(i, val){
            var self = i, input = $(val).find('td input,select,textarea');
            //перебираем элементы в строке
            $.each(input, function(i, val){
                var id = val.id.match(/^([^0-9]+)[0-9]+$/)[1];
                val.id = id+(self-1);
            });
            amt = i;
        });
        $('#wallLedgeAmt').val(amt);
        redrawWalls();
    };
    //добавим кнопку удалени€ строки с выступами
    $('#ledgeForm tr').each(function(i, v){
        $(v).children('td').last().children().first().after($('<div class="button-block"><span class="close-block"></span></div>'));
    });
    $(".close-block").live('click', function(e){
        $(this).parents('tr').remove();
        reindexId();
    });

    //вешаем обработчик на измененние инпутов
    //$('.tabs').delegate('input,select,textarea', 'click', redrawWalls);
    //добавим кнопку добавлени€ выступа
    $button = $('<button id="addLedge">ƒобавить выступ</button>').click(function(){
        $('<tr>'+
            '<td>' +
            '<select id="wallLedgeType0" size="1" onchange="">' +
            '<option value="проем">проем</option>' +
            '<option value="выступ" selected="">выступ</option>' +
            '</select>' +
            '</td>' +
            '<td>' +
            '<select id="wallLedgeBaseWall0" size="1" onchange="">' +
            '<option value="1">стена 1</option>' +
            '<option value="2">стена 2</option>' +
            '<option value="3">стена 3</option>' +
            '<option value="4">стена 4</option>' +
            '</select>' +
            '</td>' +
            '<td>X:<input type="number" id="wallLedgeWidth0" value="500"><br>' +
            '	Y:<input type="number" id="wallLedgeHeight0" value="1000"><br>' +
            '	Z:<input type="number" id="wallLedgeDepth0" value="200"></td>' +
            '	<td><br><div class="button-block"><span class="close-block"></span></div>X:<input type="number" id="wallLedgePosX0" value="2000">' +
            '		Y:<input type="number" id="wallLedgePosY0" value="2000"></td>' +
            '</tr>').clone().appendTo($('#ledgeForm tbody') );
        //переиндексируем Id
        reindexId();
    });
    $('#ledgeForm table').before($button);
    $(window).scroll(function(){
        //console.log(100-$(this).scrollTop());
        var delta = 120-$(this).scrollTop(), top = delta > 0?delta:20;
        $(".tabs").css("top", top);
    });
    
});