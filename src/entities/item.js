define(function (require) {
  'use strict';

  var Record = require('libs/bff/dev/record');

  return Record.prototype.bindSchema({

    title: {
      type: 'string',
      forbiddenValues: [ undefined ],
    },

    completed: {
      type: 'boolean',
      defaultValue: false,
      forbiddenValues: [ undefined ],
    },

  });

});
