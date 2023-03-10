var todoTasks = [];
window.onload = () => {
  renderTask();
};
class Todo {
  constructor(_task) {
    this.task = _task;
    this.isDone = false;
  }
}
/**
 *Thêm mới việc cần làm
 */
function saveList() {
  localStorage.setItem("toDo-list", JSON.stringify(todoTasks));
}
let handleAddTask = () => {
  let taskInfo = document.getElementById("newTask").value;
  if (!taskInfo) {
    return;
  }
  let task = new Todo(taskInfo);
  todoTasks.push(task);
  saveList();
  renderTask();
  document.getElementById("newTask").value = "";
};
document.querySelector("#addItem").onclick = handleAddTask;
// Tải dữ liệu từ local lên và dợt nó thành html, gắn vào mảng ds công việc
function renderTask() {
  let completed = "";
  let uncompleted = "";
  let getData = JSON.parse(localStorage.getItem("toDo-list"));
  if (!getData) return;
  todoTasks = [...getData];
  // for(let value of todoTasks) {
  for (let i = 0; i < todoTasks.length; i++) {
    if (todoTasks[i].isDone) {
      completed += `
            <li>
                <span>${todoTasks[i].task}</span>
                <div class="buttons">
                    <button onclick="handleDelete('${i}')" class="remove"><i class="fas fa-trash-alt"></i></button>
                    <button onclick= "handleTaskDone('${i}')" class="completed"><i class="far fa-check-circle"></i></button>
                </div>
            </li>`;
    } else {
      uncompleted += `
            <li>
                <p>${todoTasks[i].task}</p>
                <div class="buttons">
                    <button onclick="handleDelete('${i}')" class="remove"><i class="fas fa-trash-alt"></i></button>
                    <button onclick= "handleTaskDone('${i}')" class="complete"><i class="far fa-check-circle"></i></button>
                </div>
            </li>`;
    }
  }
  document.getElementById("todo").innerHTML = uncompleted;
  document.getElementById("completed").innerHTML = completed;
}
let handleTaskDone = (index) => {
  // let dcm = e.target.parentElement.parentElement.parentElement;
  // let todo = dcm.querySelector("p").innerHTML;
  // todoTasks.find((value, index) => {
  //   if (value.task == todo) {
  //     todoTasks[index].isDone = true;
  //   }
  //   saveList();
  //   renderTask();
  // });
  let status = todoTasks[index].isDone;
  if(status) {
    todoTasks[index].isDone = false;
  } else {
    todoTasks[index].isDone = true;
  }
  saveList();
  renderTask();
};
let handleDelete = (index) => {
  todoTasks.splice(index * 1, 1);
  saveList();
  renderTask();
};
function handleSort(type) {
  if (type == "ascending") {
    console.log("A to Z");
    todoTasks.sort((a, b) => {
      if (a.task[0] > b.task[0]) {
        return 1;
      } else {
        return -1;
      }
      //   if (a.task[0] < b.task[0]) return -1;
    });
  } else {
    console.log("Z to A");
    todoTasks.sort((a, b) => {
      if (a.task[0] < b.task[0]) {
        return 1;
      } else {
        return -1;
      }
      //   if (a.task[0] > b.task[0]) return -1;
    });
  }
  saveList();
  renderTask();
}
document.getElementById("two").addEventListener("click", () => {
  handleSort("ascending");
});
document.getElementById("three").addEventListener("click", () => {
  handleSort("deascending");
});
