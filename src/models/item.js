define(function (require) {
	'use strict';

	var Record = require('libs/bff/dev/record');

	return Record.prototype.bindSchema({

		title: 'string',

		completed: {
			type: 'boolean',
			defaultValue: false,
			forbiddenValues: [ undefined ],
		},

		active: {
			getter: function () { return !this.completed; },
			setter: false,
		}

	});

});
