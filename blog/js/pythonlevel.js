document.addEventListener('DOMContentLoaded', () => {
    // 初始化折叠功能
    document.querySelectorAll('.level-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });
    });

    // 初始化确认按钮
    document.querySelectorAll('.confirm-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // 防止触发父元素的点击事件
            handleConfirm(btn);
        });
    });

    // 加载保存的进度
    loadProgress();
});

function handleConfirm(btn) {
    const card = btn.closest('.level-card');
    const indicator = card.querySelector('.status-indicator');
    const isCompleted = !btn.classList.contains('completed');

    btn.classList.toggle('completed', isCompleted);
    btn.textContent = isCompleted ? '✓ 已完成' : '确认完成';
    indicator.classList.toggle('completed', isCompleted);

    // 保存状态
    const levelId = card.id;
    localStorage.setItem(levelId, isCompleted);

    // 更新进度条
    updateProgress();
}

function loadProgress() {
    let completedCount = 0;
    
    document.querySelectorAll('.level-card').forEach(card => {
        const levelId = card.id;
        const isCompleted = localStorage.getItem(levelId) === 'true';
        const btn = card.querySelector('.confirm-btn');
        const indicator = card.querySelector('.status-indicator');

        if (isCompleted) {
            btn.classList.add('completed');
            btn.textContent = '✓ 已完成';
            indicator.classList.add('completed');
            completedCount++;
        }
    });

    updateProgress(completedCount);
}

function updateProgress() {
    const totalLevels = document.querySelectorAll('.level-card').length;
    const completed = document.querySelectorAll('.confirm-btn.completed').length;
    const progress = (completed / totalLevels) * 100;
    
    document.querySelector('.progress-bar').style.width = `${progress}%`;
}