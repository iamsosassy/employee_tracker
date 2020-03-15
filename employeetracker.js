var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "K?!?345bv",
    database: "employeemanager_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startquestions();


});
// add function in here for connection
function startquestions() {
    inquirer
        .prompt({
            type: "list",
            name: "startQ",
            message: "What would you like to do?",
            choices: [
                "view all employees",
                "view all roles",
                "view all departments",
                "add employee",
                "add department",
                "add role",
                "update employee role",
                "remove employee"
            ]
        })

    .then(function(answer) {
        console.log(answer);
        // start of switch statment for user choice
        switch (answer.startQ) {
            case "view all employees":
                viewallemployees();
                break;

            case "view all roles":
                viewallroles();
                break;

            case "view all departments":
                viewalldepartments();
                break;

            case "add employee":
                addEmployee();
                break;

            case "update employee role":
                updateEmpRole();
                break;

            case "add department":
                addDepartment();
                break;

            case "add role":
                addRole();
                break;
        }
    });
};

function addDepartment() {
    inquirer
        .prompt({
            type: "input",
            name: "addD",
            message: "What is the new department name?",

        })

    .then(function(answer) {
        console.log(answer)
        connection.query("INSERT INTO department(department_name) VALUES (?)", [answer.addD],
            function(error, result) {
                if (error) throw error;
                console.log("Hey, what department!", result);
                startquestions()
            }
        );
    });
}

function addRole() {
    connection.query("SELECT * from department",
        function(error, result) {
            if (error) throw error;
            console.log("All departments!", result);
            inquirer
                .prompt([{
                    type: "input",
                    name: "Title",
                    message: "What is your title of your role?",

                }, {
                    type: "input",
                    name: "Salary",
                    message: "What is the salary of the role?",


                }, {
                    type: "list",
                    name: "department_id",
                    message: "What is your department?",
                    choices: ["Sales", "Engineering", "Marketing"]
                }]).then(function(answer) {
                    console.log(answer)
                })
        });
}