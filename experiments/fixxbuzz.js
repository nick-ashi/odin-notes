function fizzbuzz(num) {
    let kvpairs = {
        5: "Buzz",
        3: "Fizz",
        7: "Bazz"
    }

    for (let i = 0; i < num; i++) {
        let output = Object.entries(kvpairs).map(([divisor, text]) => (i % divisor === 0 ? text : "")).join("");
        if (output === "") {
            console.log(i);
        } else {
            console.log(output);
        }   
    }
}

fizzbuzz(30)