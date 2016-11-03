define([
  'backbone',
  'jquery',
  'lodash',
], function(Backbone, jQuery, _) {
  var ApiModel = Backbone.Model.extend({
    url: '/api/json',
  });
  return ApiModel;
});
