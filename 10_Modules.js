//Chapter 10 - Modules

var log = console.log;
//Improvised Modules pg 169
//Old way of Modules

const weekDay = function(){
    const names = ["Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday", "Friday", "Saturday"]
    return {
        name(number) { return names [number]; },
        number(name) { return names.indexOf(name); }
    };
}();

log(weekDay.name(weekDay.number("Sunday")));

//Evaluating Data as Code pg 170
const x = 1;
function evalAndReturnX(code) {
    eval(code);
    return x;
}
log(evalAndReturnX("var x = 2"));//2
log(x);//1

let plusOne = Function("n", "return n + 1;");
log(plusOne(4));//5

//CommonJS pg 171 
/*
 * ---Can't get this to run in my environment---
 *
const ordinal = require("ordinal");
const {days, months} = require("date-names");

exports.formatDate = function(date, format) {
    return format.replace(/YYYY|M(MMM)?}Do?|dddd/g, tag => {
        if (tag == "YYYY") return date.getFullYear();
        if (tag == "M") return date.getMonth();
        if (tag == "MMMM") return months[date.getMonth()];
        if (tag == "D") return date.getDate();
        if (tag == "Do") return ordinal(date.getDate());
        if (tag == "dddd") return days[date.getDay()];
    });
};

const {formatDate} = require("./node_modules/format-date");
log(formatDate(new Date(2019, 8, 13),
   "dddd the Do"));

require.cache = Object.create(null);
/*
function require(name) {
    if (!(name in require.cache)) {
        let code = readFile(name);
        let module = {exports: {}};
        require.cache[name] = module;
        let wrapper = Function("require, exports, module", code);
        wrapper(require, module.exports, module);
        }
    return require.cache[name].exports;
}
*/

const {parse} = require("ini");
log(parse("x = 10\ny = 20"));

//ECMAScript Modules
/*
 * ---Can't get this to run again---
 *  --moving on for now...
import ordinal from "ordinal";
import {days, months} from "date-names";

export function formatDate(date,format) { /*.../ };

export default ["Winter", "Spring", "Summer", "Autumn"];
import {days as dayNames} from "date-names";
log(dayNames.length);
*/

//Exercises
//A Modular Robot pg 177
//Bindings: roads, buildGraph, roadGraph, VillageState
//    runRobot, randomPick, randomRobot, mailRoute, 
//    routeRobot, findRoute, goalOrientedRobot
//What modules would I create if rewritten? I'm really not sure
//if i'd like to seperate them. the program isn't that large
//but if someone wanted to make a little video game or something
//out of it perhaps seperating the map so new maps/graphs can be made
//
//Roads Module pg 177
//go to 10_RoadModule.js
