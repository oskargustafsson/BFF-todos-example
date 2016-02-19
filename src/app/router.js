/* global Router */
define([ 'bff/record' ], function (Record) {

	'use strict';

	var RouterRecord = Record.withProperties({ route: 'string' });
	var routerRecord = new RouterRecord({ route: '' });

	// Init Director Router
	var directorRouter = new Router();
	directorRouter.on(/(.*)/, function (route) { routerRecord.route = route; });
	directorRouter.init();

	return routerRecord;

});
