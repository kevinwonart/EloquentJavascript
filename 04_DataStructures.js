//Here I am beggining to follow the data structure chapter in Eloquent JS.
//Although I believe I am already familiar with them, I will overlearn them until it
//becomes second nature.

let journal = [];

function addEntry(events, squirrel) {
    journal.push({events, squirrel});
}

addEntry(["work", "touched tree", "pizza", "running", "television"], false);
addEntry(["work", "ice cream", "cauliflower", "lasagna", "toucehd tree", "brushed teeth"], false);
addEntry(["weekend", "cycling", "break", "peanuts", "beer"], true);
function phi(table) {
    return (table[3] * table[0] - table[2] *table[1])/
        Math.sqrt((table[2] + table[3]) *
                  (table[0] + table[1]) *
                  (table[1] + table[3]) *
                  (table[0] + table[2]));
}

function tableFor(event, journal) {
    let table = [0,0,0,0];
    for (let i = 0; i < journal.length; i++){
        let entry = journal[i], index = 0;
        if (entry.events.includes(event)) index +=1;
        if (entry.squirrel) index += 2;
        table[index] += 1;
    }
    return table;
}
console.log(tableFor("pizza", journal));
console.log(phi([76, 9, 4, 1]));

for(let entry of journal) {
    console.log('${entry.events.length} events.');
}

function journalEvents(journal) {
    let events = [];
    for (let entry of journal) {
        for (let event of entry.events) {
            if(!events.includes(event)){
                events.push(event);
            }
        }
    }
    return events;
}

console.log(journalEvents(journal));

for (let event of journalEvents(journal)){
    console.log(event + ":", phi(tableFor(event, journal)));
}
