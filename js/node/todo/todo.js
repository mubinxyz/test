const readline = require('readline');

let tasks = [];
let tasksStatus = 0;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function createTask() {
    rl.question("Enter a new task: ", function (task) {
        tasks.push(task);
        tasksStatus += 1;
        console.log(`Task "${task}" created.`);
        mainMenu();
    });
}

function readTasks() {
    if (tasksStatus === 0) {
        console.log("\n--- List is Empty !");
    } else {
        console.log("\nTasks:");
        tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task}`);
        });
    }
    mainMenu();
}

function editTask() {
    if (tasksStatus !== 0) {
        rl.question("Enter the index of the task to edit: ", function (index) {
            index = parseInt(index) - 1;
            if (index >= 0 && index < tasks.length) {
                rl.question("Enter the new task: ", function (newTask) {
                    tasks[index] = newTask;
                    console.log(`Task "${newTask}" updated.`);
                    mainMenu();
                });
            } else {
                console.log("Invalid task index.");
                mainMenu();
            }
        });
    } else {
        console.log("\n--- There aren't any tasks to edit!");
        mainMenu();
    }
}

function deleteTask() {
    if (tasksStatus !== 0) {
        rl.question("Enter the index of the task to delete: ", function (index) {
            index = parseInt(index) - 1;
            if (index >= 0 && index < tasks.length) {
                const deletedTask = tasks.splice(index, 1)[0];
                tasksStatus -= 1;
                console.log(`Task "${deletedTask}" deleted.`);
                mainMenu();
            } else {
                console.log("Invalid task index.");
                mainMenu();
            }
        });
    } else {
        console.log("\n--- There aren't any tasks to delete!");
        mainMenu();
    }
}

function login(callback) {
    rl.question('Please enter your username: ', function (username) {
        rl.question('Please enter your password: ', function (password) {
            if (username === 'admin' && password === '123') {
                console.log('Login successful!');
                callback();
            } else {
                console.log('Username or password is incorrect. Try again.');
                login(callback);
            }
        });
    });
}

function mainMenu() {
    console.log("\n--- Todo-list Program ---");
    console.log("1. Create");
    console.log("2. Read");
    console.log("3. Edit");
    console.log("4. Delete");
    console.log("5. Exit");

    rl.question("Select an action: ", function (action) {
        switch (action) {
            case "1":
                createTask();
                break;
            case "2":
                readTasks();
                break;
            case "3":
                editTask();
                break;
            case "4":
                deleteTask();
                break;
            case "5":
                rl.close();
                break;
            default:
                console.log("Invalid action. Please try again.");
                mainMenu();
                break;
        }
    });
}

rl.on('close', function () {
    console.log("Exiting the program.");
    process.exit(0);
});

// Let's start the program with a login.
login(mainMenu);