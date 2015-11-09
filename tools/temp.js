var _ = require('lodash'),
  text = require("./texts.json"),
  keyword = require("../index.js"),
  extract = keyword();
  
function foo (name) {
  var result = extract(name);
  
  var r = _.reduce(result, function (total, x, i) {
    total.push({value: x, index: i});
    return total;
  }, []);
  
  r.sort(function (a, b) {
    return b.value - a.value;
  });
  
  return r.slice(0,10);
}

console.log(foo(text.news1));
console.log(foo(text.news2));