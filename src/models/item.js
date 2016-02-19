define([ 'bff/record' ], function (Record) {

	'use strict';

	return Record.withProperties({

		title: 'string',

		completed: { type: 'boolean', defaultValue: false },

		active: { type: 'boolean', getter: function () { return !this.completed; }  },

	});

});
