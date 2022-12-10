{
    let taskTable = [];
    let hideDoneTasks = false;
  
    const removeTask = (taskIndex) => { 
      taskTable = [ 
        ...taskTable.slice(0, taskIndex), 
        ...taskTable.slice(taskIndex + 1), 
      ];
      render();
    };
  
    const toggleTaskDone = (taskIndex) => {
      taskTable = [
        ...taskTable.slice(0, taskIndex), 
        { ...taskTable[taskIndex], done: !taskTable[taskIndex]. done }, 
        ...taskTable.slice(taskIndex + 1), 
      ];
      render();
    };
  
    
    const addNewTask = (newTaskContent) => {
      taskTable = [...taskTable, { content: newTaskContent }];
      render();
    };
  
    
    const markAllTasksDone = () => {
      taskTable = taskTable.map((task) => ({ ...task, done: true }));
      render();
    };
  
  
    const toggleHideDoneTasks = () => {
      hideDoneTasks = !hideDoneTasks;
      render();
    };
  
    const bindRemoveEvents = () => {
      const removeButtons = document.querySelectorAll(".js-remove");
      removeButtons.forEach((removeButton, taskIndex) => {
        removeButton.addEventListener("click", () => {
          removeTask(taskIndex);
        });
      });
    };
  
    const bindToggleDoneEvents = () => {
      const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");
      toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
        toggleDoneButton.addEventListener("click", () => {
          toggleTaskDone(taskIndex);
        });
      });
    };
  
    const renderTasks = () => {
      let tasksListHTMLContent = task =>
        `<li class="tasks__item${task.done && hideDoneTasks ? " task__item--hidden" : ""} js-task">
        <button class="tasks__button task__button--toggleDone js-toggleDone">${task.done ? "✔" : ""}</button>
        <span class="tasks__content${task.done ? " tasks__content--done" : ""}">${task.content}</span>
        <button class="tasks__button task__button--remove js-remove">🗑</button>
        </li>`;
      const taskElement = document.querySelector(".js-tasks");
      taskElement.innerHTML = taskTable.map(tasksListHTMLContent).join("");
    };
  
    const renderButtons = () => { 
      const buttonsElements = document.querySelector(".js-sectionButtons");
      if (!taskTable.length) { 
        buttonsElements.innerHTML = ""; 
        return;
      }
      buttonsElements.innerHTML =
      `<button class="buttons__button js-allTaskHideButton js-buttons">${hideDoneTasks ? "Show" : "Hide"} completed</button>
      <button class="buttons__button js-allTaskFinaliseButton js-buttons" 
      ${ taskTable.every(({ done }) => done) ? " disabled" : ""}>Finalise all</button>`;
    };
  
    const bindButtonsEvents = () => {
      const markAllDoneButton = document.querySelector(".js-allTaskFinaliseButton");
      if (markAllDoneButton) {
        markAllDoneButton.addEventListener("click", markAllTasksDone);
      }
      const toggleHideDoneTasksButton = document.querySelector(".js-allTaskHideButton");
      if (toggleHideDoneTasksButton) {
        toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
      }
    };
  
  
    const render = () => {
      renderTasks();
      bindRemoveEvents();
      bindToggleDoneEvents();
      renderButtons();
      bindButtonsEvents();
    };
  
    const onFormSubmit = (event) => {
      event.preventDefault();
      const newTaskElement = document.querySelector(".js-newTask");
      const newTaskContent = newTaskElement.value.trim();
  
      if (newTaskContent !== "") {
        addNewTask(newTaskContent);
        newTaskElement.value = "";
      }
      newTaskElement.focus();
    };
  
    const init = () => {
      render();
      const form = document.querySelector(".js-form");
      form.addEventListener("submit", onFormSubmit);
    };
    init();
  }