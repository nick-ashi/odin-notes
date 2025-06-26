const person = {
    name: "John",
    age: 30,
    greet: function() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    },
    "farewell": function() {
        console.log(`Goodbye from ${this.name}.`);
    }
}

person.greet();

// OBJECT CONSTRUCTORS
function Player(name, marker) {
    // safe guard against using constructor as a regular function
    if (!new.target) {
        throw Error("Please use the 'new' keyword to create an instance of Player.");
    }
    this.name = name;
    this.marker = marker;
    this.sayName = function() {
        console.log(this.name);
    };
}

const player1 = new Player("Alice", "X");
console.log(player1.name)

const player2 = new Player("Bob", "O");

player1.sayName(); // Outputs: Alice
player2.sayName(); // Outputs: Bob

// Exercise
function Book(title, author, numPages, read) {
    if (!new.target) {
        throw Error("Please use the 'new' keyword to create an instance of Book.");
    }
    if (typeof read !== "boolean") {
        throw Error("The 'read' parameter must be a boolean.");
    }
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = Boolean(read); // Ensure read is a boolean
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.read ? "Read Status: Read" : "Read Status: Not Read"}`;
    }
}

const CatcherInTheRye = new Book("The Catcher in the Rye", "J.D. Salinger", 277, false);
console.log(CatcherInTheRye.info()); // Outputs: The Catcher in the Rye

Object.getPrototypeOf(CatcherInTheRye).constructor === Book.prototype; 