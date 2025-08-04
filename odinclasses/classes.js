// a class is just a kind of function in JS

// global var --> I can use it inside of closures
let memories = () => {
    return 20;
};

class User {

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHi() {
    console.log(`Hi, I'm ${this.name}. I'm ${this.age} years old. There are ${memories()} memories left in-tact`);
  }

}

// Usage:
let user = new User("Nick", 24);
user.sayHi();