require.config({
  paths: {
    'text': '../node_modules/requirejs-text/text',
    'lodash': '../node_modules/lodash/lodash',
  },
  packages: [ {
    name: 'bff',
    location: '../bff/dev', // TODO: Replace symbolic link with something better
  }, {
    name: 'lodash',
    location: '../node_modules/lodash-amd/modern',
  } ],
});

require([
  'app/view',
], function (
  AppView
) {
  'use strict';
  document.body.appendChild(new AppView().el);
});
