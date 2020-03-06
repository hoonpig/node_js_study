var members = ['hoonpig', 'eunae','ask1432','hoya'];
console.log(members[1]);
var i = 0;
while(i < members.length){
    console.log('array loop : ' + members[i]);
    i++;
}


var roles = {'programer':'hoonpig','designer':'eunae','manager':'ask1432','admin':'hoya'}
console.log(roles);
for(var name in roles){
    console.log('object : ', name, ' / value : ', roles[name]);
}