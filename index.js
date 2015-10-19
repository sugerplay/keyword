var _ = require('lodash'),
  tools = require('./tools.js'),
  adv = require('./adv.json');
  
// for tools
var dispatch = tools.dispatch;

module.exports = function () {
  // utils
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
  
  String.prototype.reverse = function () {
    return this.split("").reverse().join("");
  }
  
  var count = function (text, target) {
    return (text.match(new RegExp(target, "g")) || []).length;
  }

  // function reverse = function () {
  //   return this.split("").reverse().join("");
  // }
  
  function reverseItems (list) {
    return _.map(list, function (a, i) {
      return a.reverse();
    });
  }
  
  function checkAdv (el) {
    var selected = '';
    _.each(adv, function (a, i) {
      if (el.endsWith(a) && selected === '') {
        selected = a;
      }
    })
    return selected;
  };
  
  // initializing
  
  adv = reverseItems(adv);
  // desc sorting
  adv.sort().reverse();
  adv = reverseItems(adv);
  
  return function (text, options) {
    var defopt = {};
    
    options = _.extend(options, defopt);
    
    var result = {};
    var src = text;
    src = src.replace(/['"′‘’“”(),\n]/g, ' ');
    src = src.replace(/[·\n]/g, ' ');
    src = src.replace(/[ ]+/g, ' ');
    var elements = src.split(' ');
    var ret = {};
    
    elements = _.map(elements, function (e, i) {
      var a = checkAdv(e);
      if (a !== '') {
        return e.substr(0, e.length - a.length);
      }
      if (e.substr(e.length-1, 1) === '.') {
        return '';
      }
      return e;
    });
    
    elements = _.uniq(elements);
    
    result = _.reduce(elements, function (r, e) {
      if (e.length > 1)
        r[e] = count(src, e);
          
      return r;
    }, {});
    
    return result;
  }
}