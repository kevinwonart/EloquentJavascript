//Chapter 5-Higher-Order Function
//Abstracting Repetition-pg 85
//
var scripts = require('./scripts.js');

function repeat(n, action){
    for(let i =0; i < n; i++){
        action(i);
    }
}

repeat(3,console.log, "Hello World");

let labels = [];
repeat(5, i =>{
    labels.push(`Unit ${i+1}`);
});
console.log(labels);

//Higher-Order Function-pg 86
//
// this one doesn't make sense to me
// isn't 'm' here undefined?
//
// greaterThan(10)
// function m => m > 10
// so
// greaterThan10(11)
// is
// function m(m)
//      m > 10
function greaterThan(n){
    return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));

function noisy(f){
    return (...args) => {
        console.log("calling with", args);
        let result = f(...args);
        console.log("called with", args, ", returned", result);
        return result;
    };
}
noisy(Math.min)(3,2,1);

function unless(test, then) {
    if (!test) then();
}

repeat(3, n => {
    unless(n % 2 ==1, () => {
        console.log(n, "is even");
    });
});

["A", "B", "A"].forEach(b => console.log(b));

function reduce(arr, combine, start) {
    let current = start;
    for (let element of arr){
        current = combine(current, element);
    }
    return current;
}

console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));

//Flatten-pg 95
var myarr = ["a", ["b", "c"], "d"];
console.log(myarr);
console.log(reduce(myarr, (a, b) => a.concat(b), [])); //[ 'a', 'b', 'c', 'd' ]
console.log(myarr.reduce((flat, current) => flat.concat(current), [])); //Author's solution outputs: [ 'a', 'b', 'c', 'd' ]

function test(arr, append){
    return arr.push(append);
}
// this doesn't work. conclusion "myarr.reduce()" is a builtin
// array feature in javascript
//console.log(["a", "b"].test("c"));

//Your Own Loop-pg 95
function myLoop(count, limit, step, action){
    if(limit(count)){
        action(count);
        myLoop(step(count), limit, step, action)
    }
}

//Author's solution
function loop(start, test, update, body) {
  for (let value = start; test(value); value = update(value)) {
    body(value);
  }
}

myLoop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1

myLoop(3, n => n > 0, n => n - 1, console.log);
//3
//2
//1


//Everything- pg 95
function every(arr, action){
    if(arr.length === 0) return "empty array";
    for(let element of arr){
        if(!action(element))    
            return false;
    }
    return true;
}

function everysome(arr, action){
    if(arr.length === 0) return "empty array";
    return !arr.some(element => !action(element));
}
console.log(every([1, 3, 5], n => n < 10)); //true
console.log(every([2, 4 , 16], n => n <10)); //false
console.log(every([], n => n < 10));//empty array
console.log(everysome([1, 3, 5], n => n < 10)); //true
console.log(everysome([2, 4 , 16], n => n <10)); //false
console.log(everysome([], n => n < 10));//empty array

//testing some !function() results not
//related to chapter 5
function f(n){
    return "a string";
}

const f10 = n => n > 10;

console.log(f); //[Function: f]
console.log(!f); //false
console.log(f("a"));//a string
console.log(f10(11));//true
console.log(f10(9));//false
console.log(!f10(11));//false
console.log(!f10(9));//true

console.log(SCRIPTS[0].name);


function filter(array, test) {
    let passed = [];
    for (let element of array) {
        if (test(element)) {
            passed.push(element);
        }
    }
    return passed;
}
//console.log(filter(SCRIPTS, script => script.living)); //[ { name: "Adlam ..."

function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => {
            return code >= from && code < to;
        })) {
            return script;
        }
    }
    return null;
}

console.log(characterScript(121)); // { name: 'Latin', ranges: ...

function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
        let name = groupName(item);
        let known = counts.findIndex(c => c.name == name);
        if (known == -1){
            counts.push({name, count: 1});
        } else {
            counts[known].count++;
        }
    }
    return counts;
}

console.log(countBy([1,2,3,4,5], n => n > 2)); // [ { name: false, count: 2 }, { name: true, count: 3 } ]

function dominantDirection(string){
    let str = string;

    //remove all characters not found in script object
    for(let i = 0; i < str.length; i++) 
        if(characterScript(str.charCodeAt(i)) == null){
            str = str.slice(0, i) + str.slice(i + 1, str.length-1);
            i--;
        }

    let counts = countBy(str, n => characterScript(n.charCodeAt(0)).direction);
    if( counts.length > 1) {
        return counts.reduce((a, b) => {
            return a.count > b.count ? a.name : b.name;
        });
    } else
        return counts[0].name;
}

//author's solution
function dominantDirection2(text) {
    let counted = countBy(text, char => {
      let script = characterScript(char.codePointAt(0));
      return script ? script.direction : "none";
    }).filter(({name}) => name != "none");

    if (counted.length == 0) return "ltr";

    return counted.reduce((a, b) => a.count > b.count ? a : b).name;
}

console.log(dominantDirection("He,llo!"));//ltr
console.log(dominantDirection("Hey, مساء الخير"));//rtl


/*
var name = "False";
var counts = [];
counts.push({name, count : 1});
counts.push({name, count : 1});
console.log(counts);
*/
