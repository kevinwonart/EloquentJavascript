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

let killerRabbit2 = new Rabbit2("killer");
let blackRabbit = new Rabbit2("black");

//at the time of writing of this book (2019) only methods can be
//instantiated or constructed in the class declaration...
//todo: check if class declaration allows for saving non-function
//value now

let object = new class { getWord() { return "Hello"; } };
console.log(object.getWord());//Hello

//Overriding Derived Properties pg 103
Rabbit2.prototype.teeth = "small"
console.log(killerRabbit2.teeth);//small
killerRabbit2.teeth = "long,sharp, and bloody";
console.log(killerRabbit2.teeth);//long, sharp and bloody
console.log(blackRabbit.teeth);//small
console.log(Rabbit2.prototype.teeth);//small

console.log(Array.prototype.toString == Object.prototype.toString);//false
console.log([1, 2].toString());//1,2
console.log(Object.prototype.toString.call([1, 2]));//[object Array]

//Maps page 104
let ages = {
    Boris: 39,
    Liang: 22,
    Julia: 62
};

console.log(`Julia is ${ages["Julia"]}`);//Julia is 62
console.log("Is Jack's age known?", "Jack" in ages);//Is Jack's age known?" false
console.log("Is toString's age known?", "toString" in ages);//Is toString's age known? true

console.log("toString" in Object.create(null));//false
console.log(ages in Object.create(null));//false
Object.create(null);
console.log("toString" in Object.create(null));//false note: i don't understand Object.create(null) to pass an Object not derived from Object.prototype

let agesMap = new Map();
agesMap.set("Boris", 39);
agesMap.set("Liang", 22);
agesMap.set("Julia", 62);

console.log(`Julia is ${agesMap.get("Julia")}`);//Julia is 62
console.log("Is Jack's age known?", agesMap.has("Jack"));//Is Jack's age known?" false
console.log(agesMap.has("toString"));//false

console.log({x: 1}.hasOwnProperty("x"));//true
console.log({x: 1}.hasOwnProperty("toString"));//false

//Polymorphism pg 105
Rabbit2.prototype.toString = function() {
    return `a ${this.type} rabbit`;
};
console.log(String(blackRabbit));

//Symbols pg 106
let sym = Symbol("name");
console.log(sym == Symbol("name"));//false
Rabbit2.prototype[sym] = 55;
console.log(blackRabbit[sym]);//55

let sym2 = Symbol("name");
Rabbit2.prototype[sym2] = 56;
console.log(blackRabbit[sym2]);//56

const toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function() {
    return `${this.length} cm of blue yarn`;
};

console.log([1, 2].toString());//1,2
console.log([1, 2][toStringSymbol]());//2 cm of blue yarn
//symbols allows me to redefine a toString method that doesn't
//override the prototype method
//whynot just make a new function with a different name without
//having to go through the hassle of making a Symbol?

let stringObject = {
    [toStringSymbol]() {return "a jute rope"; }
};
console.log(stringObject[toStringSymbol]());// a jute rope

//The Iterator Interface pg 107
let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());//{ value: 'O', done: false }
console.log(okIterator.next());//{ value: 'K', done: false }
console.log(okIterator.next());//{ value: undefined, done: false }

class Matrix {
    constructor(width, height, element = (x, y) => undefined) {
        this.width = width;
        this.height = height;
        this.content = [];

        for (let y = 0; y < height; y++){
            for (let x = 0; x < width; x++) {
                this.content[y * width + x] = element(x, y);
            }
        }
    }

    get(x, y) {
        return this.content[y * this.width + x];
    }
    set(x, y, value) {
        this.content[y * this.width + x] = value;
    }
}

class MatrixIterator {
    constructor(matrix) {
        this.x = 0;
        this.y = 0;
        this.matrix = matrix;
    }

    next() {
        if (this.y == this.matrix.height) return {done: true};

        let value = {x: this.x,
            y: this.y,
            value: this.matrix.get(this.x, this.y)};
        this.x++;

        if (this.x == this.matrix.width) {
            this.x = 0;
            this.y++;
        }
        return {value, done: false};
    }
}

Matrix.prototype[Symbol.iterator] = function() {
    return new MatrixIterator(this);
};

let matrix = new Matrix(2, 2, (x, y) => `value ${x},${y}`);
for (let {x, y, value} of matrix) {
    console.log(x, y, value);
}
//0 0 value 0,0
//1 0 value 1,0
//0 1 value 0,1
//1 1 value 1,1

//Getters, Setters, and Statics pg 109
let varyingSize = {
    get size() {
        return Math.floor(Math.random() * 100);
    }
};

console.log(varyingSize.size);//21
console.log(varyingSize.size);//17

class Temperature {
    constructor(celsius) {
        this.celsius = celsius;
    }
    get fahrenheit() {
        return this.celsius * 1.8 +32;
    }
    set fahrenheit(value) {
        this.celsius = (value - 32) / 1.8;
    }

    static fromFahrenheit(value) {
        return new Temperature((value - 32) / 1.8);
    }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit);//71.6
temp.fahrenheit = 86;
console.log(temp.celsius);//30

//Inheritance pg 111
class SymmetricMatrix extends Matrix {
    constructor(size, element = (x, y) => undefined) {
        super(size, size, (x, y) => {
            if (x < y) return element(y, x);
            else return element(x, y);
        });
    }

    set(x, y, value) {
        super.set(x, y, value);
        if (x != y) {
            super.set(y, x, value);
        }
    }
}

let matrix2 = new SymmetricMatrix(5, (x, y) => `${x},${y}`);
console.log(matrix2.get(2,3));

//The instanceof Ooperator pg 112
console.log(
    new SymmetricMatrix(2) instanceof SymmetricMatrix);//true
console.log(new SymmetricMatrix(2) instanceof Matrix);//true
console.log(new Matrix(2, 2) instanceof SymmetricMatrix);//false
console.log([1] instanceof Array);//true

//Exercises
//A Vector Type pg 113
class Vec {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    minus(newVector) {
        this.x = this.x - newVector.x;
        this.y = this.y - newVector.y;
        return this;
    }
    plus(newVector) {
        this.x = this.x + newVector.x;
        this.y = this.y + newVector.y;
        return this;
    }
    length(){
        return Math.hypot(this.x, this.y);
    }
}

console.log(new Vec(1,2).plus(new Vec(2, 3)));//Vec { x: 3, y: 5 }
console.log(new Vec(1,2).minus(new Vec(2, 3)));//Vec { x: -1, y: -1 }
console.log(new Vec(3,4).length());//5

/*Author's solution
 * 
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }

  minus(other) {
    return new Vec(this.x - other.x, this.y - other.y);
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}
*/

//Groups pg 113
class Group{
    constructor(){
        this.group = [];
    }
    add(element){
        if(this.group.indexOf(element) < 0){
            this.group.push(element);
        }
    }
    delete(element){
        if(this.group.indexOf(element) >= 0){
           this.group.splice(this.group.indexOf(element), 1); 
        }
    }
    has(element){
        if(this.group.indexOf(element) >= 0)
            return true;
        return false;
    }
    static from(element){
        let group = new Group;
        for(let elem of element)
            group.add(elem);
        return group;
    }
}
/*
 *Author's solution

class Group {
  constructor() {
    this.members = [];
  }

  add(value) {
    if (!this.has(value)) {
      this.members.push(value);
    }
  }

  delete(value) {
    this.members = this.members.filter(v => v !== value);
  }

  has(value) {
    return this.members.includes(value);
  }

  static from(collection) {
    let group = new Group;
    for (let value of collection) {
      group.add(value);
    }
    return group;
  }
}
*/

let group = Group.from([10, 20]);
console.log(group.has(10));//true
console.log(group.has(30));//false
group.add(10);
group.delete(10);
console.log(group.has(10));//false
console.log(group);//group { group: [ 20 ] }
group.add(10);
group.add(10);
group.add(10);
group.add(10);
console.log(group);//group { group: [ 20, 10 ] }

//Iterable Groups pg 114

