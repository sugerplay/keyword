var _ = require('lodash');
    
exports.extract = function (text, options) {
    
    var defopt = {
    };
    
    options = _.extend(options, defopt);
    
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
    
    var result = {};
    var src = text;
    src = src.replace(/['"′‘’“”(),\n]/g, ' ');
    src = src.replace(/[·\n]/g, ' ');
    src = src.replace(/[ ]+/g, ' ');
    var elements = src.split(' ');
    var ret = {};
    
    var adv = '가,같이,거나,게,게로,에게로,게서,에게서,고,곧,' +
        '과,그래,그려,까지,깨나,께,께서,꼐압서,께옵서,' +
        '께오서,끄정,들,즉,즉슨,커녕,나,나마,는,는커녕,' +
        '다,다가,대로,더러,도,도고,두,든,든가,든지,따라,' +
        '랑,랑은,라,라고,라도,라든가,라든지,라서,라야,' +
        '라야만,란,로,로부터,로서,로써,를,마냥,마는,' +
        '마다,마따나,마저,마치,만큼,마콤,만,마는,만치,' +
        '며,면,밖에,버덤,보다,보고,부터,뿐,사말로,' +
        '새로에,서,서껀,서부터,설라믄,설랑은,설랑,손,' +
        '시여,아,안테로,야,야말로,에,에게,에게다,' +
        '에게로,에게서,에는,에다,에다가,에로,에를,에서,' +
        '에서부터,에설랑,에야,에의,엔,엔들,엘,여,예,' +
        '와,요,으로,으로부터,으로서,으로써,은,은커녕,을,' +
        '을랑,을랑은,의,이,이고,이나,이나따나,이나마,이니,' +
        '이다,이든,이든지,이라,이라고,이라도,이라든가,' +
        '이라든지,이라서,이라야,이라야만,이란,이랑,이랴,' +
        '이며,이면,이시여,이야,이야말로,이여,인들,인즉,' +
        '인즉슨,일랑,일랑은,조차,처럼,치고,치고는,치고서,' +
        '카냥,커녕,토록,하고,하며,한데,한테로,한테서,' +
        '할래,헌테';
    adv = adv.split(',');
    
    for (var i=0; i<adv.length; i++) {
        adv[i] = adv[i].reverse();
    }
    
    adv.sort().reverse();
    
    _.each(adv, function (v, i) {
        adv[i] = v.reverse();
    });
    
    var checkAdv = function (el) {
        var selected = '';
        _.each(adv, function (a, i) {
            if (el.endsWith(a) && selected === '') {
                selected = a;
            }
        })
        return selected;
    };
    
    _.each(elements, function (e, i, list) {
        var a = checkAdv(e);
        if (a !== '') {
            list[i] = e.substr(0, e.length - a.length);
        }
        if (list[i].substr(list[i].length-1, 1) === '.') {
            list[i] = '';
        }
    });
    
    elements = _.uniq(elements);
    
    result = _.reduce(elements, function (r, e) {
        if (e.length > 1)
            r[e] = count(src, e);
            
        return r;
    }, {});
    
    return result;
}