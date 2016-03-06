require.config({
	paths: {
		'text': '../node_modules/requirejs-text/text',
	},
	packages: [ {
		name: 'bff',
		location: '../node_modules/bff-lib/dist/dev', // Change to /prod for minified code w/ no error checks
	}, {
		name: '_',
		location: '../node_modules/lodash-amd',
	} ],
});

require([ 'app/view' ], function (AppView) {
	'use strict';
	// Create the main app view and attach its DOM element to the document
	document.body.appendChild(new AppView().el);
});
