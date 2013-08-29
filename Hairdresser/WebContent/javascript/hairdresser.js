// Check if the document was loaded and functional

$(document).ready(function() {
	
	var hairdresser = new Hairdresse();
	
	hairdresser.showServiceCatalog();			
});


// The Hairdresser object and constructor
function Hairdresse () {
	
	var _mainDiv = $('#mainDiv');
	var _newServiceDialog = null;
	var _updateServiceDialog = null;
	var _addServicedialogDiv = null;
	var _updateServicedialogDiv = null;
	var _selectedRowIndex = 0;
		
	this.showServiceCatalog = function() {
		
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

		_mainDiv.append(table);		
		
		var addButton = $('<input type="submit" value="Add" />');
		addButton.button().click(showAddNewServiceDialog);
		_mainDiv.append(addButton);
		
		var updateButton = $('<input type="submit" value="Update" />');
		updateButton.button().click(showUpdateServiceDialog);
		_mainDiv.append(updateButton);
		
		var deleteButton = $('<input type="submit" value="Delete" />');
		deleteButton.button().click(deleteService);
		_mainDiv.append(deleteButton);
		
		//table.click(selectRow);
		

		// This is only to demo how to use Post	
		//useDispatcher(buildPriceList);
		
		getServices(buildPriceList); 		
	};
	
	function selectRow(event) {
		_selectedRowIndex = this.rowIndex;
		$(this).addClass("highlight").siblings().removeClass("highlight");
	}
	
	
	function showAddNewServiceDialog() {
		
		if (_newServiceDialog == null) {
			_addServicedialogDiv = $('<div id="addServiceDialog"></div>').addClass('dialog-div');
			_mainDiv.append(_addServicedialogDiv);
			
			_newServiceDialog = new ServiceDialog(_addServicedialogDiv, handleNewService);
		}
		
		_newServiceDialog.open();		
		// we need this to prevent the dialog from closing after initializing
		return false;
	}
	
	function showUpdateServiceDialog() {
		
		if (_updateServiceDialog == null) {
			_updateServicedialogDiv = $('<div id="updateServiceDialog"></div>').addClass('dialog-div');
			_mainDiv.append(_updateServiceDialog);
			
			_updateServiceDialog = new ServiceDialog(_updateServicedialogDiv, handleUpdateService);
		}
		
		_updateServiceDialog.open({type: "type", category:"ctegory", name:"name", price:"234"});		
		// we need this to prevent the dialog from closing after initializing
		return false;
	}

	function handleNewService() {		
		addService(_newServiceDialog.getService());
	}
	
	function handleUpdateService(){
		alert("handleUpdateService");
	}

	function deleteService() {
		alert("Delete");
	}

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
	}

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
		
	}

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
	}

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
		
		$('.pricelist-row').click(selectRow);
	}

	function handleReturn(serviceId) {
		if (serviceId > 0)
			alert('New service added successfully.\nService ID is ' + serviceId);
		else
			alert('Adding new service operation failed!');
	}
}

