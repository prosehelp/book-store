// Checkout JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Check if cart is empty
    if (cart.items.length === 0) {
        alert('Your cart is empty. Redirecting to catalog...');
        window.location.href = 'catalog.html';
        return;
    }
    
    setupCheckoutFlow();
    displayOrderSummary();
    setupPaymentOptions();
    setupMobileMenu();
});

// Setup checkout flow navigation
function setupCheckoutFlow() {
    const continueShippingBtn = document.getElementById('continueShipping');
    const continuePaymentBtn = document.getElementById('continuePayment');
    const backToContactBtn = document.getElementById('backToContact');
    const backToShippingBtn = document.getElementById('backToShipping');
    const placeOrderBtn = document.getElementById('placeOrder');
    
    // Step 1 to Step 2
    if (continueShippingBtn) {
        continueShippingBtn.addEventListener('click', () => {
            if (validateContactInfo()) {
                showSection('shippingSection');
                updateSteps(2);
            }
        });
    }
    
    // Step 2 to Step 3
    if (continuePaymentBtn) {
        continuePaymentBtn.addEventListener('click', () => {
            if (validateShippingInfo()) {
                showSection('paymentSection');
                updateSteps(3);
                updateShippingCost();
            }
        });
    }
    
    // Back buttons
    if (backToContactBtn) {
        backToContactBtn.addEventListener('click', () => {
            showSection('contactSection');
            updateSteps(1);
        });
    }
    
    if (backToShippingBtn) {
        backToShippingBtn.addEventListener('click', () => {
            showSection('shippingSection');
            updateSteps(2);
        });
    }
    
    // Place order
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', () => {
            handlePlaceOrder();
        });
    }
}

// Show section
function showSection(sectionId) {
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    document.getElementById(sectionId).classList.remove('hidden');
}

// Update steps indicator
function updateSteps(activeStep) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index < activeStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Validate contact info
function validateContactInfo() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    
    if (!firstName || !lastName || !email) {
        alert('Please fill in all required fields');
        return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    return true;
}

// Validate shipping info
function validateShippingInfo() {
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    
    if (!address || !city || !state || !zip) {
        alert('Please fill in all required shipping fields');
        return false;
    }
    
    return true;
}

// Display order summary
function displayOrderSummary() {
    const container = document.getElementById('checkoutItems');
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (!container) return;
    
    const items = cart.items;
    const subtotal = cart.getTotal();
    
    // Display items
    container.innerHTML = items.map(item => `
        <div class="cart-item" style="padding: 1rem; border-bottom: 1px solid var(--border);">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                    <div style="font-weight: 600; margin-bottom: 0.25rem;">${item.title}</div>
                    <div style="font-size: 0.9rem; color: var(--text-secondary);">Qty: ${item.quantity}</div>
                </div>
                <div style="font-weight: 600;">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        </div>
    `).join('');
    
    // Calculate costs
    const shippingCost = calculateShipping(subtotal);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shippingCost + tax;
    
    // Update totals
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    shippingEl.textContent = shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
}

// Calculate shipping
function calculateShipping(subtotal) {
    const shippingMethod = document.querySelector('input[name="shipping"]:checked');
    
    if (!shippingMethod) {
        // Standard shipping - free over $35
        return subtotal >= 35 ? 0 : 4.99;
    }
    
    if (shippingMethod.value === 'express') {
        return 12.99;
    }
    
    // Standard shipping
    return subtotal >= 35 ? 0 : 4.99;
}

// Update shipping cost when method changes
function updateShippingCost() {
    const shippingRadios = document.querySelectorAll('input[name="shipping"]');
    
    shippingRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            displayOrderSummary();
        });
    });
}

// Setup payment options
function setupPaymentOptions() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    const stripePayment = document.getElementById('stripePayment');
    const paypalPayment = document.getElementById('paypalPayment');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            const method = option.dataset.method;
            
            if (method === 'stripe') {
                stripePayment.classList.remove('hidden');
                paypalPayment.classList.add('hidden');
            } else if (method === 'paypal') {
                stripePayment.classList.add('hidden');
                paypalPayment.classList.remove('hidden');
            }
        });
    });
}

// Handle place order
function handlePlaceOrder() {
    const activePaymentMethod = document.querySelector('.payment-option.active');
    
    if (!activePaymentMethod) {
        alert('Please select a payment method');
        return;
    }
    
    const method = activePaymentMethod.dataset.method;
    
    if (method === 'stripe') {
        handleStripePayment();
    } else if (method === 'paypal') {
        handlePayPalPayment();
    }
}

// Handle Stripe payment
function handleStripePayment() {
    // In a real implementation, you would:
    // 1. Create a Stripe Checkout session on your backend
    // 2. Redirect to Stripe Checkout
    // 3. Handle the success/cancel callbacks
    
    // For this demo, we'll show the concept
    const total = document.getElementById('total').textContent;
    
    alert(`Stripe Payment Integration:\n\nIn a production environment, you would be redirected to Stripe Checkout to securely complete your payment of ${total}.\n\nStripe Integration Steps:\n1. Create a Stripe account at stripe.com\n2. Set up Stripe Checkout or Payment Links\n3. Use Stripe's API to create checkout sessions\n4. Redirect customers to secure payment page\n5. Handle webhooks for order confirmation`);
    
    // Simulate successful payment
    setTimeout(() => {
        completeOrder();
    }, 1000);
}

// Handle PayPal payment
function handlePayPalPayment() {
    // In a real implementation, you would:
    // 1. Set up PayPal Checkout buttons
    // 2. Handle the PayPal payment flow
    // 3. Process the order after payment
    
    const total = document.getElementById('total').textContent;
    
    alert(`PayPal Payment Integration:\n\nIn a production environment, you would see PayPal payment buttons and be redirected to PayPal to complete your payment of ${total}.\n\nPayPal Integration Steps:\n1. Create a PayPal Business account\n2. Get API credentials from PayPal Developer\n3. Add PayPal Smart Payment Buttons\n4. Handle payment authorization\n5. Capture funds and fulfill order`);
    
    // Simulate successful payment
    setTimeout(() => {
        completeOrder();
    }, 1000);
}

// Complete order
function completeOrder() {
    // Get order details
    const orderData = {
        customer: {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        },
        shipping: {
            address: document.getElementById('address').value,
            apartment: document.getElementById('apartment').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zip: document.getElementById('zip').value,
            country: document.getElementById('country').value,
            method: document.querySelector('input[name="shipping"]:checked').value
        },
        items: cart.items,
        total: document.getElementById('total').textContent
    };
    
    console.log('Order completed:', orderData);
    
    // Clear cart
    cart.clearCart();
    
    // Show success message and redirect
    alert('Order placed successfully! Thank you for your purchase.\n\nYou will receive a confirmation email shortly.');
    
    window.location.href = 'index.html';
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

// Promo code functionality
document.addEventListener('DOMContentLoaded', () => {
    const promoBtn = document.querySelector('.promo-code button');
    
    if (promoBtn) {
        promoBtn.addEventListener('click', () => {
            const promoInput = document.getElementById('promoCode');
            const code = promoInput.value.trim().toUpperCase();
            
            if (code) {
                // Check promo code (demo codes)
                const validCodes = {
                    'BOOK10': 0.10,
                    'READER20': 0.20,
                    'WELCOME15': 0.15
                };
                
                if (validCodes[code]) {
                    alert(`Promo code applied! You save ${validCodes[code] * 100}%`);
                } else {
                    alert('Invalid promo code');
                }
            }
        });
    }
});
