// Check if the document was loaded and functional

$(document).ready(function() {
	
	var table = $('<table></table>').addClass('pricelist-table');	
	var thead = $('<thead></thead>');
	var tbody = $('<tbody></tbody>');
	
	table.append(thead);
	table.append(tbody);
	
	var row = $('<tr></tr>').addClass('pricelist-head');
    var col = $('<th></th>').addClass('pricelist-col').text("קטגוריה");
    row.append(col);
    col = $('<th></th>').addClass('pricelist-col').text("שם");
    row.append(col);
    col = $('<th></th>').addClass('pricelist-col').text("מחיר");
    row.append(col);	
    thead.append(row);

	$('#mainDiv').append(table);
	
	var addButton = $('<button/>');	
	addButton.addClass('pricelist-button').text("הוסף");
	addButton.click(showAddNewServiceDialog);
	
	var updateButton = $('<button/>');	
	updateButton.addClass('pricelist-button').text("עדכן");
	updateButton.click(showUpdateServiceDialog);
	
	var deleteButton = $('<button/>');	
	deleteButton.addClass('pricelist-button').text("מחק");
	deleteButton.click(deleteService);
	
	$('#mainDiv').append(addButton);
	$('#mainDiv').append(updateButton);
	$('#mainDiv').append(deleteButton);
	
	$('#mainDiv').dialog();
		
// This is only to demo how to use Post	
//	useDispatcher(buildPriceList);
	
	getServices(buildPriceList); 
		
});

function showAddNewServiceDialog() {
	//var dialog = createDialog("מחק", "הכנס פרטים");
	//$('#mainDiv').append(dialog);
	//addService(handleReturn);
	
	$('#mainDiv').dialog();
};

function showUpdateServiceDialog() {
	alert("Update");
};

function deleteService() {
	alert("Delete");
};

function createDialog(title, text) {
    return $("<div class='dialog' title='" + title + "'><p>" + text + "</p></div>")
			    .dialog({
			        resizable: false,
			        height: 140,
			        modal: true,
			        buttons: {
			            "Confirm": function() {
			                $( this ).dialog( "close" );
			            },
			            Cancel: function() {
			                $( this ).dialog( "close" );
			            }
			        }
			    });
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
	        alert('error: ' + textStatus);
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
	        alert('error: ' + textStatus);
	        return null;
	    }
	});
	
};

function addService(callback) {
	$.ajax({
		url: 'rest/ServiceCatalog/addService',
		type: 'POST',
		dataType: 'json',
		contentType: "application/json",
		data: '{"type":"עיצוב שער", "category":"נשים", "name":"קארה", "price":"130.80"}',
		success: function(result) {
			callback(result);
		},
		error: function(jqXHR, textStatus, errorThrown){
	        alert('error: ' + textStatus);
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