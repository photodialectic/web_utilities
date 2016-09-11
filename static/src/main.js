define([
  'backbone',
  'jquery',
  'lodash',
  'api_model',
], function(Backbone, jQuery, _, ApiModel) {

  var App = Backbone.View.extend({
    el: 'body',
    events: {
      'click' : function() {debugger;},
    }

  });

  new App({model: new ApiModel()});

});
