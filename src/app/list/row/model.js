define(function (require) {
	'use strict';

	var Record = require('bff/record');

	return Record.withProperties({

		visible: 'boolean',

		editing: {
			type: 'boolean',
			defaultValue: false,
		},

	});

});
