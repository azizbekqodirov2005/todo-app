(function () {
  'use strict';

  var STORAGE_KEY = 'todoAppTasks';

  var els = {
    form: document.getElementById('addForm'),
    input: document.getElementById('taskInput'),
    inputError: document.getElementById('inputError'),
    list: document.getElementById('taskList'),
    emptyState: document.getElementById('emptyState'),
    itemsLeft: document.getElementById('itemsLeft'),
    listFooter: document.getElementById('listFooter'),
    clearCompletedBtn: document.getElementById('clearCompletedBtn')
  };

  var tasks = loadTasks();

  function loadTasks() {
    var raw = null;
    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      raw = null;
    }
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        return [];
      }
    }
    return [];
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
    }
  }

  function render() {
    els.list.innerHTML = '';

    if (tasks.length === 0) {
      els.emptyState.style.display = 'block';
      els.listFooter.style.display = 'none';
    } else {
      els.emptyState.style.display = 'none';
      els.listFooter.style.display = 'flex';
    }

    tasks.forEach(function (task) {
      els.list.appendChild(buildTaskItem(task));
    });

    var activeCount = tasks.filter(function (t) { return !t.completed; }).length;
    els.itemsLeft.textContent = activeCount + " ta faol vazifa";
  }

  function buildTaskItem(task) {
    var li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');
    li.dataset.id = task.id;

    var checkbox = document.createElement('button');
    checkbox.type = 'button';
    checkbox.className = 'task-checkbox' + (task.completed ? ' checked' : '');
    checkbox.setAttribute('aria-label', 'Bajarilgan deb belgilash');
    checkbox.addEventListener('click', function () {
      toggleTask(task.id);
    });

    var text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = task.text;

    var actions = document.createElement('div');
    actions.className = 'task-actions';

    var editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'icon-btn edit-btn';
    editBtn.setAttribute('aria-label', "Tahrirlash");
    editBtn.innerHTML = '&#9998;';
    editBtn.addEventListener('click', function () {
      startEdit(li, task);
    });

    var deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'icon-btn delete-btn';
    deleteBtn.setAttribute('aria-label', "O'chirish");
    deleteBtn.innerHTML = '&#128465;';
    deleteBtn.addEventListener('click', function () {
      removeTask(li, task.id);
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(actions);

    return li;
  }

  function startEdit(li, task) {
    var textEl = li.querySelector('.task-text');
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'task-edit-input';
    input.value = task.text;

    li.replaceChild(input, textEl);
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);

    function finishEdit() {
      var newText = input.value.trim();
      if (newText !== '') {
        task.text = newText;
        saveTasks();
      }
      render();
    }

    input.addEventListener('blur', finishEdit);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        input.blur();
      } else if (e.key === 'Escape') {
        render();
      }
    });
  }

  function toggleTask(id) {
    var task = tasks.find(function (t) { return t.id === id; });
    if (!task) return;
    task.completed = !task.completed;
    saveTasks();
    render();
  }

  function removeTask(li, id) {
    li.classList.add('removing');
    li.addEventListener('animationend', function () {
      tasks = tasks.filter(function (t) { return t.id !== id; });
      saveTasks();
      render();
    }, { once: true });
  }

  els.form.addEventListener('submit', function (e) {
    e.preventDefault();
    var value = els.input.value.trim();

    if (value === '') {
      els.inputError.textContent = "Vazifa matnini kiriting.";
      els.input.classList.add('shake');
      setTimeout(function () { els.input.classList.remove('shake'); }, 400);
      return;
    }

    els.inputError.textContent = '';

    tasks.push({
      id: Date.now(),
      text: value,
      completed: false
    });

    saveTasks();
    els.input.value = '';
    render();
  });

  els.clearCompletedBtn.addEventListener('click', function () {
    tasks = tasks.filter(function (t) { return !t.completed; });
    saveTasks();
    render();
  });

  render();
})();
