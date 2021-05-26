// Intersection types
type Admin = {
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}


// they're combines, elevated employee must have both types properties
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['Create-server'],
    startDate: new Date()
};

type Combinable = string | number;
type Numeric = number | boolean;

// In union the type is the one they HAVE IN COMMON
type Universal = Combinable & Numeric;

// Type Guards
// With type guards we ensure what exactly we do with the values using Intersection
// IT WILL SPECIFY THE FN WILL RETURN A NUMBER
// Basically we declare different combinations
//function add(a: number, b: number): number; FN OVERLOAD, WITH THESE TWO LINES
//function add(a: string, b: string): string;
//function add(a: number, b: string): string; 
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    } 
    return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
    if ('privileges' in emp) {
        console.log('Privileges ' + emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('startDate ' + emp.startDate);
    }
}

class Car {
    drive() {
        console.log('Driving...')
    }
}

class Truck {
    drive() {
        console.log('Driving a truck...')
    }

    loadCargo(amount: number) {
        console.log('Loading cargo....' + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}

useVehicle(v1);
useVehicle(v2);

// DISCRIMINATED UNIONS
// it's a pattern when working with union types and let's you use guard types

interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSped: number;
}

type Animal = Bird | Horse;

// With adding a type property, we can check using a switch for it's type;
// We having a common property that describes it's object
function moveAnimal(animal: Animal) {
    let speed;
    switch(animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSped;
    }

    console.log('Moving at speed: ' + speed);
}

// Type Casting
// v1
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
// This help ts understand the value will yield an html element and not null
const userInputElement = <HTMLInputElement>document.getElementById('user-input')! as HTMLInputElement;
userInputElement.value = 'Hi there';

// Index types

interface ErrorContainer { // { email: 'Not a valid email', username: 'Must start with a character' }
    // Must have properties that are string
    // we don't know the prop name in this point
    // id: string;
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email!',
    username: 'Must start with a capital character!'
};

// Optional chaining
const fetchedUserDate = {
    id: 'u1',
    name: 'Max',
    // job: { title: 'CEO', description: 'My own company' }
};

// the optional chaining ? if it's undefined, it will not continue, just like && with regular js
// console.log(fetchedUserDate?.job?.title);

// Nullish Coalescing
const userInput = null;
// the nullish coelescing works if is NOT UNDEFINED OR NULL, NOT FALSY LIKE ||
const storedData = userInputElement ?? 'DEFAULT';