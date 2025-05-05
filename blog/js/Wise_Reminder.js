document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const clearBtn = document.getElementById('clear-btn');
    const taskList = document.getElementById('task-list');
    const taskCounter = document.getElementById('task-counter');
    const completedCounter = document.getElementById('completed-counter');
    
    // 初始化任务列表
    loadTasks();
    
    // 添加任务事件
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // 清空列表事件
    clearBtn.addEventListener('click', clearTasks);
    
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('请输入有效的任务内容！');
            return;
        }
        
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        
        const taskTextSpan = document.createElement('span');
        taskTextSpan.className = 'task-text';
        taskTextSpan.textContent = taskText;
        
        // 点击任务文本切换完成状态
        taskTextSpan.addEventListener('click', function() {
            this.classList.toggle('completed');
            updateCounters();
            saveTasks();
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '删除';
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
            taskItem.remove();
            updateCounters();
            saveTasks();
        });
        
        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
        taskInput.value = '';
        
        updateCounters();
        saveTasks();
    }
    
    function clearTasks() {
        if (taskList.children.length > 0 && confirm('确定要清空所有任务吗？')) {
            taskList.innerHTML = '';
            updateCounters();
            saveTasks();
        }
    }
    
    function updateCounters() {
        const totalTasks = taskList.children.length;
        const completedTasks = document.querySelectorAll('.task-text.completed').length;
        
        taskCounter.textContent = totalTasks;
        completedCounter.textContent = completedTasks;
    }
    
    function saveTasks() {
        const tasks = [];
        for (let i = 0; i < taskList.children.length; i++) {
            const taskText = taskList.children[i].querySelector('.task-text');
            tasks.push({
                text: taskText.textContent,
                completed: taskText.classList.contains('completed')
            });
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const tasks = JSON.parse(savedTasks);
            tasks.forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.className = 'task-item';
                
                const taskTextSpan = document.createElement('span');
                taskTextSpan.className = 'task-text';
                taskTextSpan.textContent = task.text;
                
                if (task.completed) {
                    taskTextSpan.classList.add('completed');
                }
                
                taskTextSpan.addEventListener('click', function() {
                    this.classList.toggle('completed');
                    updateCounters();
                    saveTasks();
                });
                
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = '删除';
                deleteBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    taskItem.remove();
                    updateCounters();
                    saveTasks();
                });
                
                taskItem.appendChild(taskTextSpan);
                taskItem.appendChild(deleteBtn);
                taskList.appendChild(taskItem);
            });
            updateCounters();
        }
    }
});