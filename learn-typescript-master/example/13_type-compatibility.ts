//타입 호환
interface Developer {
    name: string;
    skill: string;
}

interface Person {
    name: string;
}

var developer: Developer;
var person: Person;
developer = person; // X 할당불가
person = developer; // O 호환가능

//함수
var add = function(a: number){}
var sum = function(a: number, b: number){}

sum = add; //호환가능
add = sum;
