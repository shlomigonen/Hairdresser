Utils = new function() {
	var _id = 0;
	this.dictionary = null;

	this.getNextUniqueId = function() {
		return "_" + _id++;
	};

	this.setDictionary = function(dictionary)
	{
		this.dictionary = dictionary;
	};
};