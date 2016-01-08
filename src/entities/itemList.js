define(function (require) {
  'use strict';

  var List = require('libs/bff/dev/list');

  return List.prototype.bindSchema({

    nCompleted: {
      getter: function () {
        return this.reduce(function (nCompleted, item) {
          return nCompleted + (item.completed ? 1 : 0);
        }, 0);
      },
      dependencies: [ 'length', 'item:completed' ],
    }

  });

});
