var todoTasks =[];
window.onload = () => {
    renderTask();
}
class Todo {
    constructor (_task) {
        this.task = _task;
        this.isDone = false;
    }
};
class Done extends Todo {
    constructor (_task) {
        super(_task);
        this.isDone = true;
    }
}
/**
 *Thêm mới việc cần làm
 */
function saveList() {
    localStorage.setItem("toDo-list",JSON.stringify(todoTasks));
}
let handleAddTask = () => {
    let taskInfo = document.getElementById('newTask').value;
    if(!taskInfo) {return}
    let task = new Todo (taskInfo);
    todoTasks.push(task)
    saveList();
    renderTask();
    document.getElementById('newTask').value = "";
}
document.querySelector('#addItem').onclick = handleAddTask;
// Tải dữ liệu từ local lên và dợt nó thành html, gắn vào mảng ds công việc
function renderTask() {
    let completed = "";
    let uncompleted = "";
    let getData = JSON.parse(localStorage.getItem("toDo-list"));
    if(!getData) return
    todoTasks = [...getData];
    // for(let value of todoTasks) {
    for(let i = 0; i<todoTasks.length; i++) {
        if(todoTasks[i].isDone) {
            completed += `
            <li>
                <p>${todoTasks[i].task}</p>
                <div class="buttons">
                    <button onclick="handleDelete('${i}')" class="remove"><i class="fas fa-trash-alt"></i></button>
                    <button class="completed"><i class="far fa-check-circle"></i></button>
                </div>
            </li>`
        } else {
            uncompleted += `
            <li>
                <p>${todoTasks[i].task}</p>
                <div class="buttons">
                    <button onclick="handleDelete('${i}')" class="remove"><i class="fas fa-trash-alt"></i></button>
                    <button onclick= "handleTaskDone(event)" class="complete"><i class="far fa-check-circle"></i></button>
                </div>
            </li>`
        }
    }
    document.getElementById('todo').innerHTML = uncompleted;
    document.getElementById('completed').innerHTML = completed;

}
let handleTaskDone = (e) => {
    let dcm = e.target.parentElement.parentElement.parentElement;
    let todo = dcm.querySelector('p').innerHTML;
    todoTasks.find((value, index) => {
        if (value.task == todo) {
            todoTasks[index].isDone = true;
        }
        saveList();
        renderTask();
    });
}
let handleDelete = (index) => {
    todoTasks.splice(index*1, 1);
    saveList();
    renderTask();
}
function handleSort(type) {
    if (type == "ascending") {
        console.log("ascending");
        let sorted = todoTasks.sort((a, b) => {
            if(a.task[0] < b.task[0]) return -1
        })
        saveList()
        renderTask()
    }
    if (type == "descending") {
        console.log("descending");
        let sorted = todoTasks.sort((a, b) => {
            if(a.task[0] < b.task[0]) return -1
        })
        saveList()
        renderTask()
    }
}
// document.getElementById('two').addEventListener("click", handleSort("ascending"));
// document.getElementById('three').onclick = handleSort("descending");