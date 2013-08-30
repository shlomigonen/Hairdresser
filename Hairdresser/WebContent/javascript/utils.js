Utils = new function() {
	var _id = 0;
	  this.getNextUniqueId = function() {
	    return"_" + _id++;
	  };
};