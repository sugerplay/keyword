var _ = require('lodash'),
  count = require('count-string'),
  postPos = require('./postposition');
  
module.exports = function () {
  // utils
  function endsWith (text, suffix) {
    return text.indexOf(suffix, text.length - suffix.length) !== -1;
  };
  
  function reverseString (str) {
    return str.split('').reverse().join('');
  }
  
  function reverseItems (list) {
    return _.map(list, reverseString);
  }
  
  function replace (src, dst) {
    return function (text) {
      var reg = new RegExp(src, "g")
      return text.replace(reg, dst);
    };
  }
  
  function replaceToSpace (src) {
    return function (text) {
      return replace(src, ' ')(text).replace(/ +/g, ' ')
    };
  }
  
  function checkAdv (el) {
    var selected = '';
    _.each(postPos, function (a, i) {
      if (endsWith(el, a) && selected === '') {
        selected = a;
      }
    })
    return selected;
  };
  
  // initializing
  postPos = reverseItems(postPos);
  postPos.sort().reverse();
  postPos = reverseItems(postPos);
  
  return function (text, options) {
    var defopt = {};
    
    options = _.extend(options, defopt);

    var trash = '\'\"\′\‘\’\“\”\(\)\,\·\`\~\!\@\#\$\%\^\&\*\n\-';
    var algorithm = _.compose(
      function (elements) {
        return _.reduce(elements, function (r, e) {
          if (e.length > 1)
            r[e] = count(text, e);
              
          return r;
        }, {})
      },
      _.uniq,
      function (elements) {
        return _.map(elements, function (e, i) {
          var a = checkAdv(e);
          if (a !== '') {
            return e.substr(0, e.length - a.length);
          }
          else if (e.substr(e.length-1, 1) === '.') {
            return '';
          }
          return e;
        });
      },
      function (text) {
        return text.split(' ');
      },
      replaceToSpace('[' + trash + ']'),
      replace('\\.', '. ')
    );
    
    return algorithm(text);
  }
}