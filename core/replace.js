var _ = require('lodash');
  
function replace (src, dst) {
  return function (text) {
    var reg = new RegExp('[' + src + ']', "g")
    return text.replace(reg, dst).replace(/[ ]+/g, dst);
  };
}

module.exports = replace;