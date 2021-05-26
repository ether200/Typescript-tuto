// type AddFn = (a: number, b: number) => number;
// Interface as Function Types
// Interface can be extended by more than 1 interface
// An interface describes the structure of an object

// Interfaces are purely a TS feature, it helps you to write clear/explicit code
interface AddFn {
    (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
    return n1 + n2;
};

interface Named {
    // Interface only let us use readonly, not public/private
    readonly name?: string;
    // Optional = ?
    outputName?: string;
}


interface Greetable extends Named {
    greet(phrase: string): void;
}




// implements let's use different kind of interfaces, unlike classes, 
// they're often used to share funcionality among classes regarding their structure
class Person implements Greetable {
    // optional can be used on classes aswell
    name?: string;
    age =  30;

    // Even ? as parameter
    constructor(n: string) {
        if (n) {
            this.name = n;
        }
    }

    greet(phrase: string) {
        if (this.name) {
            console.log(phrase + ' ' + this.name);
        } else {
            console.log('Hi')
        }
        
    }
}

let user1: Greetable;

user1 = new Person('Ivan');

user1.greet('Hi there - I am');
console.log(user1);