function ServiceDialog (div, title, okCallback, cancelCallback) {
	
	var _div = div;
	var _okCallback = okCallback;
	var _cancelCallback = cancelCallback;
	var _title = title;
	
	var _serviceTypeInputId = "serviceTypeInput" + Utils.getNextUniqueId();
	var _serviceCategoryInputId = "serviceCategoryInput" + Utils.getNextUniqueId();
	var _serviceNameInputId = "serviceNameInput" + Utils.getNextUniqueId();
	var _servicePriceInputId = "servicePriceInput" + Utils.getNextUniqueId();
	var _dialogContentDivId = "dialogContent" + Utils.getNextUniqueId();
	
	this.open = function(service) {
		
		if (typeof service !== 'undefined') {
			// load fields with predefined values
			$("#" + _serviceTypeInputId).val(service.type);
			$("#" + _serviceCategoryInputId).val(service.category); 
			$("#" + _serviceNameInputId).val(service.name);
			$("#" + _servicePriceInputId).val(service.price);
		}
		
		$(_div).dialog("open");	
	};
	
	function addContent() {
		
		var dialogContent = $("#" + _dialogContentDivId);
		
		var table = $('<table></table>').addClass('add-service-table');

		var col = ($('<td></td>').addClass('service-dialog-col')).append($('<label>Type: </label>')); 
		var row = $('<tr></tr>').addClass('service-dialog-row').append(col);
	    col = ($('<td></td>').addClass('service-dialog-col')).append($("<input type='text' id=" + _serviceTypeInputId + ">"));
	    row.append(col);
	    table.append(row);
	    
	    col = ($('<td></td>').addClass('service-dialog-col')).append($('<label>Category: </label>'));
	    row = $('<tr></tr>').addClass('service-dialog-row').append(col);
	    col = ($('<td></td>').addClass('service-dialog-col')).append($("<input type='text' id="+ _serviceCategoryInputId + ">"));
	    row.append(col);
	    table.append(row);
	    
	    col = ($('<td></td>').addClass('service-dialog-col')).append($('<label>Name: </label>'));
	    row = $('<tr></tr>').addClass('service-dialog-row').append(col);
	    col = ($('<td></td>').addClass('service-dialog-col')).append($("<input type='text' id="+ _serviceNameInputId + ">"));
	    row.append(col);
	    table.append(row);
	    
	    col = ($('<td></td>').addClass('service-dialog-col')).append($('<label>Price: </label>'));
	    row = $('<tr></tr>').addClass('service-dialog-row').append(col);
	    col = ($('<td></td>').addClass('service-dialog-col')).append($("<input type='number' id=" + _servicePriceInputId + ">"));
	    row.append(col);
	    table.append(row);
	    
	    dialogContent.append(table);	    
	};
		
	this.getService = function() {
		return {"type": $("#" + _serviceTypeInputId).val(), 
				"category": $("#" + _serviceCategoryInputId).val(), 
				"name": $("#" + _serviceNameInputId).val(), 
				"price": $("#" + _servicePriceInputId).val()};
	};
	
	function createDialog() {

		$(_div).attr('title', _title).dialog({
						        resizable: false,
						        height: 250,
						        width: 270,
						        modal: true,
						        autoOpen: false,
						        buttons: {
						            "Ok": handleOk,
						            "Cancel": handleCancel
						        }
						    });
		
		$(_div).append($("<p id=" + _dialogContentDivId + "></p>"));
		
		addContent();
	}
	
	function handleOk() {
		// TODO check that values are valid
		if ($(_serviceNameInputId).val() == "") {
			alert("Please specify service name");
			return;
		}
		if (typeof _okCallback !== 'undefined')
    		_okCallback();
        $( this ).dialog( "close" );
	}
	
	function handleCancel() {
		if (typeof _cancelCallback !== 'undefined')
			_cancelCallback();
		$( this ).dialog( "close" );
	}
	
	// create the dialog
	createDialog();	
}