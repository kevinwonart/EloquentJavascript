//Chapter 5-Higher-Order Function
//Abstracting Repetition-pg 85
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
// this doesn't work. conclusion "myarr.reduce" is a builtin
// array function in javascript
//console.log(["a", "b"].test("c"));

//Your Own Loop- pg 95

