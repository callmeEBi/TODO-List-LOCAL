let $ = document;
let todoInput = $.querySelector("#todo_input");
let addInput = $.querySelector(".input_button_1");
let clearInput = $.querySelector(".input_button_2");
let todoBoxWrapper = $.querySelector(".todo_box_wrapper");
let todoBox = $.querySelector(".todo_box");
let todoCompletedButton = $.querySelector(".todo_button_1");
let todoDeleteButton = $.querySelector(".todo_button_2");
let copyBox;
let allTasks = [];

if (localStorage.getItem("allTasks")) {
  allTasks = JSON.parse(localStorage.getItem("allTasks"));
  allIndex = 0;
  for (let i of allTasks) {
    appendTask(undefined, true, i, allIndex);
    allIndex++;
  }
}

function appendTask(e, isSettingLocal = false, currentTask = "", allIndex = 0) {
  todoInput.focus()
  let completedFlag = 1;
  copyBox = todoBox.cloneNode(true);
  copyBox.classList.remove("u-hidden");

  if (isSettingLocal) {
    copyBox.childNodes[1].textContent = currentTask["content"];
    if (currentTask["status"]) {
      copyBox.style.background = "#40c640";
      completedFlag++;
    }
  } else if (todoInput.value.trim()) {
    copyBox.childNodes[1].textContent = todoInput.value;
    allTasks.push({ content: todoInput.value, status: false });
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
  }

  copyBox.childNodes[3].addEventListener("click", function (event) {
    if (completedFlag % 2) {
      event.target.parentElement.style.backgroundColor = "#40c640";
      completedFlag++;
      allTasks[allIndex]["status"] = true;
    } else {
      event.target.parentElement.style.backgroundColor = "#e2e2e2";
      completedFlag++;
      allTasks[allIndex]["status"] = false;
    }
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
  });

  copyBox.childNodes[5].addEventListener("click", function (event) {
    let eventIndex = allTasks.findIndex(function (item) {
      return (
        item["content"] ===
        event.target.previousElementSibling.previousElementSibling.textContent
      );
    });
    allTasks.splice(eventIndex, 1);
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    event.target.parentElement.remove();
  });

  todoBoxWrapper.append(copyBox);
  todoInput.value = "";
}

addInput.addEventListener("click", appendTask);

todoInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    appendTask();
  }
});

clearInput.addEventListener("click", function () {
  allTasks = [];
  todoBoxWrapper.innerHTML = "";
  localStorage.removeItem("allTasks");
  todoInput.value = "";
});
