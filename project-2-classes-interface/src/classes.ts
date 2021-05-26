abstract class Department {

    // Abstract classes can't be instantiated but has to be extended


    // private name: string;
    // the employees property is only accessible inside this class, not outside
    // that way we can only modify the array with methods created inside the class
    // private employees: string[] = [];
    // protected is just like private but they're also accessible on CHILDREN Classes
    protected employees: string[] = [];



    // readonly makes a property to only be initialized once and not be modified
    constructor(protected readonly id: string, public name: string) {
        this.name = name;
        this.id = id;
    }

    static createEmployee(name: string) {
        return { name };
    }

    // With Typescript we declare that with this we're referring to the instance
    // describe(this: Department) {
    //     console.log(`Department: (${this.id}): ${this.name}`)
    // }

    // if we want to declare a method and be shared among classes with their own implementation
    // we use abstract thru it's class name and method
    abstract describe(this: Department): void;

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    // IF we use Public we are already initializing, dont need to start it with this
    constructor(id: string, public admins: string[]) {
        super(id, 'IT');
    }

    describe() {
        console.log('IT Department id is: ' + this.id);
    }
}

class AccountingDepartment extends Department {

    private lastReport: string;
    private static instance: AccountingDepartment;

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.');
    }

    set mostRecentReport(value: string) {
        this.addReport(value);
    }

    // We can have private constructors aswell SINGLETON PATTERN
    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    static getInstace() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
    }

    describe() {
        console.log('Hey' + this.id);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }



    // we can overwrite methods
    addEmployee(name: string) {
        if (name === 'Max') {
            return;
        }
        this.employees.push(name);

    }
}

const employee1 = Department.createEmployee('Max');
console.log(employee1);

const it = new ITDepartment('d1', ['Max']);

it.addEmployee('Max');
it.addEmployee('Manu');


it.describe();
it.printEmployeeInformation();



// const accounting = new AccountingDepartment('d2', []);
const accounting = AccountingDepartment.getInstace();
accounting.mostRecentReport = 'Year End Report'
accounting.addReport('Something went wrong...');
accounting.printReports();
console.log(it);

// const accountingCopy = { name: 's', describe: accounting.describe };
// accountingCopy.describe();