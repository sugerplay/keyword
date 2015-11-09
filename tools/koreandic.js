var cheerio = require('cheerio');

function run_cmd (cmd, callback) {
  var exec = require('child_process').exec;
  
  exec(cmd, callback);
}

function extract ($) {
  return $('p.exp').filter(function (i, x) {
    var forbidden = ['방언', '북한어', '군사', '불교'];
    var isForid = false;
    $(forbidden).each(function (j, y) {
      if ($(x).text().indexOf(y) >= 0)
        isForid = true;
    });
    
    return !isForid;
  }).map(function (i, x) {
    return $($(x).children()[0]).text();
  }).get();
}

function parse (page, start, callback, result) {
  result = result || [];
  run_cmd(
    'curl "http://stdweb2.korean.go.kr/search/List_dic.jsp" -H "Pragma: no-cache" -H "Origin: http://stdweb2.korean.go.kr" -H "Accept-Encoding: gzip, deflate" -H "Accept-Language: ko-KR,ko;q=0.8,en-US;q=0.6,en;q=0.4" -H "Upgrade-Insecure-Requests: 1" -H "User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36" -H "Content-Type: application/x-www-form-urlencoded" -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" -H "Cache-Control: no-cache" -H "Referer: http://stdweb2.korean.go.kr/search/List_dic.jsp" -H "Cookie: JSESSIONID=475B827DA252B0402B979D53D9061393" -H "Connection: keep-alive" --data "selType=1&sql=SELECT+*+FROM++"%"0D"%"0A"%"09"%"28SELECT+"%"0D"%"0A"%"09"%"09ROW_NUMBER"%"28"%"29+OVER+"%"28ORDER+BY+A.WORD_SEQ"%"2CA.SUP_NO"%"2CA.WORD"%"29+ROWNO"%"2C"%"0D"%"0A"%"09"%"09A.WORD_NO"%"2CA.ORG_WORD"%"2CA.SUP_NO"%"2CA.ORG_LANGUAGE"%"2CF_GET_PRONUN"%"28A.WORD_NO"%"29+PRONUNCIATION"%"2CA.ORIGIN"%"2CA.SOUND_SEQ"%"2C"%"0D"%"0A"%"09"%"09NVL"%"28TO_CHAR"%"28A.UPDATED_TIME"%"2C"%"27YYYY-MM-DD"%"27"%"29"%"2C"%"27+"%"27"%"29+UPDATED_TIME+"%"0D"%"0A"%"09FROM+"%"0D"%"0A"%"09WORDS+A+"%"0D"%"0A"%"09WHERE+A.WORD_NO+IN+"%"28+"%"0D"%"0A"%"09"%"09SELECT+WORD_NO+"%"0D"%"0A"%"09"%"09FROM+SPEECHPART+"%"0D"%"0A"%"09"%"09WHERE+SP_CODE+IN+%28%278%27%2C%2717%27%2C%2719%27%2C%2723%27%29+%0D%0A+%09%09%29+%0D%0A%09%29+%0D%0AWHERE+ROWNO+"%"3E"%"3D+'
    + start +
    '+AND+ROWNO+"%"3C"%"3D+'
    + (start + 10) +
    '+"%"0D"%"0A&idx=&go='
    + page + 
    '&gogroup=&PageRow=10&ImeMode=&setJaso=&JasoCnt=0&SearchPart=SP&ResultRows=18047&SearchStartText=&SearchEndText=&JasoSearch=&arrSearchLen=0&Table=words"%"7Cword&Gubun=0&OrgLang=&TechTerm=&SearchText=&SpCode=8" --compressed',
    function(error, stdout, stderr) {
      // console.log(stdout);
      var $ = cheerio.load(stdout);
      var out = extract($);
      
      console.log(out);
      if (out.length != 0) {
        result = result.concat(out);
        parse(page+1, start+out.length, callback, result);
        console.log(result.length + ' items parsed!');
      }
      else {
        callback(result);
      }
  });
}

parse(1, 0, function (out) {
  console.log(JSON.stringify(out.map(function (x) {return x.replace(/[- ]/g, '')})));
})