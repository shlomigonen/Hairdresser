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
		
// This is only to demo how to use Post	
//	usePost(buildPriceList);
	
	useGet(buildPriceList); 
});

function usePost(callback) {
	$.ajax({
		url: 'rest/PriceList/dispatcher',
		type: 'POST',
		dataType: 'json',
		contentType: "application/json",
		data: '{"request":"getPriceList"}',
		success: function(result) {
			callback(result);
		},
		error: function(jqXHR, textStatus, errorThrown){
	        alert('error: ' + textStatus);
	        return null;
	    }
	});
};

function useGet(callback) {
	$.ajax({
		url: 'rest/PriceList/getPriceList',
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

function buildPriceList(priceList) {
	
	var tbody = $('.pricelist-table');
	var row;
	var col;
	
	for(var i=0; i<priceList.length; i++){
	    row = $('<tr></tr>').addClass('pricelist-row');		
	    col = $('<td></td>').addClass('pricelist-col').text(priceList[i].category);
	    row.append(col);
	    col = $('<td></td>').addClass('pricelist-col').text(priceList[i].name);
	    row.append(col);
	    col = $('<td></td>').addClass('pricelist-col').text(priceList[i].price);
	    row.append(col);		    
	    tbody.append(row);
	}	
};