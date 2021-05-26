// 3 ways to define an object, we can use object as type, the more detailed and explicit with key: type;
// and last one, ts would define it by default
// const person: {
//     name: string;
//     age: number;
// } = {

// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     // Tuple, it's a fixed array
//     role: [number, string];

// } = {
//     name: 'Max',
//     age: 30,
//     hobbies: ['Sports', 'Cooking'],
//     role: [2, 'author']
// };

// enum helps us to define iden variables, by default it assign a number
// it would ADMIN 0, READ_ONLY 1, AUTHOR 2
enum Role { ADMIN = 'ADMIN', READ_ONLY = 100, AUTHOR = 'AUTHOR' };

const person = {
    name: 'Max',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN
}

// push still works for tuples
// person.role.push('admin');
// Would not work
// person = [];
// person.role = [2, 'author', 'user']


// Array of strings
let favoriteActivities: string[];
// Array of any kind
// let favoriteActivities : any[];
favoriteActivities = ['Sports'];

console.log(person.role);

// Since we have an array of strings, ts recognizes hobby as type string
// for (const hobby of person.hobbies) {
//    console.log(hobby.toUpperCase()):
//}

// any is the last type, basically it gives you the same exp with vanila js, avoid using it