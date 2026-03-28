const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    }
}, observerOptions);

const animatedElements = document.querySelectorAll('.animate-on-scroll');
for (let i = 0; i < animatedElements.length; i++) {
    sectionObserver.observe(animatedElements[i]);
}

