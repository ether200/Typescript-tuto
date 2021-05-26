function add(n1: number, n2: number): number { // It defines by default {
    return n1 + n2;
}

// Void means the fn does not return anything, in js would be undefined
function printResult(num: number) {
    console.log('Result: ' + num);
}

// Void does not forces you to make the callback to return anything
function addAndHandler(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2;
    cb(result);
}

// combineValues should accept ANY fn THAT TAKES 2 PARAMS AND RETURNS A NUMBER
let combineValues: (a: number, b: number) => number;
combineValues = add;

addAndHandler(10, 20, (result) => {
    console.log(result);
});