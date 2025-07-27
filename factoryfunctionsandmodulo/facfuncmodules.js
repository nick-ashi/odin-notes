function makeAdder(firstNumber) {
    const first = firstNumber;
    return function resulting (secondNumber) {
        const second = secondNumber;
        return first + second;
    }
}



///////////

function base(number1) {

    if ((number1) >= 5) {
        return function inner(number) {
            return `${number} is greater than 5`
        }    
    }
    else {
        return function inner(number) {
            return `${number} is less than 5`
        } 
    }
}

const base1 = base(4)

console.log(base1(10))

console.log()