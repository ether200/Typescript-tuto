// // Generics
// // Other way to define array types
// const names: Array<string> = []; // = string[];

// // It can be used to other things such as promises for example
// // this way we tell ts what you do and what data it returns
// const promise: Promise<string> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('This is done!');
//     }, 2000);
// })

// With generic types we tell ts that the types can be different types, and this FN will return the INTERCEPTION
// AKA FUSION, that way we can access the values with no error and work optimally with it's resolve

// Constraints uses extends to force the generic types to be a certain type
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

const mergeObj = merge({ name: 'Max', hobbies: ['Hit em up']}, {age: 30});
console.log(mergeObj);

interface Lengthy {
    length: number;
}

// We returning a tuple, generic function
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got no value.';
    if (element.length === 0) {
        descriptionText = 'Got 1 element.'
    } else if (element.length > 1) {
        descriptionText = 'Got ' + element.length + ' elements';
    }
    return [element, descriptionText]
}

console.log(countAndDescribe('God damn'))


function extractAndConvert<T extends object, U extends keyof T> (obj: T, key: U) {
    return obj[key];
}

// extractAndConvert({ name: 'Max' }, 'name');

// Generic classes

class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data]
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');

// This way we have more flexibility and we can storage whatever we want
const numberStorage = new DataStorage<number | string>();

// Bonus
interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    // Partial built in in ts, makes all the properties initally OPTIONAL temporarily
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal as CourseGoal;
}

// Can not be modified
const names: Readonly<string[]> = ['Max', 'Anna'];

// Generic types are better than union when you want to lock CERTAIN TYPES
// they help you to create data structures that work together or wrap values of a broad variety of types
// Eg an array that can hold any type of data