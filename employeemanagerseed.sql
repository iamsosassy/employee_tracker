DROP DATABASE IF EXISTS employeemanager_DB;
CREATE DATABASE employeemanager_DB;

USE employeemanager_DB;

CREATE TABLE department
(
    id INT NOT NULL
    AUTO_INCREMENT,
    department_name VARCHAR
    (30) NOT NULL,
    PRIMARY KEY
    (id)
);

    CREATE TABLE role
    (
        id INT NOT NULL
        AUTO_INCREMENT,
    title VARCHAR
        (30) NOT NULL,
    salary DECIMAL, 
    department_id INT, 
    PRIMARY KEY
        (id)
);

        CREATE TABLE employee
        (
            id INT NOT NULL
            AUTO_INCREMENT,
    first_name VARCHAR
            (30) NOT NULL,
    last_name VARCHAR
            (30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY
            (id)
);

            
            
            