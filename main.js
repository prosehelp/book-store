// Main JavaScript for Homepage

document.addEventListener('DOMContentLoaded', () => {
    // Load featured books
    loadFeaturedBooks();
    
    // Mobile menu toggle
    setupMobileMenu();
    
    // Newsletter form
    setupNewsletterForm();
});

// Load featured books
function loadFeaturedBooks() {
    const container = document.getElementById('featuredBooks');
    if (!container) return;

    const featuredBooks = getFeaturedBooks();
    
    container.innerHTML = featuredBooks.map(book => createBookCard(book)).join('');
}

// Create book card HTML
function createBookCard(book) {
    return `
        <div class="book-card">
            <div class="book-cover">${book.cover}</div>
            <div class="book-info">
                <div class="book-category">${book.category}</div>
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <p class="book-description">${book.description}</p>
                <div class="book-footer">
                    <span class="book-price">$${book.price.toFixed(2)}</span>
                    <button class="btn btn-primary add-to-cart" onclick="addToCart(${book.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
}

// Add to cart function
function addToCart(bookId) {
    const book = getBookById(bookId);
    if (book) {
        cart.addItem(book);
    }
}

// Setup mobile menu
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

// Setup newsletter form
function setupNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value;
            
            // Show success message
            alert(`Thank you for subscribing! We'll send updates to ${email}`);
            form.reset();
        });
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.book-card, .category-card, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});
