# keyword-extractor-korean
For extracting keywords from plain-text(korean).

## Install

```js
npm install keyword-extractor-korean
```

## Test

```js
npm test
```

## Usage

```js
var keyword = require("keyword-extractor-korean");

keyword.extract('국가안전보장회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.');
// {'국가안전보장회의': 1, '조직': 1, '직무범위': 1,
//  '기타': 1, '필요': 1, '사항': 1, '법률': 1}
```

## Options

```js
to be update
동사 제거 기능도 추가될 예정
```