// Union types you can be more flexible with the params
// LITERAL TYPES
// resultConversion: 'as-number' | 'as-text' LITERAL TYPES

// Type Aliases / Custom Types
type Combinable = number | string;

function combine(input1: Combinable, input2: number | string ) {

    let result;

    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2;
    } else {
        result = input1.toString() + input2.toString();
    }
    return result;
}

const combinedAges = combine(30, 26);
console.log(combinedAges);

const combinedNames = combine('Max', 'Anna');
console.log(combinedNames);