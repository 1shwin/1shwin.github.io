const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}

const toggleButton = document.querySelector('.theme-toggle-button');
toggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = (currentTheme === 'dark') ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

function updateDeskScale() {
    const desk = document.querySelector('.desk');
    if (desk) {
       const scale = desk.clientWidth / 1500;
       desk.style.setProperty('--desk-scale', scale);
    }
}

window.addEventListener('resize', updateDeskScale);
document.addEventListener('DOMContentLoaded', () => {
    updateDeskScale();
    
    const screenText = document.getElementById('onscreen-text');
    let typewriter = null;
    if (screenText) {
        typewriter = new Typewriter(screenText, {
            strings: ['echo "hover for more"'],
            typingSpeed: 60,
            eraseSpeed: 30,
            pauseDuration: 1500,
            loop: false
        });
    }

    const links = document.querySelectorAll('.desk-item a');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const href = link.getAttribute('href');
            if (href && typewriter) {
                typewriter.override(`cd ${href}`);
            }
        });
        link.addEventListener('mouseleave', () => {
            if (typewriter) {
                typewriter.resume();
            }
        });
    });
});
updateDeskScale();

class Typewriter {
    constructor(element, config) {
        this.element = element;
        this.strings = config.strings;
        this.typingSpeed = config.typingSpeed;
        this.eraseSpeed = config.eraseSpeed;
        this.pauseDuration = config.pauseDuration;
        this.loop = config.loop !== false;
        
        this.stringIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        this.overrideWord = null;
        this.isOverridden = false;
        this.currentTimeout = null;
        
        this.element.classList.add('typing-cursor');
        this.type();
    }
    
    type() {
        let typeSpeed = this.typingSpeed;
        
        if (this.isDeleting) {
            this.charIndex--;
            if (this.charIndex < 0) this.charIndex = 0;
            const text = this.element.textContent;
            this.element.textContent = text.substring(0, text.length - 1);
            typeSpeed = this.eraseSpeed;
        } else {
            this.charIndex++;
            const targetString = this.isOverridden ? this.overrideWord : this.strings[this.stringIndex];
            this.element.textContent = targetString.substring(0, this.charIndex);
        }
        
        const currentTarget = this.isOverridden ? this.overrideWord : this.strings[this.stringIndex];
        
        if (!this.isDeleting && this.charIndex >= currentTarget.length) {
            if (this.isOverridden || (!this.loop || this.strings.length <= 1)) return;
            this.isDeleting = true;
            typeSpeed = this.pauseDuration;
        } else if (this.isDeleting && this.element.textContent.length === 0) {
            this.isDeleting = false;
            this.charIndex = 0;
            if (!this.isOverridden) {
                this.stringIndex = (this.stringIndex + 1) % this.strings.length;
            }
        }
        
        this.currentTimeout = setTimeout(() => this.type(), typeSpeed);
    }
    
    override(word) {
        this.overrideWord = word;
        this.isOverridden = true;
        this.isDeleting = true;
        if (this.currentTimeout) clearTimeout(this.currentTimeout);
        this.type();
    }
    
    resume() {
        this.isOverridden = false;
        this.isDeleting = true;
        if (this.currentTimeout) clearTimeout(this.currentTimeout);
        this.type();
    }
}