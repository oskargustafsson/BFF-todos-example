/* global Router */
define(function (require) {
	'use strict';

	var Record = require('bff/record');

	var RouterRecord = Record.withProperties({ route: 'string' });
	var routerRecord = new RouterRecord({ route: '' });

	// Init Director Router
	var directorRouter = new Router();
	directorRouter.on(/(.*)/, function (route) { routerRecord.route = route; });
	directorRouter.init();

	return routerRecord;

});
