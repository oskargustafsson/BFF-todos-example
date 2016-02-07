define(function (require) {
	'use strict';

	var List = require('bff/list');

	var ItemList = List.withProperties({

		nCompleted: {
			getter: function () {
				return this.reduce(function (nCompleted, item) {
					return nCompleted + (item.completed ? 1 : 0);
				}, 0);
			},
			dependencies: [ 'length', 'item:completed' ],
		},

		nActive: {
			getter: function () { return this.length - this.nCompleted; },
			// No dependencies specified -> will not trigger any events
		},

	});

	return new ItemList();

});
