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
// allow to add for department, role and employee
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
            var departmentsarray = []
            for (var i = 0; i < result.length; i++) {
                departmentsarray.push(result[i].department_name)
            }
            inquirer
                .prompt([{
                    type: "input",
                    name: "Title",
                    message: "What is the title of the role?",

                }, {
                    type: "input",
                    name: "Salary",
                    message: "What is the annual salary?",

                }, {
                    type: "list",
                    name: "department_id",
                    message: "What is your department?",
                    choices: departmentsarray
                }]).then(function(answer) {
                    console.log(answer);
                    var departmentID
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].department_name === answer.department_id) {
                            departmentID = result[i].id
                        }
                    }
                    var numSalary = parseFloat(answer.Salary)
                    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?) ", [
                        answer.Title,
                        numSalary,
                        departmentID

                    ], function(err, newrole) {
                        console.log(err, newrole);
                    })
                    startquestions()
                })
        });
}

function addEmployee() {
    connection.query("SELECT * from employee", function(error, results) {
        if (error) throw error;
        console.log("I got it to work!", result);
        inquirer
            .prompt([{
                type: "input",
                name: "firstname",
                message: "What is employee's first name?",

            }, {

                type: "input",
                name: "lastname",
                message: "What is employee's last name?",
            }]).then(function(answer) {
                connection.query("INSERT INTO employee VALUES (?)", {
                    first_name: answer.firstname,
                    last_name: answer.lastname,
                    role_id: INT,
                    manager_id: INT,

                    function(error, answer) {
                        if (error) {
                            throw error;

                        }
                        console.log("Please work", result);

                        startquestions()
                    }

                });
            })

    })
}
// allows user to view all departments currently in the database
function viewalldepartments() {
    connection.query("SELECT * FROM department", function(error, answer) {
        console.log("\n Departments Retrieved from Database \n");
        console.table(answer);
    });
    startquestions();
};

// allows user to view all employee roles currently in the database
function viewallroles() {
    connection.query("SELECT * FROM role", function(error, answer) {
        console.log("\n Roles Retrieved from Database \n");
        console.table(answer);

    });
    startquestions();
};

// allows user to view all employees currently in the database
function viewallemployees() {
    console.log("retrieving employees from database");
    connection.query(lookup, function(error, answer) {
        console.log("\n Employees retrieved from Database \n");
        console.table(answer);
    });
    startquestions();
}