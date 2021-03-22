interface Developer {
    name: string;
    skill: string
}

interface Person {
    name: string;
    age: number;
}

function introduce(): Developer | Person{
    return { name: 'Tony', age: 33, skill: 'Iron Making'}
}

var tony = introduce();
console.log(tony.skill) // x

//타입가드
function isDeveloper(target: Developer | Person): target is Developer {
    return (target as Developer).skill !== undefined;
} //true or false 반홚함

if(isDeveloper(tony)){
    console.log(tony.skill)
} else {
    console.log(tony.age)
}
