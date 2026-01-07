# 📚 Literary Haven - GitHub Pages Book Store

A complete, professional book-selling website built for GitHub Pages with a distinctive editorial aesthetic. Features a responsive design, shopping cart functionality, and integration guides for payment processing.

## ✨ Features

### Core Functionality
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Book Catalog**: Filterable and searchable book collection with categories
- **Shopping Cart**: Full cart functionality with localStorage persistence
- **Checkout Flow**: Multi-step checkout process with form validation
- **Payment Integration**: Ready for Stripe and PayPal integration

### Design & UX
- **Editorial Aesthetic**: Distinctive design with Cormorant Garamond and Lato fonts
- **Smooth Animations**: Scroll-triggered animations and micro-interactions
- **Professional Layout**: Clean, trustworthy design perfect for e-commerce
- **SEO Optimized**: Proper meta tags and semantic HTML structure

### Pages Included
1. **Homepage** (`index.html`) - Hero section, featured books, categories
2. **Catalog** (`catalog.html`) - Full book listing with filters and search
3. **About** (`about.html`) - Mission, values, and team information
4. **Contact** (`contact.html`) - Contact form and information
5. **Checkout** (`checkout.html`) - Multi-step checkout process
6. **Privacy Policy** (`privacy.html`) - GDPR-compliant privacy policy
7. **Terms of Service** (`terms.html`) - Legal terms and conditions

## 🚀 Quick Start

### 1. Fork or Clone Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/literary-haven.git

# Navigate to directory
cd literary-haven
```

### 2. Customize Your Content

#### Update Book Data
Edit `js/books-data.js` to add your own books:

```javascript
{
    id: 1,
    title: "Your Book Title",
    author: "Author Name",
    category: "fiction", // fiction, nonfiction, mystery, scifi, etc.
    price: 19.99,
    description: "Book description...",
    cover: "📚", // Use emoji or update to use actual images
    featured: true,
    rating: 4.8
}
```

#### Update Site Information
1. **_config.yml**: Update site title, description, and URL
2. **Contact Information**: Search for "hello@literaryhaven.com" and update throughout
3. **Social Links**: Update social media URLs in footer
4. **About Page**: Customize your story in `about.html`

### 3. Deploy to GitHub Pages

#### Method 1: GitHub Interface
1. Go to your repository on GitHub
2. Click **Settings**
3. Navigate to **Pages** in the left sidebar
4. Under **Source**, select `main` branch and `/ (root)` folder
5. Click **Save**
6. Your site will be published at `https://yourusername.github.io/repository-name`

#### Method 2: Command Line
```bash
# Add files to git
git add .

# Commit changes
git commit -m "Initial commit: Literary Haven book store"

# Push to GitHub
git push origin main

# Enable GitHub Pages via repository settings
```

## 🎨 Customization Guide

### Colors
Edit CSS variables in `css/styles.css`:

```css
:root {
    --primary: #2c1810;      /* Main brand color */
    --secondary: #8b4513;     /* Secondary brand color */
    --accent: #d4af37;        /* Accent color */
    --bg-primary: #faf8f4;    /* Background color */
    /* ... more variables */
}
```

### Fonts
Current fonts: Cormorant Garamond (display) and Lato (body)

To change fonts, update the Google Fonts import in HTML files:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

And update CSS variables:
```css
--font-display: 'YourDisplayFont', serif;
--font-body: 'YourBodyFont', sans-serif;
```

### Book Covers
Replace emoji placeholders with actual images:

1. Add images to `images/` folder
2. Update book data:
```javascript
cover: "images/book-cover-1.jpg"
```

3. Update CSS in book card:
```css
.book-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

## 💳 Payment Integration

### Stripe Integration

1. **Create Stripe Account**
   - Sign up at [stripe.com](https://stripe.com)
   - Get your API keys from the Dashboard

2. **Option A: Stripe Payment Links** (Easiest for Static Sites)
   ```javascript
   // In checkout.js, replace the demo with:
   function handleStripePayment() {
       // Create payment link in Stripe Dashboard
       // Redirect to your payment link
       window.location.href = 'https://buy.stripe.com/your-payment-link';
   }
   ```

3. **Option B: Stripe Checkout** (Requires Backend)
   - Set up a simple backend (Netlify Functions, Vercel, etc.)
   - Create checkout sessions via Stripe API
   - Handle webhooks for order confirmation

### PayPal Integration

1. **Create PayPal Business Account**
   - Sign up at [paypal.com/business](https://www.paypal.com/business)
   - Get API credentials from Developer Portal

2. **Add PayPal Buttons**
   ```html
   <!-- Add to checkout.html -->
   <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>
   
   <script>
   paypal.Buttons({
       createOrder: function(data, actions) {
           return actions.order.create({
               purchase_units: [{
                   amount: { value: totalAmount }
               }]
           });
       },
       onApprove: function(data, actions) {
           return actions.order.capture().then(function(details) {
               completeOrder();
           });
       }
   }).render('#paypal-button-container');
   </script>
   ```

### Alternative: Buy Now Buttons

For simple implementation, use:
- **Stripe Payment Links**: Create in Stripe Dashboard
- **PayPal Buy Now Buttons**: Generate at PayPal
- **Gumroad**: Easy digital product sales

## 📊 Analytics Setup

### Google Analytics

1. Get tracking ID from [Google Analytics](https://analytics.google.com)
2. Add to `_config.yml`:
   ```yaml
   google_analytics: UA-XXXXXXXXX-X
   ```
3. Or add directly to HTML:
   ```html
   <!-- Add before </head> -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

## 🔧 Advanced Features

### Adding Newsletter Integration

Integrate with Mailchimp, ConvertKit, or similar:

```javascript
// In main.js, update setupNewsletterForm()
function setupNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        // Send to your email service API
        await fetch('YOUR_API_ENDPOINT', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' }
        });
    });
}
```

### Adding Search Functionality

Already included! The catalog page has:
- Real-time search
- Category filters
- Price range filters
- Sort options

### Adding Blog/News Section

Create a `blog.html` page and add posts in a similar structure to the book cards.

## 🌐 Custom Domain Setup

1. **Purchase Domain**: From Namecheap, GoDaddy, etc.
2. **Configure DNS**:
   - Add CNAME record: `www` → `yourusername.github.io`
   - Add A records for apex domain:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
3. **Update GitHub Settings**:
   - Go to repository Settings → Pages
   - Add your custom domain
   - Enable "Enforce HTTPS"

## 📱 Mobile Optimization

The site is fully responsive with breakpoints at:
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

Test on multiple devices and use browser DevTools for responsive testing.

## 🐛 Troubleshooting

### Site Not Loading on GitHub Pages
- Check that `index.html` is in the root directory
- Verify branch settings in GitHub Pages configuration
- Wait 5-10 minutes after initial deployment

### Cart Not Persisting
- Ensure browser allows localStorage
- Check browser console for errors
- Clear cache and test again

### Styles Not Loading
- Check that CSS file paths are correct
- Verify files are committed to repository
- Check browser console for 404 errors

## 📄 License

This project is available for personal and commercial use. Attribution appreciated but not required.

## 🤝 Support & Contributing

- **Issues**: Report bugs or request features via GitHub Issues
- **Contributions**: Pull requests welcome!
- **Questions**: Open a discussion in GitHub Discussions

## 🎯 Next Steps

1. ✅ Customize content and styling
2. ✅ Add your book catalog
3. ✅ Set up payment processing
4. ✅ Configure analytics
5. ✅ Add custom domain (optional)
6. ✅ Launch and promote!

## 📚 Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Stripe Documentation](https://stripe.com/docs)
- [PayPal Developer Docs](https://developer.paypal.com/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Built with ❤️ for book lovers**

Need help? Feel free to reach out or open an issue!
