const User = function (name) {
    this.name = name;
    this.discordName = "@" + name;
    this.sayHello = function() {
        console.log("Hello, " + this.name);
    }
}

function createUser(name) {
    const discordName = "@" + name;
    return {
        name: name,
        discordName: discordName,
        sayHello: function() {
            console.log("Hello, " + this.name);
        }
    };
}

// object to call
const calculator = (function () {
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;
    
    return {add, sub, mul, div}
})();

// use of object's function
console.log(calculator.mul(5, 10))