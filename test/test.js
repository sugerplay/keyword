var should = require('should'),
    text = require("./texts.json"),
    keyword = require("../index.js");

describe('Test text', function() {
    describe('test', function () {
        it('korean', function () {
            var expectaion = {'국가안전보장회의': 1, '조직': 1, '직무범위': 1, '기타': 1, '필요한': 1, '사항': 1, '법률': 1};
            var result = keyword.extract(text.test);
            
            result.should.not.be.empty;
            
            result.should.eql(expectaion);
        });
    });
    
});