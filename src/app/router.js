/* global Router */
define(function (require) {
	'use strict';

	var Record = require('libs/bff/dev/record');

	var router = new Record({
		route: {
			type: 'string',
			defaultValue: '',
		},
	});

	// Init Director Router
	var directorRouter = new Router();
	directorRouter.on(/(.*)/, function (route) { router.route = route; });
	directorRouter.init();

	return router;

});
