# 💳 Payment Integration Guide

This guide provides detailed instructions for integrating payment processing into your Literary Haven book store.

## Overview

Since GitHub Pages only supports static sites (no server-side processing), we need to use third-party payment processors that work with static sites. The three best options are:

1. **Stripe Payment Links** (Recommended - Easiest)
2. **PayPal Smart Buttons** (Good alternative)
3. **Gumroad** (Best for digital products)

## Option 1: Stripe Payment Links (Recommended)

### Why Stripe Payment Links?
- ✅ No backend code required
- ✅ Secure, PCI-compliant checkout
- ✅ Mobile-optimized
- ✅ Supports one-time and recurring payments
- ✅ Easy to set up

### Setup Steps

#### 1. Create Stripe Account
1. Go to [stripe.com](https://stripe.com)
2. Click "Start now" and sign up
3. Complete business verification
4. Activate your account

#### 2. Create Payment Links

**Option A: Single Payment Link for All Books**
1. In Stripe Dashboard, go to **Products**
2. Click **+ New**
3. Create product: "Book Purchase"
4. Add price: Variable (customers enter amount)
5. Go to **Payment links** tab
6. Click **+ New payment link**
7. Configure:
   - Allow customers to enter amount: Yes
   - Collect shipping address: Yes
   - Enable successful payment page
8. Copy the payment link URL

**Option B: Separate Links Per Book**
1. Create a product for each book
2. Set fixed price for each
3. Create payment link for each book
4. Store links in your books data

#### 3. Integrate into Website

**Method 1: Simple Redirect**

Update `js/checkout.js`:

```javascript
function handleStripePayment() {
    const total = cart.getTotal();
    const items = cart.items.map(item => 
        `${item.title} (${item.quantity}x)`
    ).join(', ');
    
    // Store order details in localStorage for later
    localStorage.setItem('pendingOrder', JSON.stringify({
        items: cart.items,
        total: total,
        timestamp: Date.now()
    }));
    
    // Redirect to Stripe Payment Link
    // For variable amount:
    window.location.href = 'https://buy.stripe.com/test_XXXXXXXXXX';
    
    // For specific book:
    // window.location.href = book.stripeLink;
}
```

**Method 2: Multiple Book Checkout**

If you want customers to buy multiple books at once, you have two options:

**A. Use Stripe Checkout (Requires Backend)**

Create a serverless function (e.g., on Netlify or Vercel):

```javascript
// netlify/functions/create-checkout.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    const { items } = JSON.parse(event.body);
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.title,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: 'https://yourdomain.com/success.html',
        cancel_url: 'https://yourdomain.com/checkout.html',
    });
    
    return {
        statusCode: 200,
        body: JSON.stringify({ url: session.url }),
    };
};
```

Then update `checkout.js`:

```javascript
async function handleStripePayment() {
    const response = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        body: JSON.stringify({ items: cart.items }),
    });
    
    const { url } = await response.json();
    window.location.href = url;
}
```

**B. Direct Customers to Payment Links**

Simpler approach - let customers buy one book at a time:

```javascript
// In catalog.js
function createBookCard(book) {
    return `
        <div class="book-card">
            <!-- ... -->
            <a href="${book.stripeLink}" class="btn btn-primary">
                Buy Now - $${book.price}
            </a>
        </div>
    `;
}
```

#### 4. Handle Success & Confirmation

Create a `success.html` page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Order Confirmation - Literary Haven</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <section style="padding: 6rem 2rem; text-align: center;">
        <h1>Thank You for Your Order! 🎉</h1>
        <p>Your payment was successful.</p>
        <p>You'll receive a confirmation email shortly.</p>
        <a href="catalog.html" class="btn btn-primary">Continue Shopping</a>
    </section>
    
    <script>
        // Clear cart after successful purchase
        localStorage.removeItem('cart');
    </script>
</body>
</html>
```

### Testing

1. Use Stripe's test mode
2. Test card: 4242 4242 4242 4242
3. Any future expiry date
4. Any CVC

## Option 2: PayPal Smart Buttons

### Setup Steps

#### 1. Create PayPal Business Account
1. Go to [paypal.com/business](https://www.paypal.com/business)
2. Sign up and verify
3. Go to [developer.paypal.com](https://developer.paypal.com)

#### 2. Get API Credentials
1. Log in to PayPal Developer
2. Go to **My Apps & Credentials**
3. Create new app
4. Copy **Client ID**

#### 3. Integrate PayPal Buttons

Update `checkout.html`:

```html
<!-- Add PayPal SDK -->
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD"></script>

<div id="paypal-button-container"></div>

<script>
paypal.Buttons({
    createOrder: function(data, actions) {
        // Calculate total from cart
        const total = cart.getTotal().toFixed(2);
        
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: total
                },
                description: 'Books from Literary Haven'
            }]
        });
    },
    
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            // Show success message
            alert('Transaction completed by ' + details.payer.name.given_name);
            
            // Clear cart and redirect
            cart.clearCart();
            window.location.href = 'success.html';
        });
    },
    
    onError: function(err) {
        console.error('PayPal Error:', err);
        alert('An error occurred with your payment. Please try again.');
    }
}).render('#paypal-button-container');
</script>
```

### Testing

1. Use sandbox mode in PayPal Developer
2. Create test buyer and seller accounts
3. Test transactions with test accounts

## Option 3: Gumroad (Best for Digital Books)

### Setup Steps

#### 1. Create Gumroad Account
1. Sign up at [gumroad.com](https://gumroad.com)
2. Complete profile

#### 2. Add Products
1. Click **+ New Product**
2. Add book details:
   - Title
   - Description
   - Price
   - Cover image
3. Configure:
   - Enable "Get email on purchase"
   - Set delivery method (digital file or email)

#### 3. Get Product Links
1. After creating product, copy the product URL
2. Format: `https://username.gumroad.com/l/productname`

#### 4. Integrate into Website

Update `js/books-data.js`:

```javascript
{
    id: 1,
    title: "Your Book",
    author: "Author Name",
    price: 19.99,
    gumroadLink: "https://yourname.gumroad.com/l/bookname",
    // ... other fields
}
```

Update book cards to link to Gumroad:

```javascript
function createBookCard(book) {
    return `
        <div class="book-card">
            <!-- ... -->
            <a href="${book.gumroadLink}" 
               class="btn btn-primary"
               target="_blank">
                Buy on Gumroad - $${book.price}
            </a>
        </div>
    `;
}
```

**Embed Gumroad Overlay:**

```html
<a href="https://yourname.gumroad.com/l/bookname" 
   class="gumroad-button btn btn-primary">
    Buy Now
</a>
<script src="https://gumroad.com/js/gumroad.js"></script>
```

## Comparison Table

| Feature | Stripe Links | PayPal Buttons | Gumroad |
|---------|--------------|----------------|---------|
| Setup Difficulty | Easy | Medium | Very Easy |
| Transaction Fee | 2.9% + $0.30 | 2.9% + $0.30 | 3.5% + $0.30 |
| Backend Required | No | Optional | No |
| Multiple Items | Hard | Easy | Hard |
| Digital Delivery | No | No | Yes |
| Best For | Physical books | Either | Digital books |

## Recommended Setup by Use Case

### Physical Books Only
→ **Stripe Payment Links**
- Create one link per book
- Customer buys one at a time
- Manually fulfill orders

### Multiple Book Orders
→ **PayPal Smart Buttons**
- Integrate buttons in checkout
- Supports cart functionality
- Better for bulk orders

### Digital Books/eBooks
→ **Gumroad**
- Automatic file delivery
- Built-in email collection
- Easiest for digital products

## Order Fulfillment

### Manual Process
1. Receive payment notification email
2. Check order details
3. Package and ship (for physical books)
4. Send tracking info to customer

### Semi-Automated
1. Use Stripe/PayPal webhooks (requires backend)
2. Automatically send order confirmations
3. Integrate with shipping services

### Tools to Consider
- **Shippo**: Shipping label platform
- **EasyPost**: Shipping API
- **Printful**: Print-on-demand
- **SendGrid**: Email automation

## Security Best Practices

1. **Never Store Payment Info**
   - Let Stripe/PayPal handle it
   - Never save card numbers

2. **Use HTTPS**
   - GitHub Pages provides this
   - Required for payment processing

3. **Validate Orders**
   - Check amounts on backend
   - Verify customer information

4. **Keep Keys Secret**
   - Never commit API keys to GitHub
   - Use environment variables
   - Use test keys for development

## Testing Checklist

Before going live:

- [ ] Test payment flow completely
- [ ] Verify amounts are correct
- [ ] Test successful payment
- [ ] Test failed payment
- [ ] Test order confirmation
- [ ] Verify email notifications
- [ ] Test on mobile devices
- [ ] Check refund process
- [ ] Test with real (small) transaction

## Support & Resources

### Stripe
- [Stripe Documentation](https://stripe.com/docs)
- [Payment Links Guide](https://stripe.com/docs/payment-links)
- [Stripe Support](https://support.stripe.com)

### PayPal
- [PayPal Developer Docs](https://developer.paypal.com/docs)
- [Smart Buttons Guide](https://developer.paypal.com/docs/checkout)
- [PayPal Support](https://www.paypal.com/us/smarthelp/home)

### Gumroad
- [Gumroad Help](https://help.gumroad.com)
- [Gumroad Creator Guide](https://gumroad.com/features)

## Common Issues & Solutions

### Issue: Payment Not Processing

**Solutions:**
- Check API keys are correct
- Verify account is activated
- Test in sandbox/test mode first
- Check browser console for errors

### Issue: Customer Not Receiving Confirmation

**Solutions:**
- Verify email settings in payment processor
- Check spam folder
- Set up success page redirect
- Configure webhooks for automation

### Issue: Wrong Amount Charged

**Solutions:**
- Double-check price calculation
- Verify tax/shipping calculations
- Test with various amounts
- Add validation before payment

## Next Steps

1. Choose your payment processor
2. Complete account setup
3. Test in sandbox/test mode
4. Integrate into website
5. Test end-to-end flow
6. Go live with real payments!

---

Need help? Check the main README or open an issue in the repository!
