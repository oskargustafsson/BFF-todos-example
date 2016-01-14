define(function (require) {
	'use strict';

	var Record = require('libs/bff/dev/record');

	return Record.prototype.bindSchema({

		visible: 'boolean',

		editing: {
			type: 'boolean',
			defaultValue: false,
			forbiddenValues: [ undefined ],
		},

	});

});
