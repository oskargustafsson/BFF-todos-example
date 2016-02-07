require.config({
	paths: {
		'text': '../node_modules/requirejs-text/text',
	},
	packages: [ {
		name: 'bff',
		location: '../node_modules/bff-lib/dist/dev', // Change to /prod for minified code w/ no error checks
	}, {
		name: 'lodash',
		location: '../node_modules/lodash-amd/modern',
	} ],
});

require([ 'app/view' ], function (AppView) {
	'use strict';

	var appView = new AppView();
	document.body.appendChild(appView.el);

});
