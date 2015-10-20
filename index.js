var _ = require('lodash'),
  postPos = require('./postposition');
  
module.exports = function () {
  // utils
  function endsWith (text, suffix) {
    return text.indexOf(suffix, text.length - suffix.length) !== -1;
  };
  
  var count = function (text, target) {
    return (text.match(new RegExp(target, "g")) || []).length;
  }

  function reverseString (str) {
    return str.split('').reverse().join('');
  }
  
  function reverseItems (list) {
    return _.map(list, reverseString);
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
      require('./core/replace')(trash, ' ')
    );
    
    return algorithm(text);
  }
}