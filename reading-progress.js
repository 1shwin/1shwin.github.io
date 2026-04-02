export function initReadingProgress() {
    const progressBar = document.getElementById('reading-progress-bar');
    if (!progressBar) return;

    const storageKey = 'about-scroll-pos';

    const updateProgress = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        const progress = calcHeight > 0 ? (scrollTop / calcHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;

        sessionStorage.setItem(storageKey, scrollTop.toString());
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    
    const savedPosStr = sessionStorage.getItem(storageKey);
    const savedPos = savedPosStr ? parseInt(savedPosStr, 10) : 0;
    const currentPos = window.scrollY || document.documentElement.scrollTop;

    if (savedPos > 300 && currentPos < 100) {
        showResumePrompt(savedPos);
    }
    
    updateProgress();
}

function showResumePrompt(savedPos) {
    const promptContainer = document.createElement('div');
    promptContainer.className = 'resume-prompt-container';
    
    const textNode = document.createElement('span');
    textNode.textContent = 'Resume reading where you left off?';
    
    const resumeBtn = document.createElement('button');
    resumeBtn.textContent = 'Resume';
    resumeBtn.className = 'resume-btn';
    resumeBtn.addEventListener('click', () => {
        window.scrollTo({
            top: savedPos,
            behavior: 'smooth'
        });
        hidePrompt();
    });

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.className = 'close-btn';
    closeBtn.setAttribute('aria-label', 'Dismiss');
    closeBtn.addEventListener('click', () => {
        hidePrompt();
    });

    function hidePrompt() {
        promptContainer.classList.add('hide');
        setTimeout(() => promptContainer.remove(), 400);
    }

    promptContainer.appendChild(textNode);
    promptContainer.appendChild(resumeBtn);
    promptContainer.appendChild(closeBtn);

    document.body.appendChild(promptContainer);
    
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            promptContainer.classList.add('show');
        });
    });
}
