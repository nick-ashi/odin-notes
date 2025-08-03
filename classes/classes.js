/*
BASIC CLASS SYNTAX
*/
// class MyClass {
//   // class methods
//   constructor() { ... }
//   method1() { ... }
//   method2() { ... }
//   method3() { ... }
//   ...
// }

// my example

class Game {
    constructor(title, year, genre, platform, developer) {
        this.title = title;
        this.year = year;
        this.genre = genre;
        this.platform = platform;
        this.developer = developer;
    }

    get() {
        return {
            title: this.title,
            year: this.year,
            genre: this.genre,
            platform: this.platform,
            developer: this.developer
        };
    }

    setTitle(title) {
        this.title = title;
    }

    setYear(year) {
        this.year = year;
    }

    setGenre(genre) {
        this.genre = genre;
    }

    setPlatform(platform) {
        this.platform = platform;
    }

    setDeveloper(developer) {
        this.developer = developer;
    }

}

let game = new Game("Outer Wilds", 2019, "Adventure", "PC", "Mobius Digital");
console.log(game.get()); // { title: 'Outer Wilds', year: 2019, genre: 'Adventure', platform: 'PC', developer: 'Mobius Digital' }
game.setPlatform(game.platform + ", PS4");
console.log(game.get()); // { title: 'Outer Wilds', year: 2019, genre: 'Adventure', platform: 'PC and PS4', developer: 'Mobius Digital' }


// class Game {
//     // private fields use a #
//     #title;
//     #year;
//     #genre;
//     #platform;
//     #developer;

//     constructor(title, year, genre, platform, developer) {
//         this.#title = title;
//         this.#year = year;
//         this.#genre = genre;
//         this.#platform = platform;
//         this.#developer = developer;
//     }

//     get info() {
//         return `${this.#title} (${this.#year}) - ${this.#genre} on ${this.#platform} by ${this.#developer}`;
//     }

//     set info(newInfo) {
//         const parts = newInfo.split(" - ");
//         this.#title = parts[0];
//         this.#year = parseInt(parts[1].match(/\d+/)[0]);
//         this.#genre = parts[2];
//         this.#platform = parts[3];
//         this.#developer = parts[4];
//     }
// }

// const game = new Game("Outer Wilds", 2019, "Adventure", "PC", "Mobius Digital");
// console.log(game.info); // Works
// console.log(game.title); // undefined - private field not accessible

let user = {
    name: "Nick",
    surname: "Ashi"
};

Object.defineProperty(user, "fullName", {
    
    get() {
        return `${this.name} ${this.surname}`;
    },

    set(value) {
        [this.name, this.surname] = value.split(" ");
    }
});

console.log(user.fullName);

for(let key in user) {
    console.log(key + ": " + user[key]); // name: Nick, surname: Ashi
}

