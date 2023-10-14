
new Promise((_, reject) => reject(new Error("asdf")))
    .then(value => console.log("Handler 1"))
.catch(reason => {
    console.log("Caught failure " + reason);
    return "nothing";
})
.then(value => console.log("Handler 2", value));
