// Check if the document was loaded and functional

$(document).ready(function() {
	
	var table = $('<table></table>').addClass('pricelist-table');	
	var thead = $('<thead></thead>');
	var tbody = $('<tbody></tbody>');
	
	table.append(thead);
	table.append(tbody);
	
	var row = $('<tr></tr>').addClass('pricelist-head');
    var col = $('<th></th>').addClass('pricelist-col').text("Type");
    row.append(col);
    col = $('<th></th>').addClass('pricelist-col').text("Category");
    row.append(col);
    col = $('<th></th>').addClass('pricelist-col').text("Name");
    row.append(col);
    col = $('<th></th>').addClass('pricelist-col').text("Price");
    row.append(col);	
    thead.append(row);

	$('#mainDiv').append(table);
	
	var dialogDiv = $('<div id="addServiceDialog"></div>').addClass('dialog-div');
	$('#mainDiv').append(dialogDiv);
	
	var addButton = $('<input type="submit" value="Add" />');
	addButton.button().click(showAddNewServiceDialog);
	$('#mainDiv').append(addButton);
	
	var updateButton = $('<input type="submit" value="Update" />');
	updateButton.button().click(showUpdateServiceDialog);
	$('#mainDiv').append(updateButton);
	
	var deleteButton = $('<input type="submit" value="Delete" />');
	deleteButton.button().click(deleteService);
	$('#mainDiv').append(deleteButton);

	// This is only to demo how to use Post	
	//useDispatcher(buildPriceList);
	
	getServices(buildPriceList); 
		
});

function showAddNewServiceDialog() {
	
	createDialog("New Service", getServiceParameters);
	
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
			
	// we need this to prevent the dialog from closing after initializing
	return false;
};

function getServiceParameters() {
	
	// TODO: check that all inputs are correct 
	addService(	{"type": $('#serviceType').val(), 
				"category": $('#serviceCategory').val(), 
				"name": $('#serviceName').val(), 
				"price": $('#servicePrice').val()});
};

function showUpdateServiceDialog() {
	alert("Update");
};

function deleteService() {
	alert("Delete");
};

function createDialog(title, okCallback, cancelCallback) {

	$('#addServiceDialog').attr('title', title).dialog({
					        resizable: false,
					        height: 250,
					        width: 270,
					        modal: true,
					        buttons: {
					            "Ok": function() {
					            	if (typeof okCallback !== 'undefined')
					            		okCallback();
					                $( this ).dialog( "close" );
					            },
					            "Cancel": function() {
					            	if (typeof cancelCallback !== 'undefined')
					            			cancelCallback();
					                $( this ).dialog( "close" );
					            }
					        }
					    });
	
	$('#addServiceDialog').append($("<p id='dialogContent'></p>"));
};

function useDispatcher(callback) {
	$.ajax({
		url: 'rest/ServiceCatalog/dispatcher',
		type: 'POST',
		dataType: 'json',
		contentType: "application/json",
		data: '{"request":"getServices"}',
		success: function(result) {
			callback(result);
		},
		error: function(jqXHR, textStatus, errorThrown){
	        alert('error: ' + textStatus + ':' + errorThrown);
	        return null;
	    }
	});
};

function getServices(callback) {
	$.ajax({
		url: 'rest/ServiceCatalog/getServices',
		type: 'GET',
		dataType: 'json',
		success: function(result) {
			callback(result);
		},
		error: function(jqXHR, textStatus, errorThrown){
	        alert('error: ' + textStatus + ':' + errorThrown);
	        return null;
	    }
	});
	
};

function addService(service) {
	$.ajax({
		url: 'rest/ServiceCatalog/addService',
		type: 'POST',
		dataType: 'json',
		contentType: "application/json",
		data: JSON.stringify(service),
		success: function(result) {
			handleReturn(result);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('error: ' + textStatus + ':' + errorThrown);
	        return null;
	    }
	});
};

function buildPriceList(services) {
	
	var tbody = $('.pricelist-table');
	var row;
	var col;
	
	for(var i=0; i<services.length; i++){
	    row = $('<tr></tr>').addClass('pricelist-row');	
	    col = $('<td></td>').addClass('pricelist-col').text(services[i].type);
	    row.append(col);
	    col = $('<td></td>').addClass('pricelist-col').text(services[i].category);
	    row.append(col);
	    col = $('<td></td>').addClass('pricelist-col').text(services[i].name);
	    row.append(col);
	    col = $('<td></td>').addClass('pricelist-col').text(services[i].price);
	    row.append(col);		    
	    tbody.append(row);
	}	
};

function handleReturn(serviceId) {
	if (serviceId > 0)
		alert('New service added successfully.\nService ID is ' + serviceId);
	else
		alert('Adding new service operation failed!');
};