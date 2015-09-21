var should = require('should'),
    text = require("./texts.json"),
    keyword = require("../index.js");

describe('Test text', function() {
    describe('test', function () {
        it('korean', function (done) {
            should.equal(keyword.extract(text.ko), 'test');
        });
    });
    
});