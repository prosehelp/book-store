// Cart Management
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
    }

    // Load cart from localStorage
    loadCart() {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    // Add item to cart
    addItem(book) {
        const existingItem = this.items.find(item => item.id === book.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: book.id,
                title: book.title,
                author: book.author,
                price: book.price,
                cover: book.cover,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartCount();
        this.showNotification(`"${book.title}" added to cart`);
    }

    // Remove item from cart
    removeItem(bookId) {
        this.items = this.items.filter(item => item.id !== bookId);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }

    // Update quantity
    updateQuantity(bookId, quantity) {
        const item = this.items.find(item => item.id === bookId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
            this.renderCart();
            this.updateCartCount();
        }
    }

    // Get total
    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    // Get item count
    getItemCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Update cart count in nav
    updateCartCount() {
        const countElements = document.querySelectorAll('#cartCount');
        const count = this.getItemCount();
        countElements.forEach(el => {
            el.textContent = count;
        });
    }

    // Render cart modal
    renderCart() {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        if (!cartItemsContainer) return;

        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p><p>Start adding books to your collection!</p></div>';
            cartTotal.textContent = '0.00';
            return;
        }

        cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.cover}</div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-author">by ${item.author}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} × ${item.quantity}</div>
                    <button class="cart-item-remove" onclick="cart.removeItem(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');

        cartTotal.textContent = this.getTotal().toFixed(2);
    }

    // Show notification
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--success);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 4px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 3000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Clear cart
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const cartModal = document.getElementById('cartModal');
    const cartLink = document.getElementById('cartLink');
    const closeCart = document.getElementById('closeCart');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Open cart
    if (cartLink) {
        cartLink.addEventListener('click', (e) => {
            e.preventDefault();
            cart.renderCart();
            cartModal.classList.add('active');
        });
    }

    // Close cart
    const closeModalFunc = () => {
        cartModal.classList.remove('active');
    };

    if (closeCart) closeCart.addEventListener('click', closeModalFunc);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeModalFunc);

    // Close on outside click
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            closeModalFunc();
        }
    });

    // Checkout
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.items.length === 0) {
                alert('Your cart is empty');
                return;
            }
            window.location.href = 'checkout.html';
        });
    }
});

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
