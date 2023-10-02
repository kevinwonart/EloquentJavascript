let log = console.log;
const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to );
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);
//log(roadGraph);
/*[Object: null prototype] {  
  "Alice's House": [ "Bob's House", 'Cabin', 'Post Office' ],
  "Bob's House": [ "Alice's House", 'Town Hall' ],
  Cabin: [ "Alice's House" ],
  'Post Office': [ "Alice's House", 'Marketplace' ],
  'Town Hall': [ "Bob's House", "Daria's House", 'Marketplace', 'Shop' ],
  "Daria's House": [ "Ernie's House", 'Town Hall' ],
  "Ernie's House": [ "Daria's House", "Grete's House" ],
  "Grete's House": [ "Ernie's House", 'Farm', 'Shop' ],
  Farm: [ "Grete's House", 'Marketplace' ],
  Shop: [ "Grete's House", 'Marketplace', 'Town Hall' ],
  Marketplace: [ 'Farm', 'Post Office', 'Shop', 'Town Hall' ]
}
*/
/*
 * --TESTING HOW OBJ-VALUE ASSIGNMENTWORKS --
 * to understand how buildgraph/addedge works
 *
let obj = Object.create(null);
let from = ["From"];
let to = "To";
log(obj);//[Object: null prototype] {}
if(obj[from]==null) obj[from] = [to];
log(obj);//[Object: null prototype] { From: [ 'To' ] }
log(obj[from] == null);//false
obj[from].push(to);
log(obj);//[Object: null prototype] { From: [ 'To', 'To'] }
*/

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return {place: destination, address: p.address};
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
}
let setState = new VillageState(
    "Post Office",
    [{ place: "Bob's House", address: 'Cabin' },
        { place: "Bob's House", address: 'Farm' },
        { place: "Ernie's House", address: "Grete's House" },
        { place: "Ernie's House", address: "Grete's House" },
        { place: "Grete's House", address: "Ernie's House" }
    ]);

let first = new VillageState(
    "Post Office",
    [{place: "Post Office", address: "Alice's House"}]
);
let next = first.move("Alice's House");
log(next.place);//Alice's House
log(next.parcels);//[]
log(first.place);//Post Office

let object = Object.freeze({value: 5});
object.value = 10;
log(object.value);//5

function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++){
        if (state.parcels.length == 0){
            log(`Done in ${turn} turns`);
            return turn;
        }
        let action = robot(state, memory);
        log(action);
        state = state.move(action.direction);
        memory = action.memory;
        log(`Moved to ${action.direction}`);
        ;
    }
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
};

//runRobot(VillageState.random(), randomRobot);//Moved to Marketplace...Done in 92 turns

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

//runRobot(VillageState.random(), routeRobot, []);//Moved to Alice's House...Done in 20 turns

function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        //log(graph[at]);
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}


//let setState = VillageState.random;
function compareRobot(robot1, robot2){
    let robot1Count = 0;
    let robot2Count = 0;
    let trials = 100;
    for (let i = 0; i < trials; i++) {
        let state = VillageState.random();
        robot1Count += runRobot(state, robot1, []);
        robot2Count += runRobot(state, robot2, []);
    }
    log(`${robot1.name} average turns per 5 random Parcels over 100 trials is ${robot1Count/100}`);
    log(`${robot2.name} average turns per 5 random Parcels over 100 trials is ${robot2Count/100}`);
}

//compareRobot(routeRobot, goalOrientedRobot);
//Moved to Alice's House...
//...
//routeRobot average turns per 5 random Parcels over 100 trials is 17.95
//goalOrientedRobot average turns per 5 random Parcels over 100 trials is 14.59
//compareRobot(randomRobot, goalOrientedRobot);
//Moved to Alice's House...
//...
//randomRobot average turns per 5 random Parcels over 100 trials is 66.76
//goalOrientedRobot average turns per 5 random Parcels over 100 trials is 15.13

function betterRobot({place, parcels}, route){
    if (route.length ==0){
        let moveToList = [...new Set(parcels
            .map((list) => list.place)
            .filter(value => !parcels.map((list) => list.address).includes(value)))];
        parcels.forEach(parcel => {
            if(parcel.place == place) {
                moveToList.splice(moveToList.indexOf(place),1);
                moveToList.push(parcel.address);
            }
        });
            
        log("Debug Place: " + place);
        log("Debug Parcels: " + parcels);
        log("Debug moveToList: "+ moveToList);
        if (moveToList.length === 0 && parcels.length > 0){
            moveToList = [...new Set(parcels
                .map((list) => list.place))];
            parcels.forEach(parcel => {
                moveToList.splice(moveToList.indexOf(place),1);
                moveToList.push(parcel.address);
            });
        }
        log("Debug moveToList after if: "+ moveToList);
        route = moveToList
            .map((route) => findRoute(roadGraph, place, route))
            .reduce((prev, next) => 
                prev.length > next.length ? next : prev);
        log("Debug Route: " + route);
    }
    log("route outside of if: " + route);
    return {direction: route[0], memory: route.slice(1)};
}

runRobot(setState, betterRobot, []);
runRobot(setState, routeRobot, []);
compareRobot(routeRobot, betterRobot);
/*
 testing things how Sets map and array filter works*
let arr = [{A: 1, B: 9},{A:2,B:8},{A:3, B: 7},{A:1,B:6}, {A:2,B:1}];
let newArr = [...new Set(arr.map((item) => item.A))];
let arr2 = [...new Set(arr.map((item) => item.B))];
let filterArr = [...new Set(arr
    .map((item) => item.A)
    .filter(value => !arr.map((item) => item.B).includes(value)))];

let filterArr2 = [...new Set(arr
    .map((item) => item.A)
    .filter(value => !arr2.includes(value)))];
let filterArr3 = newArr.filter(value => !arr2.includes(value));
log("newArr: "+ newArr);
log("arr2: " + arr2);
log("filterArr: " + filterArr);
log("arr: " + arr);
log("filterArr2: " + filterArr2);
log("filterArr3: " + filterArr3);
*/


