// Function constructor

/*
//var john ={
    //name: 'John',
    //yearOfBirth: 1990,
    //job: 'teacher'
//};


var Person = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;

    
    //this.calculateAge = function(){
       // console.log(2020 - this.yearOfBirth);
    //}
  
}

Person.prototype.calculateAge = function(){
    console.log(2020 - this.yearOfBirth);
}

Person.prototype.lastName = 'Smith';

var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');
john.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName);


console.log(john.hasOwnProperty('job')); // true
console.log(john.hasOwnProperty('lastName')); // false, because he inherit it but not own it
console.log(john instanceof Person); // true
*/


// Object.create

/*
var personProto = {
    calculateAge: function() {
        console.log(2020 - this.yearOfBirth);
    }
};

var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';


var jane = Object.create(personProto, {
    name: { value: 'Jane'},
    yearOfBirth: { value: 1969 },
    job: { value: 'designer' }
});
*/



// Primitives vs Objects

/*
// Primitives
var a = 23;
var b = a;

a = 46;
console.log(a, b);


// Objects
var obj1 = {
    name:'John',
    age:26
};
var obj2 = obj1;

obj1.age = 30;
console.log(obj1.age, obj2.age)

// Functions
var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
};

function change(a, b){
    a = 30;
    b.city = 'San Francisco';
}

change(age, obj);
console.log(age, obj.city);
*/

// ********************* Passing functions as arguments

var years = [1990, 1965, 1937,2005, 1998];

function arrayCalc(arr, func){
    var arrResult = [];
    for (var i = 0; i < arr.length; i++){
        arrResult.push(func(arr[i]));    
    }

    return arrResult;
}

function calculateAge(element){
    return 2020 - element;
}

function isFullAge(element){
    return element >= 18;
}

function maxHeartRate(element){

    if(element >= 18 && element <= 81){
        // The following formula to calculate the max heart rate the person can
        // reach while working out. The person should be 18 or older and 81 or younger
        // in order to the formula to work 
        return Math.round(206.9 - (0.67 * element));
    }else{
        return -1;
    }

}


var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);

console.log(ages);
console.log(fullAges);
console.log(rates);




// *********** Functions returning functions
function interviewQuestion(job){
    if(job === 'designer'){
        return function(name){
            console.log(name + ', can you please explain what UX design is?'); // user experience UX
        }
    }else if (job === 'teacher'){
        return function(name){
            console.log( 'What subject do you teach, ' + name + '?');
        }
    }else{
        return function(name){
            console.log('Hello '+ name +', what do you do?');
        }              
    }
}

var teacherQuestion = interviewQuestion('teacher');
teacherQuestion('John');


var designerQuestion = interviewQuestion('designer');
designerQuestion('John');
designerQuestion('Jane');
designerQuestion('Mark');


interviewQuestion('teacher')('Mike');



// *********** Immediatly Invoked Function Expressions IIFE

function game(){
    var score = Math.random() * 10;  // 0 - 9
    console.log(score >= 5);
}

game();

// another way using IIFE
(function (){
    var score = Math.random() * 10;  // 0 - 9
    console.log(score >= 5);
})();




(function (goodluck){
    var score = Math.random() * 10;  // 0 - 9
    console.log(score >= 5 - goodluck); // 5-5 = 0 and score always will be > 0
})(5); // always true


// ********** Closures

function retirement(retirementAge){
    var a = ' years left until retirement.';
    return function(yearOfBirth){
        var age = 2020 - yearOfBirth;
        console.log((retirementAge - age) + a) 
    }
}

var retirementUS = retirement(66);
retirementUS(1990); // Closures means that this function still have access to a and age variables
                    // even after the outer function returned
                    
retirement(66)(1990);


var retirementGermany = retirement(65);
var retirementIceland = retirement(67);


retirementUS(1990);
retirementGermany(1990);
retirementIceland(1990);




/*
// My solution --- Iyad
function interviewQ(job){
    var teacherQ = 'What subject do you teach, ';
    var designerQ = ', can you please exlplain what UX design is?'
    var anotherJobQ = 'Hello, what do you do?';
    return function(name){
        if(job === 'teacher'){
            console.log(teacherQ + name +'?');
        }else if (job === 'designer'){
            console.log(name + designerQ);
        }else{
            console.log(anotherJobQ, name);
        }
        
    }
}

var teacherQues = interviewQ('teacher');
teacherQues('Marrry');
var desQues = interviewQ('designer');
desQues('Maria');
var joQues = interviewQ('fff');
joQues('Kyle');
*/

// teacher solution
function interviewQues(job){
    return function(name){
        if(job === 'designer'){
            console.log(name + ', can you please explain what UX design is?');
        }else if (job === 'teacher'){
            console.log( 'What subject do you teach, ' + name + '?');
        }else{
            console.log('Hello '+ name +', what do you do?');
        }
    }
}

interviewQues('teacher')('Johny');



// ************* Bind, call and apply

var jojo = {
    name: 'Jojo',
    age: 27,
    job: 'teacher',
    presentation: function(style, timeOfDay){
        if(style === 'formal'){
            console.log('Good ' + timeOfDay + ', ladies and gentlemen! I\'m '+ this.name 
            + ', I\'m a ' + this.job + ' and I\'m ' + this.age +' years old.');
        }else if (style === 'friendly'){
            console.log('Hey! what\'s up? I\'m '+ this.name 
            + ', I\'m a ' + this.job + ' and I\'m ' + this.age +' years old. Have a nice ' + timeOfDay + '.');
        }
    }
};


var emily = {
    name: 'Emily',
    age:35,
    job: 'designer'
};

jojo.presentation('formal', 'morning');

// Using call() method
jojo.presentation.call(emily, 'friendly','afternoon');

// Using apply method(). It will not work because the original function
// doesn't have an array as parameter.
//jojo.presentation.apply(emily, ['friendly', 'afternoon']);

// Using Bind() method  // allow for us to preset some arguments
var jojoFriendly = jojo.presentation.bind(jojo, 'friendly')

jojoFriendly('morning');
jojoFriendly('night');

var emilyFormal = jojo.presentation.bind(emily, 'formal');

emilyFormal('afternoon');



var yearsSecond = [1990, 1965, 1937,2005, 1998];

function arrayCalcSecond(arr, func){
    var arrResult = [];
    for (var i = 0; i < arr.length; i++){
        arrResult.push(func(arr[i]));    
    }

    return arrResult;
}

function calculateAgeSecond(element){
    return 2020 - element;
}

function isFullAgeSecond(limit, element){
    return element >= limit;
}

var agesSecond = arrayCalcSecond(yearsSecond, calculateAgeSecond);
var fullAgeInJapan = arrayCalcSecond(agesSecond, isFullAgeSecond.bind(this,20)); //preset the first argument 'limit'
console.log(agesSecond);
console.log(fullAgeInJapan);
























