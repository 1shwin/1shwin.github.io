document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const confirmationCard = document.getElementById('confirmation-card');
    const resetBtn = document.getElementById('reset-btn');

    if (!form || !confirmationCard || !resetBtn) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        // Reset old errors
        const allFields = [name, email, message];
        allFields.forEach(field => {
            field.setAttribute('aria-invalid', 'false');
            const errorId = field.getAttribute('aria-describedby');
            const errorEl = document.getElementById(errorId);
            if (errorEl) errorEl.textContent = '';
        });
        
        // Validate Name
        if (!name.value.trim()) {
            showError(name, 'Name is required.');
            isValid = false;
        }
        
        // Validate Email
        if (!email.value.trim()) {
            showError(email, 'Email is required.');
            isValid = false;
        } else if (!isValidEmail(email.value.trim())) {
            showError(email, 'Please enter a valid email address.');
            isValid = false;
        }
        
        // Validate Message
        if (!message.value.trim()) {
            showError(message, 'Message is required.');
            isValid = false;
        }
        
        // On success or failure
        if (isValid) {
            form.style.display = 'none';
            confirmationCard.classList.remove('hidden');
            
            // Give focus to confirmation for screen readers and tab sequence
            const cardHeading = confirmationCard.querySelector('h2');
            if (cardHeading) {
                cardHeading.tabIndex = -1;
                cardHeading.focus();
            }
        } else {
            // Give focus to the first invalid field
            const firstInvalid = form.querySelector('[aria-invalid="true"]');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    });

    resetBtn.addEventListener('click', () => {
        form.reset();
        form.style.display = 'flex';
        confirmationCard.classList.add('hidden');
        const nameInput = document.getElementById('name');
        if (nameInput) nameInput.focus();
    });

    function showError(input, message) {
        input.setAttribute('aria-invalid', 'true');
        const errorId = input.getAttribute('aria-describedby');
        const errorEl = document.getElementById(errorId);
        if (errorEl) {
            errorEl.textContent = message;
        }
    }

    function isValidEmail(email) {
        // Basic valid HTML5-like email regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
