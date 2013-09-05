
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
	var _selectedRow = null;
		
	this.showServiceCatalog = function() {
		
		var table = $('<table></table>').addClass('catalog-table');	
		var thead = $('<thead></thead>');
		var tbody = $('<tbody></tbody>');
		
		table.append(thead);
		table.append(tbody);
		
		var row = $('<tr></tr>').addClass('catalog-head');
	    var col = $('<th></th>').addClass('catalog-col').text("Type");
	    row.append(col);
	    col = $('<th></th>').addClass('catalog-col').text("Category");
	    row.append(col);
	    col = $('<th></th>').addClass('catalog-col').text("Name");
	    row.append(col);
	    col = $('<th></th>').addClass('catalog-col').text("Price");
	    row.append(col);	
	    col = $('<th></th>').addClass('catalog-col').text("ID");
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
		deleteButton.button().click(handleDeleteService);
		_mainDiv.append(deleteButton);
			
		showServiceCatalog(); 		
	};
	
	function selectRow(event) {
		_selectedRow = this;
		$(this).addClass("highlight").siblings().removeClass("highlight");
	}
	
	
	function showAddNewServiceDialog() {
		
		if (_newServiceDialog == null) {
			_addServicedialogDiv = $('<div id="addServiceDialog"></div>').addClass('dialog-div');
			_mainDiv.append(_addServicedialogDiv);
			
			_newServiceDialog = new ServiceDialog(_addServicedialogDiv, "New Service", handleNewService);
		}
		
		_newServiceDialog.open();		
		// we need this to prevent the dialog from closing after initializing
		return false;
	}
	
	function showUpdateServiceDialog() {
		
		if (_updateServiceDialog == null) {
			_updateServicedialogDiv = $('<div id="updateServiceDialog"></div>').addClass('dialog-div');
			_mainDiv.append(_updateServiceDialog);
			
			_updateServiceDialog = new ServiceDialog(_updateServicedialogDiv, "Update Service", handleUpdateService);
		}
		
		if (_selectedRow == null) {
			alert("Please select a service from the table ane then click on update");
		}
		else {
			_updateServiceDialog.open({	type: $(_selectedRow).find("#serviceType").text(), 
										category: $(_selectedRow).find("#serviceCategory").text(), 
										name: $(_selectedRow).find("#serviceName").text(), 
										price: $(_selectedRow).find("#servicePrice").text()});	
		}
		
		// we need this to prevent the dialog from closing after initializing
		return false;
	}

	function handleNewService() {		
		addService(_newServiceDialog.getService());
	}
	
	function handleUpdateService(){
		var service = _updateServiceDialog.getService();
		service.id = $(_selectedRow).find("#serviceId").text();
		updateService(service);
	}

	function handleDeleteService() {
		if (_selectedRow == null) {
			alert("Please select a service from the table ane then click on delete");
		}
		else {
			// TODO: show a confirmation dialog			
			var service = {	type: $(_selectedRow).find("#serviceType").text(), 
							category: $(_selectedRow).find("#serviceCategory").text(), 
							name: $(_selectedRow).find("#serviceName").text(), 
							price: $(_selectedRow).find("#servicePrice").text(),
							id: $(_selectedRow).find("#serviceId").text()};
			
			deleteService(service);
		}
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
				if (result > 0)
					alert('New service added successfully.\nService ID is ' + result);
				else
					alert('Adding new service operation failed!');
			},
			error: function(jqXHR, textStatus, errorThrown){
				alert('error: ' + textStatus + ':' + errorThrown);
		        return null;
		    }
		});
	}
	
	function updateService(service) {
		$.ajax({
			url: 'rest/ServiceCatalog/updateService',
			type: 'POST',
			dataType: 'json',
			contentType: "application/json",
			data: JSON.stringify(service),
			success: function(result) {
				if (result == true)
					alert('Service updated successfully.');
				else
					alert('Updating service operation failed!');
			},
			error: function(jqXHR, textStatus, errorThrown){
				alert('error: ' + textStatus + ':' + errorThrown);
		        return null;
		    }
		});
	}
	
		
	function deleteService(service) {
		$.ajax({
			url: 'rest/ServiceCatalog/deleteService',
			type: 'POST',
			dataType: 'json',
			contentType: "application/json",
			data: JSON.stringify(service),
			success: function(result) {
				if (result == true)
					alert('Service deleted successfully.');
				else
					alert('Deleting service operation failed!');
			},
			error: function(jqXHR, textStatus, errorThrown){
				alert('error: ' + textStatus + ':' + errorThrown);
		        return null;
		    }
		});
	}

	function showServiceCatalog() {
		
		getServices(handleServices); 
		
		function handleServices(services) {
			var tbody = $('.catalog-table');
			var row;
			var col;
			
			for(var i=0; i<services.length; i++){
			    row = $('<tr></tr>').addClass('catalog-row');	
			    col = $('<td id="serviceType"></td>').addClass('catalog-col').text(services[i].type);
			    row.append(col);
			    col = $('<td id="serviceCategory"></td>').addClass('catalog-col').text(services[i].category);
			    row.append(col);
			    col = $('<td id="serviceName"></td>').addClass('catalog-col').text(services[i].name);
			    row.append(col);
			    col = $('<td id="servicePrice"></td>').addClass('catalog-col').text(services[i].price);
			    row.append(col);	
			    col = $('<td id="serviceId"></td>').addClass('catalog-col').text(services[i].id);
			    row.append(col);
			    tbody.append(row);
			}	
			
			$('.catalog-row').click(selectRow);
		}
	}
	
}

