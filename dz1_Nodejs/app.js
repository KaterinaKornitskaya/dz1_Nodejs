"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const appQuestion = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};
let taskCounter = 0;
let taskList = [];
function addTask(title, description, isCompleted = false) {
    let id = ++taskCounter;
    let task = {
        taskId: id,
        taskTitle: title,
        taskDescriptiopn: description,
        taskCompleted: isCompleted
    };
    taskList.push(task);
}
function removeTask(id) {
    taskList.splice(id - 1, 1);
}
function readTask(el, ind, arr) {
    console.log(makeGreen, el);
}
function readCompletedTask(el, ind, arr) {
    if (el["taskCompleted"] == true)
        console.log(makeGreen, el);
}
function readPendingTask(el, ind, arr) {
    if (el["taskCompleted"] == false)
        console.log(makeGreen, el);
}
function listTasks() {
    console.log(makeGreen, "All tasks");
    taskList.forEach(readTask);
}
function listCompletedTasks() {
    console.log(makeGreen, "Completed tasks");
    taskList.forEach(readCompletedTask);
}
function listPendingTasks() {
    console.log(makeGreen, "Pending tasks");
    taskList.forEach(readPendingTask);
}
function markTaskAsCompleted(id) {
    for (let i in taskList) {
        if (taskList[i]["taskId"] == id) {
            taskList[i]["taskCompleted"] = true;
        }
    }
}
let makeYellow = '\x1b[33m%s\x1b[0m';
let makeRed = '\x1b[31m%s\x1b[0m';
let makeGreen = '\x1b[32m%s\x1b[0m';
function mainMenu() {
    console.log("1. Add task.");
    console.log("2. Remove task.");
    7;
    console.log("3. Mark task as completed.");
    console.log("4. Show all tasks.");
    console.log("5. Show completed tasks.");
    console.log("6. Show pending tasks.");
    console.log("0. Exit.");
}
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("**************My Tasks App**************");
    mainMenu();
    addTask("task1", "description1");
    addTask("task2", "description2");
    addTask("task3", "description3");
    addTask("task4", "description4");
    let userChoice;
    do {
        userChoice = yield appQuestion("Make your choice_ ");
        let userChoiceToNum = Number(userChoice);
        if (userChoiceToNum < 0 || userChoiceToNum > 6) {
            console.log(makeRed, "Wrong choice. Choose from 1 to 6.");
        }
        else {
            switch (userChoiceToNum) {
                case 1:
                    let taskTitle = yield appQuestion("Enter task title_ ");
                    let taskDescription = yield appQuestion("Enter task description_ ");
                    addTask(taskTitle, taskDescription);
                    mainMenu();
                    break;
                case 2:
                    let idForRemove = yield appQuestion("Enter task id for remove_ ");
                    removeTask(idForRemove);
                    mainMenu();
                    break;
                case 3:
                    let markedTask = yield appQuestion("Enter task id which is completed_ ");
                    markTaskAsCompleted(markedTask);
                    mainMenu();
                    break;
                case 4:
                    listTasks();
                    mainMenu();
                    break;
                case 5:
                    listCompletedTasks();
                    mainMenu();
                    break;
                case 6:
                    listPendingTasks();
                    mainMenu();
                    break;
            }
        }
    } while (userChoice != 0);
    // ��������� ��������� ����� ���������� �����
    rl.close();
});
main();
//# sourceMappingURL=app.js.map