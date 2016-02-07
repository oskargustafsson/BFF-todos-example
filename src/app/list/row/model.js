define(function (require) {
	'use strict';

	var Record = require('libs/bff/dev/record');

	return Record.withProperties({

		visible: 'boolean',

		editing: {
			type: 'boolean',
			defaultValue: false,
		},

	});

});
