import * as readline from 'readline';

// ��������� ��� ������ � ������ ������
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// �-�� ��������� ������ � ��������, ������� � � ������� � ������� ����� ������������.
const appQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};


// ������� ��� �����
let taskCounter: number = 0;

// ������ �����
let taskList: object[] = [];

// �-��, �������� ������
function addTask(title: string, description: string, isCompleted: boolean = false): void {
    let id = ++taskCounter;
    let task: object = {
        taskId: id,
        taskTitle: title,
        taskDescriptiopn: description,
        taskCompleted: isCompleted
    }
    taskList.push(task);
}

// �-��, ������� ������ �� �������
function removeTask(id: number): void {
    taskList.splice(id-1, 1);
}

// �-��, ������� ������
function readTask(el, ind, arr) {
    console.log(makeGreen, el);
}

// �-��, ������� ����������� ������
function readCompletedTask(el, ind, arr) {
    if (el["taskCompleted"] == true)
        console.log(makeGreen, el);
}

// �-��, ������� ������������� ������
function readPendingTask(el, ind, arr) {
    if (el["taskCompleted"] == false)
        console.log(makeGreen, el);
}

// �-��, ������� ������ ���� �����
function listTasks(): void {
    console.log(makeGreen, "All tasks:");
    // forEach ��������� ��-�� "������� ������" ��� callback
    taskList.forEach(readTask);
}

// �-��, ������� ������ ���� ����������� �����
function listCompletedTasks(): void {
    console.log(makeGreen, "Completed tasks:");
    taskList.forEach(readCompletedTask);
}

// �-��, ������� ������ ���� ������������� �����
function listPendingTasks(): void {
    console.log(makeGreen, "Pending tasks:");
    taskList.forEach(readPendingTask);
}

// �-��, �������� ������ ��� �����������, �� �������
function markTaskAsCompleted(id: number): void {
    for (let i in taskList) {
        if (taskList[i]["taskId"] == id) {
            taskList[i]["taskCompleted"] = true;
        }
    }
}

// ��� ��������� ����� ������ � �������
let makeYellow = '\x1b[33m%s\x1b[0m';
let makeRed = '\x1b[31m%s\x1b[0m';
let makeGreen = '\x1b[32m%s\x1b[0m';

// �-�� ��� ������ ����
function mainMenu(): void {

    console.log("1. Add task.");
    console.log("2. Remove task."); 7
    console.log("3. Mark task as completed.");
    console.log("4. Show all tasks.");
    console.log("5. Show completed tasks.");
    console.log("6. Show pending tasks.");
    console.log("0. Exit.");
}

const main = async () => {
    console.log("**************My Tasks App**************");

    mainMenu();
    //addTask("task1", "description1");
    //addTask("task2", "description2");
    //addTask("task3", "description3");
    //addTask("task4", "description4");

    // ���������� ��� ������ ������������
    let userChoice;
    do {
        userChoice = await appQuestion("Make your choice_ ");
        let userChoiceToNum : number = Number(userChoice);

        if (userChoiceToNum < 0 || userChoiceToNum > 6) {
            console.log(makeRed, "Wrong choice. Choose from 1 to 6.");
        }      
        else {
            switch (userChoiceToNum) {                
                case 1:
                    let taskTitle = await appQuestion("Enter task title_ ");
                    let taskDescription = await appQuestion("Enter task description_ ");
                    addTask(taskTitle, taskDescription);
                    mainMenu();
                    break;
                case 2:
                    let idForRemove: any = await appQuestion("Enter task id for remove_ ");
                    removeTask(idForRemove as number);
                    mainMenu();
                    break;
                case 3:
                    let markedTask: any = await appQuestion("Enter task id which is completed_ ");
                    markTaskAsCompleted(markedTask as number);
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
    }
    while (userChoice != 0);

    // ��������� ��������� ����� ���������� �����
    rl.close();
};

main();
