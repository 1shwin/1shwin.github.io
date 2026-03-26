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
document.addEventListener('DOMContentLoaded', updateDeskScale);
updateDeskScale();