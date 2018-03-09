
const { Database } = require('sqlite3').verbose();

const db = new Database('familyBiz.sqlite', () => {
    console.log('Connected to Family Business database');
})

db.run('CREATE TABLE IF NOT EXISTS employees (id INT, firstName TEXT, lastName TEXT, jobTitle TEXT, address TEXT)');

let empArr = [
    {
        id: 0,
        firstName: 'Rachel',
        lastName: 'Green',
        jobTitle: 'Salesperson',
        address: '100 Aniston Ln'
    },
    {
        id: 1,
        firstName: 'Ross',
        lastName: 'Geller',
        jobTitle: 'Accountant',
        address: '200 Schwimmer Ln'
    },
    {
        id: 2,
        firstName: 'Monica',
        lastName: 'Geller',
        jobTitle: 'Cashier',
        address: '300 Cox Ln'
    },
    {
        id: 3,
        firstName: 'Phoebe',
        lastName: 'Buffay',
        jobTitle: 'Entertainment',
        address: '400 Kudrow Ln'
    },
    {
        id: 4,
        firstName: 'Joey',
        lastName: 'Tribbiani',
        jobTitle: 'Greeter',
        address: '500 LeBlanc Ln'
    },
    {
        id: 5,
        firstName: 'Chandler',
        lastName: 'Bing',
        jobTitle: 'Lawyer',
        address: '600 Perry Ln'
    },
]

// error handler
const errorHandler = (err) => {
    if (err) {
        console.log(`Error Message: ${err}`);
    };
};


// Insert each of the employees into the DB
empArr.forEach(obj => {
    db.run(`INSERT INTO employees VALUES(${obj.id}, "${obj.firstName}", "${obj.lastName}", "${obj.jobTitle}", "${obj.address}")`);
})

// Write a statement to query the database and console.log() all employee records
db.all(`SELECT * FROM employees`, (err, allData) => {
    errorHandler(err);
    console.log('all employee data: ', allData);
});

// Write a statement to query the database and console.log() each employees jobTitle
db.get(`SELECT jobTitle FROM employees`, (err, jobs) => {
    errorHandler(err);
    console.log('employee job titles: ', jobs);
});

// Write a statement to query the database and console.log() each employees firstName, lastName and address only
db.get(`SELECT firstName, lastName, address FROM employees`, (err, empData) => {
    errorHandler(err);
    console.log('employee data minus job title: ', empData);
});

// BONUS

// Write a statement that returns all employees of a specified jobTitle
db.get(`SELECT firstName, lastName, jobTitle FROM employees WHERE jobTitle = "Cashier"`, (err, specificJobs) => {
    errorHandler(err);
    console.log('employees with cashier job: ', specificJobs);
});