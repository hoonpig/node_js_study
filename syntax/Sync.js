var fs      = require('fs');

//read File Sync
/*
console.log('A');
var result  = fs.readFileSync('syntax/sample.txt','utf8');
console.log(result);
console.log('C');
*/


//read File ASync
// callback 인자가 있는경우에는 인자부분에 function 을 사용한다.
// 첫번째 인자는 보통 error 를 리턴한다.
// 두번째 인자는 결과값을 리턴한다.
console.log('A');
fs.readFile('syntax/sample.txt','utf8', function(err, result){
    console.log(result);
});
console.log('C');