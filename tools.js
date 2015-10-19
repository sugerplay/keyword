var _ = require('lodash');

function existy (x) { return x != null; }
function truthy (x) { return (x !== false) && existy(x); }

function cat () {
  var head = _.first(arguments);
  if (existy(head))
    return head.concat.apply(head, _.rest(arguments));
  return [];
}

function construct (head, tail) {
  return cat([head], _.toArray(tail));
}

function dispatch (/* funs */) {
  var funs = _.toArray(arguments);
  var size = funs.length;
  
  return function (target /*, args*/) {
    var ret = undefined;
    var args = _.rest(arguments);
    
    for (var i=0; i<size; i++) {
      var fun = funs[i];
      ret = fun.apply(fun, construct(target, args));
      
      if (existy(ret))
        return ret;
    }
    
    return ret;
  }
}

exports.existy = existy;
exports.truthy = truthy;
exports.cat = cat;
exports.construct = construct;
exports.dispatch = dispatch;