var methodMap = {
  'create': 'POST',
  'update': 'PUT',
  'delete': 'DELETE',
  'read'  : 'GET'
};

Backbone.sync = function(method, model, success, error) {
  var sendModel = method === 'create' || method === 'update';
  var data = sendModel ? { model : model } : undefined;  
  var type = methodMap[method];
  if (Backbone.emulateHttp && (type === 'PUT' || type === 'DELETE')) {
    data._method = type;
    type = 'POST';
  }
  
  if (window.hasOwnProperty('GLOBAL_SOCKET_ID')) {
    data.socket_id = GLOBAL_SOCKET_ID;
  }
  
  $.ajax({
    url         : getUrl(model),
    type        : type,
    contentType : 'application/json',
    data        : JSON.stringify(data),
    dataType    : 'json',
    success     : success,
    error       : error
  });
};

// Helper function to get a URL from a Model or Collection as a property
// or as a function.
var getUrl = function(object) {
  if (!(object && object.url)) throw new Error("A 'url' property or function must be specified");
  return _.isFunction(object.url) ? object.url() : object.url;
};