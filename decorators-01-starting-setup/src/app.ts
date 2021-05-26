// Decorators is a function you apply to a class for example in a certain way
// Decorators are applied when your CLASS ARE BEING DEFINED, not INITIALIZE
// Basically they're used to do some meta programming, behind the scenes, adding extra fntility etc
// function Logger(constructor: Function) {
//     console.log('Logging...');
//     console.log(constructor);
// }

// Decorator factories
function Logger(logString: string) {
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    // with _ we tell ts we will not use the argument
    return function<T extends {new(...args: any[]) : {name: string}}>(originalConstructor: T) {
        // We keep the same prop, methods of the original originalConstructor aka Person
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log('Rendering template');
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    };
} 


// @Logger('Logging - Person')
// Los decorators se ejecutan de abajo hacia arriba, se crean top to bottom, regular js
@Logger('Login-Person')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name = 'Max';

    constructor() {
        console.log('Creating person object...');
    }
}

const person = new Person();
console.log(person)

// --- more places we can add decorators

// Target is either the instance or the constructor fn
function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator!');
    console.log(target, propertyName);    
}

// Accessor (getter, setter)
// We can return things that modify the descriptor in the method and accessor decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor ) {
    console.log('Accessor decorator!');
    console.log(target)
    console.log(name)
    console.log(descriptor)
}

// Method decorator
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method decorator!');
    console.log(target)
    console.log(name)
    console.log(descriptor)
}

// Parameter decorator
function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter decorator!');
    console.log(target)
    console.log(name)
    console.log(position)
}

class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price - should be positive!');
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            // The this will refer to the original method
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}

class Printer {
    message = 'This works!';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

interface ValidatorConfig {
    [property: string]: {
        [validateProp: string]: string [] // ['required', 'positive']
    }
}

const registeredValidators: ValidatorConfig = {};
function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        [propName]: ['required']
    };
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        [propName]: ['positive']
    };
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch(validator) {
                case 'required':
                    return !!obj[prop];
                case 'positive':
                    return obj[prop] > 0;
            }
        }
    }
}

const p = new Printer();

const button = document.querySelector('button');
button?.addEventListener('click', p.showMessage);

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value

    const createdCourse = new Course(title, price);
    console.log(createdCourse);
});