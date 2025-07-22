const btn = document.getElementById("theme-toggle"); //darkmode toggle
btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  btn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

document.getElementById(
  //location and last modified
  "location"
).textContent = `Location: ${window.location.href}`;
document.getElementById(
  "last-modified"
).textContent = `Last Modified: ${new Date(
  document.lastModified
).toLocaleString()}`;

//Fortune Generator
(() => {
  const fortunes = [
    "Your future is bright!",
    "Adventure awaits you.",
    "A fresh start will put you on your way.",
    "Believe in yourself and others will too.",
    "Change is coming—embrace it.",
    "Happiness begins with a smile.",
    "Opportunities are closer than they appear.",
    "Success comes to those who never quit.",
    "Today is your lucky day!",
    "You will receive good news soon.",
  ];

  const box = document.getElementById("fortune-box");
  box.textContent = fortunes[Math.floor(Math.random() * fortunes.length)];

  //this function changes everything
  function changeEverything() {
    box.style.color = getRandomColor();
    box.style.backgroundColor = getRandomColor();
    box.style.borderColor = getRandomColor();
    box.style.fontSize = `${getRandomInt(18, 26)}px`;
    box.style.fontFamily = ["Arial", "Georgia", "Courier New"][
      getRandomInt(0, 2)
    ];
  }

  //attach same function for all 4 button
  document.querySelectorAll(".fortune-controls .btn").forEach((btn) => {
    btn.addEventListener("click", changeEverything);
  });

  function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
})();

//Weight Converter
document.getElementById("convert-btn").addEventListener("click", () => {
  const val = parseFloat(document.getElementById("input-weight").value);
  const unit = document.getElementById("weight-unit").value;
  let result = "";

  if (!isNaN(val)) {
    if (unit === "kg-to-lb") result = (val * 2.2046).toFixed(2) + " lbs";
    else result = (val * 0.4536).toFixed(2) + " kg";
  }
  document.getElementById("converter-result").textContent = result;
});

//Stopwatch (3s increment, max 30s)
let timer = 0;
let displayTime = 0;
let interval;
const display = document.getElementById("timer-display");

document.getElementById("start-btn").addEventListener("click", () => {
  if (!interval) {
    interval = setInterval(() => {
      timer++; // internal time increases every second
      display.textContent = timer + " s";

      if (timer >= 30) {
        clearInterval(interval);
        interval = null;
      }
    }, 1000); // real-time increment per second
  }
});

document.getElementById("stop-btn").addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
});

document.getElementById("reset-btn").addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
  timer = 0;
  displayTime = 0;
  display.textContent = "0 s";
});

//To-Do List with Local Storage
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
let todos = JSON.parse(localStorage.getItem("todos") || "[]");

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((t, i) => {
    const li = document.createElement("li");

    const chk = document.createElement("input");
    chk.type = "checkbox";
    chk.checked = t.done;

    chk.addEventListener("change", () => {
      t.done = chk.checked;
      save();
      renderTodos();
    });

    const span = document.createElement("span");
    span.textContent = t.text;
    if (t.done) {
      span.style.textDecoration = "line-through";
      span.style.fontWeight = "bold";
    }

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      todos.splice(i, 1);
      save();
      renderTodos();
    });

    li.append(chk, span, del);
    todoList.appendChild(li);
  });
}

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

renderTodos();

document.getElementById("add-todo-btn").addEventListener("click", () => {
  const text = todoInput.value.trim();
  if (text) {
    todos.push({ text, done: false });
    save();
    renderTodos();
    todoInput.value = "";
  }
});
