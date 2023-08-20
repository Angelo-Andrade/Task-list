function program () {
    const iDone = '<i class="fa-solid fa-check"></i>';
    const iEdit = '<i class="fa-solid fa-pen"></i>';
    const iDelete = '<i class="fa-solid fa-xmark"></i>';
    let oldInputV;
    
    //S.E
    const taskForm = document.querySelector('#task-form');
    const taskInput = document.querySelector('#task-input');
    const taskList = document.querySelector('#task-list');
    const editForm = document.querySelector('#edit-form');
    const editInput = document.querySelector('#edit-input');
    const cancelEditButton = document.querySelector('#cancel-edit-btn');
    const searchInput = document.querySelector("#search-input");
    const eraseButton = document.querySelector("#erase-button");
    const filterBtn = document.querySelector("#filter-select");

    //F
        function saveTask (text, done = 0, save = 1) {
            const task = document.createElement("div");
            task.classList.add("task");
            const taskTitle = document.createElement("h3");
            taskTitle.innerText = text;
            task.appendChild(taskTitle);

            const doneButton = document.createElement("button");
            doneButton.classList.add("finish-task");
            doneButton.innerHTML = iDone;
            task.appendChild(doneButton);
            
            const editButton = document.createElement("button");
            editButton.classList.add("edit-task");
            editButton.innerHTML = iEdit;
            task.appendChild(editButton);
            
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("remove-task");
            deleteButton.innerHTML = iDelete;
            task.appendChild(deleteButton);

            taskList.appendChild(task);

            taskInput.value = "";
            taskInput.focus();
        }

        function toggleForms () {
            editForm.classList.toggle("hide");
            taskForm.classList.toggle("hide");
            taskList.classList.toggle("hide");
        }
    
        function updateTask (text) {
            const tasks = document.querySelectorAll(".task");

            tasks.forEach((task) => {
                let taskTitle = task.querySelector("h3");
                if (taskTitle.innerText === oldInputV) {
                    taskTitle.innerText = text;
                }
            });
        }

        function getSearchedTasks (search) {
            const tasks = document.querySelectorAll(".task");
            tasks.forEach((task) => {
                const taskTitle = task.querySelector("h3").innerText;
                task.style.display = "flex";
                
                console.log(taskTitle);

                if (!taskTitle.includes(search)) {
                    task.style.display = "none";
                }
            });
        }

        function filterTasks (filterV) {
            const tasks = document.querySelectorAll(".task");

            switch (filterV) {
                case "all":
                    tasks.forEach((task) => (task.style.display = "flex"));
                    break;
                case "done":
                    tasks.forEach((task) => task.classList.contains("done") ? (task.style.display = "flex") : (task.style.display = "none"));
                    break;                
                case "todo":
                    tasks.forEach((task) => !task.classList.contains("done") ? (task.style.display = "flex") : (task.style.display = "none"));
                    break;
                default:
                    break;
            }
        }
    
    //E
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputV = taskInput.value;
        if (inputV) {
            saveTask(inputV);
        } 
    });

    document.addEventListener("click", (e) => {
        const targetEl = e.target
        const parentEl = targetEl.closest("div");
        let taskTitle;
        
        if (parentEl && parentEl.querySelector("h3")) {
            taskTitle = parentEl.querySelector("h3").innerText;
        }

        if (targetEl.classList.contains("finish-task")) {
            parentEl.classList.toggle("done");
        }
        
        if (targetEl.classList.contains("edit-task")) {
            toggleForms();
            editInput.value = taskTitle;
            oldInputV = taskTitle
        }
        
        if (targetEl.classList.contains("remove-task")) {
            parentEl.remove();
        }
    });

    cancelEditButton.addEventListener("click", (e) => {
        e.preventDefault();
        toggleForms();
    })

    editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const editInputV = editInput.value;
        if (editInputV) {
            updateTask(editInputV);
        }
        toggleForms();
    })

    searchInput.addEventListener("keyup", (e) => {
        const search = e.target.value;
        getSearchedTasks(search);
    });
      
    eraseButton.addEventListener("click", (e) => {
        e.preventDefault();
        searchInput.value = "";
        searchInput.dispatchEvent(new Event("keyup"));
    });
      
    filterBtn.addEventListener("change", (e) => {
        const filterV = e.target.value;
        filterTasks(filterV);
    });
}
program ();
