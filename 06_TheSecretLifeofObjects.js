//Chapter 6-The Secret Life of Objects
//
let rabbit = {};
rabbit.speak = function(line) {
    console.log(`The Rabbit says "${line}"`);
};

rabbit.speak("I'm done with graveyard shift.");
// The rabbit says "I'm done with graveyard shift."

function speak(line){
    console.log(`The ${this.type} rabbit says, "${line}"`);
}
let whiteRabbit = {type:  "white", speak};
let hungryRabbit = {type: "hungry", speak};
let emptyRabbit = {};

whiteRabbit.speak("Oh my ears and whiskers, " +
    "how late it's getting!");
// The white rabbit says, "Oh my ears and whiskers, how late it's getting!"
hungryRabbit.speak("I could use a carrot right now.");
// The hungry rabbit says, "I could use a carrot right now."
//emptyRabbit.speak("");// TypeError: emptyRabbit.speak is not a function
console.log(Object.getPrototypeOf(whiteRabbit));//[Object: null prototype] {}
console.log(Object.getPrototypeOf(whiteRabbit) ==
    Object.prototype);//true
console.log(Object.getPrototypeOf(whiteRabbit.speak));//{}
console.log(Object.getPrototypeOf(whiteRabbit.speak)+ "hiya");//function () { [native code] }hiya

//Call method-looks like it's works without instantiating it in JS
speak.call(hungryRabbit, "Burp!");
// The hungry rabbit says, "Burp!"
console.log(Object.getPrototypeOf(Object.call));//{}
console.log(Object.getPrototypeOf(speak.call));//{}


function normalize() {
    console.log(this.coords.map(n =>  n / this.length));
}
normalize.call({coords: [0, 2, 3], length: 5});// [0, 0.4, 0.6]

let empty = {};
console.log(empty.toString);//[Function: toString]
console.log(empty.toString());//[object Object]
//"When an object gets a request for a property it doesn't have
//it searches the prototype next and then its prototype's prototype,
//etc etc. this is why [].reduce() works without adding explicitly 
//calling prototype, at least thats what i'm gathering
console.log(Object.getPrototypeOf({}) ==
    Object.prototype);//true

console.log(Object.getPrototypeOf(Object.prototype));//null

console.log(Object.getPrototypeOf(Math.max) == 
    Function.prototype);//true
console.log(Object.getPrototypeOf([]));//Object(0) []
console.log(Object.getPrototypeOf([]) ==
    Array.prototype);//true

//Creating an object with a prototype pg 100
let protoRabbit = {
    speak(line) {
        console.log(`The ${this.type} rabbit says "${line}"`);
    }
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEE!");
console.log(Object.getPrototypeOf(killerRabbit));//{ speak: [Function: speak] }
console.log(Object.getPrototypeOf(killerRabbit.speak));//{}
console.log(Object.getPrototypeOf(protoRabbit));//[Object: null prototype] {}

//Classes pg 101

function makeRabbit(type) {
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit;
}

function Rabbit(type) {
    this.type = type;
}
Rabbit.prototype.speak = function(line) {
    console.log(`The ${this.type} rabbit says, "${line}"`);
};

let weirdRabbit = new Rabbit("weird");
console.log(Object.getPrototypeOf(Rabbit) == Object.prototype);//false
console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);//true
console.log(Object.getPrototypeOf(Rabbit));//{}
console.log(Object.getPrototypeOf({}));//[Object: null prototype] {}
console.log(Object.getPrototypeOf({}) == Function.prototype);//false
console.log(Object.getPrototypeOf(weirdRabbit));//{ speak: [Function (anonymous)] }
//Note: why does O.getPrototypeOf(Rabbit) return {} but it is a 
//Function prototype but why does O.getPrototypeOf({}) != Function.Prototype
//my assumption that getPrototypeOf outputing {} means that its an Object



//Class Notation pg 102
class Rabbit2 { 
    constructor(type) {
        this.type = type;
    }
    speak(line) {
        console.log(`The ${this.type} rabbit says, "${line}"`);
    }
}

let killerRabbit2 = new Rabbit("killer");
let blackRabbit = new Rabbit("black");

//at the time of writing of this book (2019) only methods can be
//instantiated or constructed in the class declaration...
//todo: check if class declaration allows for saving non-function
//value now

let object = new class { getWord() { return "Hello"; } };
console.log(object.getWord());//Hello
