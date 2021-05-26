// Types
// Typescript only helps us during compilation, it adds an extra step
// JavaScript uses "dynamic types" resolved at run time, TS uses static types during development
function add(n1: number, n2: number, showResult: boolean, phrase: string) {
    const result = n1 + n2;
    if(showResult) {
        console.log(phrase + result);
    } else {
        return result;
    }
}

// If we initialize a variable without a value it's good practice to define it's type
// let number1: number;
const number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = 'Result is: ';

add(number1, number2, printResult, resultPhrase);
