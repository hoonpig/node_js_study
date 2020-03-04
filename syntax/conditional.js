//콘솔에서 입력값 받기
//배열로 정보가 들어온다.
// 0 : nodejs 의 위치
// 1 : 실행된 js 의 위치
// 2~n : 입력받은 값의 수에따라서 배열의 크기만큼 커진다.
// 입력받은 값은 문자열

// node conditional.js hoonpig 실행결과
/*
hoonpigui-MacBookPro:syntax hoonpig$ node conditional.js hoonpig
[
  '/usr/local/bin/node',    // nodejs 위치
  '/Users/hoonpig/node_js_study/syntax/conditional.js', // 실행시킨 파일의 경로
  'hoonpig' //입력한 입력값
]
*/

// node conditional.js hoonpig 1234 실행결과
/*
hoonpigui-MacBookPro:syntax hoonpig$ node conditional.js hoonpig 1234
[
  '/usr/local/bin/node',
  '/Users/hoonpig/node_js_study/syntax/conditional.js',
  'hoonpig',
  '1234'
]
*/

var args = process.argv;

console.log(args[2]);
console.log('A');
console.log('B');

if(args[2] === '1'){
    console.log('C1');
}else{
    console.log('C2');
}

console.log('D');
