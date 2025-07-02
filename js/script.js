
class Task {
    constructor(title) {
        this.taskTitle = title;
        this.isComplete = false;
        this.id = Date.now();
    }

    toggleTask() {
        this.isComplete = !this.isComplete;
    }
}

class TaskManager {
    constructor() {
        const savedTasks = localStorage.getItem('smart-tasks');
        this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
    }

    addTask(title) {
        const task = new Task(title);
        this.tasks.push(task);
        // this.savedTasks();

    }
    removeTask(taskId) {
        console.log(taskId);
         this.tasks.filter((item) => item.id !== taskId)
    }
    savedTasks() {
        localStorage.setItem('smart-tasks', JSON.stringify(this.tasks));
    }

    getAllTasks() {
        return this.tasks;
    }

}

const taskManager = new TaskManager();

const taskAddBtn = document.getElementById('addTask');
const taskContainer = document.getElementById('taskContainer');


taskAddBtn.addEventListener('click', () => {
    const Input = document.getElementById('taskInputBox');
    taskManager.addTask(Input.value);
    const tasks = taskManager.getAllTasks();
    console.log(tasks);

    taskContainer.innerHTML = tasks.map((item, index) => {
        return `
     <div class="card p-2 mb-2">
        <div class="form-check d-flex justify-content-between">
           <div>
                <input class="form-check-input" type="checkbox" id="task-${index}" ${item.isChecked ? 'checked' : ''}>
                <label class="form-check-label" for="task-${index}">
                    ${item.taskTitle}
                </label>
           </div>
            <button onclick="remove(${item.id})">Remove</button>
        </div>
     </div>`;
    }).join('');

});

function remove(id){
    taskManager.removeTask(id);
}
