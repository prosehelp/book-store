// Catalog Page JavaScript

let currentBooks = getAllBooks();
let currentFilters = {
    category: 'all',
    price: 'all',
    search: '',
    sort: 'default'
};

document.addEventListener('DOMContentLoaded', () => {
    // Load all books initially
    displayBooks(currentBooks);
    
    // Setup filters
    setupFilters();
    
    // Setup search
    setupSearch();
    
    // Setup sort
    setupSort();
    
    // Setup clear filters
    setupClearFilters();
    
    // Check for category in URL
    checkURLParams();
    
    // Mobile menu
    setupMobileMenu();
});

// Display books
function displayBooks(books) {
    const container = document.getElementById('booksGrid');
    const resultCount = document.getElementById('resultCount');
    
    if (!container) return;
    
    if (books.length === 0) {
        container.innerHTML = '<div class="empty-results"><p>No books found matching your criteria.</p><p>Try adjusting your filters.</p></div>';
        resultCount.textContent = 'No books found';
        return;
    }
    
    container.innerHTML = books.map(book => createBookCard(book)).join('');
    resultCount.textContent = `Showing ${books.length} book${books.length !== 1 ? 's' : ''}`;
}

// Create book card
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

// Add to cart
function addToCart(bookId) {
    const book = getBookById(bookId);
    if (book) {
        cart.addItem(book);
    }
}

// Setup filters
function setupFilters() {
    // Category filters
    const categoryRadios = document.querySelectorAll('input[name="category"]');
    categoryRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentFilters.category = e.target.value;
            applyFilters();
        });
    });
    
    // Price filters
    const priceRadios = document.querySelectorAll('input[name="price"]');
    priceRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentFilters.price = e.target.value;
            applyFilters();
        });
    });
}

// Setup search
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(() => {
                currentFilters.search = e.target.value;
                applyFilters();
            }, 300);
        });
    }
}

// Setup sort
function setupSort() {
    const sortSelect = document.getElementById('sortSelect');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentFilters.sort = e.target.value;
            applyFilters();
        });
    }
}

// Setup clear filters
function setupClearFilters() {
    const clearBtn = document.getElementById('clearFilters');
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            // Reset all filters
            currentFilters = {
                category: 'all',
                price: 'all',
                search: '',
                sort: 'default'
            };
            
            // Reset form elements
            document.querySelectorAll('input[name="category"]').forEach(radio => {
                radio.checked = radio.value === 'all';
            });
            
            document.querySelectorAll('input[name="price"]').forEach(radio => {
                radio.checked = radio.value === 'all';
            });
            
            document.getElementById('searchInput').value = '';
            document.getElementById('sortSelect').value = 'default';
            
            // Apply filters
            applyFilters();
        });
    }
}

// Apply all filters
function applyFilters() {
    let filtered = getAllBooks();
    
    // Apply category filter
    if (currentFilters.category !== 'all') {
        filtered = filterBooksByCategory(currentFilters.category);
    }
    
    // Apply price filter
    if (currentFilters.price !== 'all') {
        filtered = filterBooksByPrice(filtered, currentFilters.price);
    }
    
    // Apply search filter
    if (currentFilters.search) {
        const lowerQuery = currentFilters.search.toLowerCase();
        filtered = filtered.filter(book => 
            book.title.toLowerCase().includes(lowerQuery) ||
            book.author.toLowerCase().includes(lowerQuery) ||
            book.description.toLowerCase().includes(lowerQuery)
        );
    }
    
    // Apply sort
    if (currentFilters.sort !== 'default') {
        filtered = sortBooks(filtered, currentFilters.sort);
    }
    
    currentBooks = filtered;
    displayBooks(filtered);
}

// Check URL parameters
function checkURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        currentFilters.category = category;
        
        // Set the radio button
        const radio = document.querySelector(`input[name="category"][value="${category}"]`);
        if (radio) {
            radio.checked = true;
            applyFilters();
        }
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

// Add CSS for empty results
const style = document.createElement('style');
style.textContent = `
    .empty-results {
        grid-column: 1 / -1;
        text-align: center;
        padding: 4rem 2rem;
        color: var(--text-secondary);
    }
    
    .empty-results p:first-child {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
`;
document.head.appendChild(style);
