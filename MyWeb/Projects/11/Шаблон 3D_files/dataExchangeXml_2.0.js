var currentStructureVersion = "1.0"; // 29.06.16
var currentGeometryVersion = "1.0"; // 29.06.16

$(function(window){
	saveToXml = function(divClassName, fileName){
		if(!checkDublicateId())
			return;
		var dataXML = '<label>structure</label>\n',
			form=$('.'+divClassName); // �������� ����� �� ID
		dataXML += '<version>' + currentStructureVersion + '</version>\n';
		//���� XML
		if(form.length) // ���� ��� div
		{
			//������� ��� ���� ����� � ������ �����
			var elements = form.find('input[type!=file],select,textarea');
			var count = 0;
			$.each(elements, function(key, val){
				val = $(val);
				var value = val.val();
				if(val.attr('type') == 'radio')
				{
				 	value = val.attr('checked')?'checked':'unchecked';
					//return;
				}
				if(val.attr('id')) { // ���� ������� ������� � � ���� ���� id
					dataXML += '<' + val.attr('id')+'>'+value+'</' + val.attr('id')+'>\n';
				}
				count++;
			});
			dataXML += '<dataCounter>'+count+'</dataCounter>\n';
		}
		else
		{
			alert('������� � id="'+formId+'" �� ������!');
			return;
		}
		saveAs(
			new Blob([dataXML], {type: "text/xml;charset=utf-8"}),
			fileName+'.xml'
		);
	}

	loadFromXml = function(divClassName){
		var loadedFile = $("#loadXML")[0].files[0];
		var reader = new FileReader();
		var	dataXML = false;
		reader.onload = function(event) {
			dataXML = event.target.result;
			var XML = $(dataXML),
				errNotFoundForm = [],
				errNotFoundFile = [],
				xmlarr = [],
				form=$('.'+divClassName),
				label = false,
				version = false,
				dataCounter = false,
				calcType = false,
				calcVersion = false,
				match,
				rx = />(.*?)<\/\b(.*?)>/g;
			var ledges = [];
			while (match = rx.exec(dataXML)) {
				if( match[2] == 'label') {
					label = match[1];
					continue;
				}
				if(match[2] == 'version'){
					version = match[1];
					continue;
				}
				if(match[2] == 'dataCounter'){
					dataCounter = match[1];
					continue;
				}
				if(match[2] == 'calcType') {
					calcType = match[1];
					continue;
				}
				if(match[2] == 'calcVersion'){
					calcVersion = match[1];
					continue;
				}
				xmlarr[match[2]] = match[1];
			}
			if (label != 'structure') {
				alert ('��� �� ���� ������ ����������� (����� ����� ����� - \"' + label + '\").');
				return;
			}

			if (label == 'structure') {
				if (version != currentStructureVersion) {

					alert('������ ����� ������ (' + version + ') �� ������������� ���������� (' + currentGeometryVersion + '). ����������� ���� ������ �������.');
					return;
				}
			}
			if(calcVersion != $('#calcVersion').val()) {
				alert('�� ��������� ��������� ������, ��������� � ������ ������ ���������.\n������ ������:' + calcVersion + '\n������ ���������: ' + $('#calcVersion').val() + '\n���������� ��������� ������������� ������ ����� ��������.');
			}
			if(calcType != $('#calcType').val()) {
				var noStop = confirm("������ �� ������������� ���������� �������!\n��� ������: " + calcType +
				"\n��� �������: " + $('#calcType').val() +
				"\n����������?");
				if(!noStop)
					return;
			}

			var elements = form.find('input[type!=file][id!=calcVersion],select[id!=calcType],textarea');
            var xmlOld = $.extend(true, [], xmlarr);
			//������ ������, ��� ��������� ������
			$.each(elements, function(key, val){
				val = $(val);
				var id = val.attr('id');
				if (id in xmlarr) {
					if(val[0].tagName == 'SELECT')
						var sel = val.find('option[value="'+xmlarr[id]+'"]');
					if(val.attr('type') == 'radio')
					{
						var name = val.attr('name');
						val.prop('checked', xmlarr[id] == 'checked'?true:false);
					}
					val.val(xmlarr[id]);
					delete xmlarr[id];
				}
			});
            xmlarr = $.extend(true, [], xmlOld);
			delete xmlOld;
            changeAllForms();
			elements = form.find('input[type!=file][id!=calcVersion],select[id!=calcType],textarea');
			//������ ������, � ���������� ������
			$.each(elements, function(key, val){
				val = $(val);

				var id = val.attr('id');
				if (id in xmlarr) {
					if(val[0].tagName == 'SELECT')
					{
						var sel = val.find('option[value="'+xmlarr[id]+'"]');
						if(sel.length == 0)
							alert('�������� ' + xmlarr[id] + ' �� �������� ��� ������ � �������� '+id);
					}
					if(val.attr('type') == 'radio')
					{
						var name = val.attr('name');
						val.prop('checked', xmlarr[id] == 'checked'?true:false);
					}
					val.val(xmlarr[id]);
					delete xmlarr[id];
				} else {
					errNotFoundForm.push(id);
				}
			});
			for(var index in xmlarr) {
				errNotFoundFile.push(index);
			}
			var err = '';
			if(errNotFoundForm.length)
				err += "� ����� ���� ����, ��� ������� � ����� ��� �����: " + errNotFoundForm.join(', ') + '. ';
			if(errNotFoundFile.length)
				err += "�� ������� ����� ��� ������������ �����: " + errNotFoundFile.join(', ') + '. ';
			if(err.length)
				alert(err);
			else
				alert("������ ������� ���������!");
			redrawWalls();
			$("#loadXML").val(''); // ������� ���������
		};
		reader.onerror = function(event) {
			alert("���� �� ����� ���� ��������! ��� " + event.target.error.code);
		};
		reader.readAsText(loadedFile);

	}
	saveToBD = function(divClassName, scriptName){
		if(!checkDublicateId())
			return;
		var form=$('.'+divClassName); // �������� ����� �� ID
		if(form.length) // ���� ������� ����������
		{
			//������� ��� ���� ����� � ������ �����
			var elements = form.find('input[type!=file],select,textarea'),
				data = {};
			data["label"] = "structure";
			data["version"] = currentStructureVersion;
			$.each(elements, function(key, val){
				val = $(val);
				var value = val.val();
				if(val.attr('type') == 'radio')
				{
					value = val.attr('checked')?'checked':'unchecked';
					//return;
				}
				if(val.attr('id')) { // ���� ������� ������� � � ���� ���� id
					data[val.attr('id')]= value;
				}
			});

			settings = {
				type: 'POST',
				dataType: 'json',
				url: scriptName,
				data: data,
				success: function (data) {
					if(data && data.info)
						alert(data.info);
				},
				error: function (a, b) {
					alert(b);
				}
			};
			$.ajax(settings);
		}
	}
	loadFromBD = function(divClassName, scriptName){
		var form=$('.'+divClassName); // �������� ����� �� ID
		var orderName = $('#orderName').val();
		if(form.length && orderName.length) // ���� ������� ����������
		{
			var label, version, dataCounter,
				fieldArr = [], errNotFoundForm = [],
				errNotFoundFile = [],
				calcType = false,
				calcVersion = false,
				ledges = [];
			var settings = {
				type: 'POST',
				dataType: 'json',
				url: scriptName,
				data: {orderName: orderName, getOrder: true},
				success: function (data) {
					if(data) {
						if(data.info)
						{
							alert(data.info);
							return;
						}
						$.each(data, function(key, val){
							if(key == 'label'){
								label = val;
								return;
							}
							if(key == 'version'){
								version = val;
								return;
							}
							if(key == 'dataCounter'){
								dataCounter = val;
								return;
							}
							if(key == 'calcType'){
								calcType = val;
								return;
							}
							if(key == 'calcVersion'){
								calcVersion = val;
								return;
							}
							fieldArr[key] = val;
						});
						if (label != 'structure') {
							alert ('��� �� ���� ������ ����������� (����� ����� ����� - \"' + label + '\").');
							return;
						}

						if (label == 'structure') {
							if (version != currentStructureVersion) {
								alert('������ ����� ������ (' + version + ') �� ������������� ���������� (' + currentGeometryVersion + '). ����������� ���� ������ �������.');
								return;
							}
						}
						if(calcVersion != $('#calcVersion').val()) {
							alert('�� ��������� ��������� ������, ��������� � ������ ������ ���������.\n������ ������:' + calcVersion + '\n������ ���������: ' + $('#calcVersion').val() + '\n���������� ��������� ������������� ������ ����� ��������.');
						}
						if(calcType != $('#calcType').val()) {
							var noStop = confirm("������ �� ������������� ���������� �������!\n��� ������: " + calcType +
								"\n��� �������: " + $('#calcType').val() +
								"\n����������?");
							if(!noStop)
								return;
						}

						var elements = form.find('input[type!=file][id!=calcVersion],select[id!=calcType],textarea');
						var fieldOld = $.extend(true, [], fieldArr);
						//������ ������, ��� ��������� ������
						$.each(elements, function(key, val){
							val = $(val);
							var id = val.attr('id');
							if (id in fieldArr) {
								if(val[0].tagName == 'SELECT')
									var sel = val.find('option[value="'+fieldArr[id]+'"]');
								if(val.attr('type') == 'radio')
								{
									var name = val.attr('name');
									val.prop('checked', fieldArr[id] == 'checked'?true:false);
								}
								val.val(fieldArr[id]);
								delete fieldArr[id];
							}
						});
						fieldArr = $.extend(true, [], fieldOld);
						delete fieldOld;
						changeAllForms();
						elements = form.find('input[type!=file][id!=calcVersion],select[id!=calcType],textarea');
						//������ ������, � ���������� ������
						elements = form.find('input[type!=file][id!=calcVersion],select[id!=calcType],textarea');
						$.each(elements, function(key, val){
							val = $(val);
							var id = val.attr('id');
							if (id in fieldArr) {
								if(val[0].tagName == 'SELECT')
								{
									var sel = val.find('option[value="'+fieldArr[id]+'"]');
									if(sel.length == 0)
										alert('�������� ' + fieldArr[id] + ' �� �������� ��� ������ � �������� '+id);
								}
								if(val.attr('type') == 'radio')
								{
									var name = val.attr('name');
									val.prop('checked', fieldArr[id] == 'checked'?true:false);
								}
								val.val(fieldArr[id]);
								delete fieldArr[id];
							} else {
								errNotFoundForm.push(id);
							}
						});

						for(var index in fieldArr) {
							errNotFoundFile.push(index);
						}
						var err = '';
						if(errNotFoundForm.length)
							err += "� ����� ���� ����, ������� ��� � ��: " + errNotFoundForm.join(', ') + '. ';
						if(errNotFoundFile.length)
							err += "�� ������� ����� ��� ������������ �����: " + errNotFoundFile.join(', ') + '. ';
						if(err.length)
							alert(err);
						else
							alert("������ ������� ����������!");
						redrawWalls();
					}
				},
				error: function (a, b) {
					alert(b);
				}
			};
			$.ajax(settings);
		}
	}
	checkDublicateId = function(){
		var arr = [], err = [];
		$('input[type!=file],select,textarea').each(function(i,v){
			var id = $(v).attr('id');
			//console.log((id in arr));
			if(id) {
				if ($.inArray(id, arr) > -1)
					if ($.inArray(id, err) == -1)
						err.push(id);
				arr.push(id);
			}
		});
		if(err.length > 0) {
			alert('�� �������� ������� ���������� �� - ' + err.join(', '));
			return false;
		}
		else return true;
	};
});


