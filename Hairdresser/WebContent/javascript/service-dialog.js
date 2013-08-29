function ServiceDialog (div, okCallback, cancelCallback) {
	
	var _div = div;
	var _okCallback = okCallback;
	var _cancelCallback = cancelCallback;
	
	this.open = function(service) {
		
		if (typeof service !== 'undefined') {
			// load fields with predefined values
			$('#serviceType').val(service.type);
			$('#serviceCategory').val(service.category); 
			$('#serviceName').val(service.name);
			$('#servicePrice').val(service.price);
		}
		
		$(_div).dialog("open");	
	};
	
	function addContent() {
		
		var dialogContent = $('#dialogContent');
		
		dialogContent.empty();
		
		var table = $('<table></table>').addClass('add-service-table');

		var col = ($('<td></td>').addClass('add-service--col')).append($('<label>Type: </label>')); 
		var row = $('<tr></tr>').addClass('add-service--row').append(col);
	    col = ($('<td></td>').addClass('add-service--col')).append($('<input type="text" id="serviceType"/>'));
	    row.append(col);
	    table.append(row);
	    
	    col = ($('<td></td>').addClass('add-service--col')).append($('<label>Category: </label>'));
	    row = $('<tr></tr>').addClass('add-service--row').append(col);
	    col = ($('<td></td>').addClass('add-service--col')).append($('<input type="text" id="serviceCategory"/>'));
	    row.append(col);
	    table.append(row);
	    
	    col = ($('<td></td>').addClass('add-service--col')).append($('<label>Name: </label>'));
	    row = $('<tr></tr>').addClass('add-service--row').append(col);
	    col = ($('<td></td>').addClass('add-service--col')).append($('<input type="text" id="serviceName"/>'));
	    row.append(col);
	    table.append(row);
	    
	    col = ($('<td></td>').addClass('add-service--col')).append($('<label>Price: </label>'));
	    row = $('<tr></tr>').addClass('add-service--row').append(col);
	    col = ($('<td></td>').addClass('add-service--col')).append($('<input type="number" id="servicePrice""/>'));
	    row.append(col);
	    table.append(row);
	    
	    dialogContent.append(table);	    
	};
		
	this.getService = function() {
		return {"type": $('#serviceType').val(), 
			"category": $('#serviceCategory').val(), 
			"name": $('#serviceName').val(), 
			"price": $('#servicePrice').val()};
	};
	
	function createDialog() {

		$(_div).attr('title', "Service Dialog").dialog({
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
		
		$(_div).append($("<p id='dialogContent'></p>"));
		
		addContent();
	}
	
	function handleOk() {
		// TODO check that values are valid
		if ($('#serviceName').val() == "") {
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