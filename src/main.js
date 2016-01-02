require.config({
  paths: {
    'text': '../node_modules/requirejs-text/text',
  },
  packages: [ {
    name: 'bff',
    location: '../bff/dev', // TODO: Replace symbolic link with something better
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
