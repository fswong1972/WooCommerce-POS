var Route = require('lib/config/route');
var Radio = require('backbone.radio');
var View = require('./view');

var ReceiptRoute = Route.extend({

  initialize: function( options ) {
    options = options || {};
    this.container = options.container;
    this.collection = Radio.request('entities', 'get', {
      name: 'orders',
      type: 'collection'
    });
  },

  fetch: function() {
    return this.collection.fetch({
      remote: true,
      data: {
        filter: {
          limit: 1
        }
      }
    });
  },

  render: function() {
    var view = new View({
      model: this.collection.at(0)
    });
    this.container.show(view);
  }

});

module.exports = ReceiptRoute;