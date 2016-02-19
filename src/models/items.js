define([ 'bff/list' ], function (List) {

	'use strict';

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
