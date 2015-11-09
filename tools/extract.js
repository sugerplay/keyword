var a = $('p.exp').filter(function (i, x) {
  var forbidden = ['방언', '북한어', '군사', '불교'];
  var isForid = false;
  $(forbidden).each(function (j, y) {
    if ($(x).text().indexOf(y) >= 0)
      isForid = true;
  });
  
  return !isForid;
}).map(function (i, x) {
  return '\"' + $($(x).children()[0]).text() + '\"';
}).get().join(', ').replace(/-/g, '');
console.log(a);