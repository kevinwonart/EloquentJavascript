//Chapter 4
function range(start, finish, step){
    let num = 0;
    let arr = [];
    if(step < 0 && start > finish){
        for(let i = start; i >= finish; i+=step){
            arr.push(i);
            num += i;
        }

    } else {
        for(let i = start; i <= finish; i+=step){
            arr.push(i);
            num += i;
        }
    }
    
    return arr + "\nRange sum: " + num;
}

console.log(range(1,10,1o);
console.log(range(10,1,-1));
console.log(range(5 , 2, -1));
console.log(range(22, 3, -5));
console.log(range(1, 10, 2));




function reverseArray(arr){
    let newArr = [];
    for(let i = 0; i < arr.length; i++){
        i--;
        newArr.push(arr.pop());
    }
    return newArr;
}

function reverseArrayInPlace(arr){
    var n = arr.length,
        middle = Math.floor(n/2),
        temp = null;
    for(let i = 0; i < middle; i++) {
        temp = arr[i];
        arr[i] = arr[n-1-i];
        arr[n-1-i]=temp;
    }
    return arr;
}
arr = [1,2,3,4];

console.log(arr);
console.log(reverseArray(arr));
console.log(reverseArrayInPlace(arr));
console.log(arr);



let list = {
    value: 1,
    rest: {
        value: 2,
        rest: {
            value: 3,
            rest: null
        }
    }
};


function arrayToList(arr){
    let list = null;
    for(let i = arr.length - 1; i >= 0; i--){
        list = { value: arr[i], rest: list };
    }
    return list;
}

var arr = [1,2,3,4];
console.log(arrayToList(arr));
console.log(list);
console.log(list.rest);
console.log(list.value);

var arr = [1,2,3,4];
console.log(arrayToList(arr));
console.log(list);
console.log(list.rest);
console.log(list.value);

let mylist = {
    value:1,
    link: {
        value: 2,
        link: {
            value:3,
            link: null
        }
    }
};

console.log(mylist);
console.log("hello");
console.log(mylist);
console.log("hello");

function listToArray(list){
    var arr = [];
    for(let node = list; node; node = node.link){
        arr.push(node.value);
   }
    return arr;
}

console.log(listToArray(mylist));

function prepend(elem, list){
    var newList = { value: elem, link: list };
    return newList;
}

console.log(prepend(0,mylist));

function nth(list, num){
    if(!list)
        return undefined;
    else if (num === 0)
        return list.value;
    else
        return nth(list.link, num-1);
    
}
console.log(mylist);
console.log(nth(mylist, 2));

function deepEqual(a,b){
    if(a === b)
        return true;
    if(typeof a != "object" || a == null ||
        typeof b != "object" || b == null)
        return false;
    var propsInA = 0, propsInB = 0;
    for(var prop in a){
        propsInA++;
    }
    for(var prop in b){
        propsInB++;
        if(!(prop in a) || !deepEqual(a[prop],b[prop]))
            return false;
    }

    return propsInA == propsInB;
}

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj,{here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
console.log(deepEqual(1,1));
console.log(deepEqual(1,"1"));

