var should = require('should'),
    text = require("./texts.json"),
    tools = require("../tools.js"),
    keyword = require("../index.js");
    
describe('Test for functional js', function() {
  it('are functions exist.', function () {
    should.exist(tools.existy);
    should.exist(tools.truthy);
    should.exist(tools.cat);
    should.exist(tools.construct);
    should.exist(tools.dispatch);
  });
  
  it('is existy running.', function () {
    should(tools.existy(undefined)).be.exactly(false);
    should(tools.existy(null)).be.exactly(false);
    should(tools.existy(1)).be.exactly(true);
    should(tools.existy('dadsf')).be.exactly(true);
    should(tools.existy(true)).be.exactly(true);
    should(tools.existy(false)).be.exactly(true);
    var b = 2;
    should(tools.existy(b)).be.exactly(true);
    should(tools.existy(function () {})).be.exactly(true);
  });
  
  it('is truthy running.', function () {
    should(tools.truthy(undefined)).be.exactly(false);
    should(tools.truthy(null)).be.exactly(false);
    should(tools.truthy(1)).be.exactly(true);
    should(tools.truthy('dadsf')).be.exactly(true);
    should(tools.truthy(true)).be.exactly(true);
    should(tools.truthy(false)).be.exactly(false);
    var b = 2;
    should(tools.truthy(b)).be.exactly(true);
    should(tools.truthy(function () {})).be.exactly(true);
  });
  
  it('is cat running.', function () {
    should(tools.cat([1], [2])).be.eql([1, 2]);
    should(tools.cat([1], [2, 3], [4])).be.eql([1, 2, 3, 4]);
  });
  
  it('is construct running.', function () {
    should(tools.construct(1, [2])).be.eql([1, 2]);
    should(tools.construct(1, [2, 3, 4])).be.eql([1, 2, 3, 4]);
  });
  
  it('is dispatch running.', function () {
    var f = tools.dispatch(function (a) {
      if (a == 1) return 1;
    }, function (a) {
      if (a == 2) return 2;
    })
    should(typeof f).be.eql('function');
    should(f(1)).be.eql(1);
    should(f(2)).be.eql(2);
    should(f(3)).be.eql(undefined);
  });
});

describe('Test for extracting text', function() {
  it('korean', function () {
    var expectaion = {'국가안전보장회의': 1, '조직': 1, '직무범위': 1, '기타': 1, '필요한': 1, '사항': 1, '법률': 1},
      extract = keyword(),
      result = extract(text.test);
    
    result.should.not.be.empty;
    result.should.eql(expectaion);
  });
});