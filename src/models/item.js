define(function (require) {
	'use strict';

	var Record = require('bff/record');

	return Record.withProperties({

		title: 'string',

		completed: {
			type: 'boolean',
			defaultValue: false,
		},

		active: {
			getter: function () { return !this.completed; },
			setter: false,
		}

	});

});
