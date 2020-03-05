
//익명함수
//변수에 대입한다.
var a = function(B){
    console.log(`A${B}`);
}

// callback()을 실행하면 매개변수로 받은 a 의 함수를 호출하여, a 의 함수내용을 실행한다.
// slowfunc 함수의 기능을 다 수행한다음, a 함수를 수행하는개념
// callback() 부분에 함수호출도 가능하다
function slowfunc(callback){
    callback('B');
}

slowfunc(a);