// Contact Form JavaScript

document.addEventListener('DOMContentLoaded', () => {
    setupContactForm();
    setupMobileMenu();
});

function setupContactForm() {
    const form = document.getElementById('contactForm');
    const messageDiv = document.getElementById('formMessage');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Disable submit button
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Simulate sending (in a real app, this would send to a server)
            await simulateFormSubmission(formData);
            
            // Show success message
            messageDiv.className = 'form-message success';
            messageDiv.textContent = 'Thank you for your message! We\'ll get back to you within 24 hours.';
            
            // Reset form
            form.reset();
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                messageDiv.className = 'form-message';
            }, 5000);
        });
    }
}

function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            console.log('Form submitted:', data);
            resolve();
        }, 1000);
    });
}

function setupMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
}

// Form validation
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    
    inputs.forEach(input => {
        input.addEventListener('invalid', (e) => {
            e.preventDefault();
            input.style.borderColor = 'var(--error)';
        });
        
        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                input.style.borderColor = 'var(--border)';
            }
        });
    });
});
