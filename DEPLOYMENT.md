# 🚀 Deployment Guide for Literary Haven

This guide will walk you through deploying your book store to GitHub Pages step-by-step.

## Prerequisites

- GitHub account (free)
- Git installed on your computer
- Basic familiarity with command line (optional)

## Step-by-Step Deployment

### Step 1: Create GitHub Repository

#### Option A: Using GitHub Website
1. Go to [github.com](https://github.com) and log in
2. Click the **+** icon in top right → **New repository**
3. Name your repository (e.g., "literary-haven" or "bookstore")
4. Choose **Public** (required for free GitHub Pages)
5. Do NOT initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

#### Option B: Using GitHub CLI
```bash
gh repo create literary-haven --public --source=. --remote=origin
```

### Step 2: Prepare Your Files

1. Download/copy all website files to a folder on your computer
2. Ensure the folder structure looks like this:
   ```
   literary-haven/
   ├── index.html
   ├── catalog.html
   ├── about.html
   ├── contact.html
   ├── checkout.html
   ├── privacy.html
   ├── terms.html
   ├── _config.yml
   ├── README.md
   ├── .gitignore
   ├── css/
   │   └── styles.css
   ├── js/
   │   ├── books-data.js
   │   ├── cart.js
   │   ├── main.js
   │   ├── catalog.js
   │   ├── contact.js
   │   └── checkout.js
   └── images/
       └── (your book covers)
   ```

### Step 3: Initialize Git Repository

Open terminal/command prompt in your project folder:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Literary Haven book store"

# Add remote repository (replace with your URL)
git remote add origin https://github.com/yourusername/literary-haven.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

#### Using GitHub Website:
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down and click **Pages** in left sidebar
4. Under **Source**:
   - Select branch: **main**
   - Select folder: **/ (root)**
5. Click **Save**

#### Result:
- GitHub will process your site (takes 1-5 minutes)
- You'll see a message: "Your site is published at https://yourusername.github.io/repository-name"

### Step 5: Verify Deployment

1. Wait 2-5 minutes for initial build
2. Visit your site URL: `https://yourusername.github.io/repository-name`
3. Check all pages load correctly:
   - Homepage
   - Catalog
   - About
   - Contact
   - Checkout

### Step 6: Configure Custom Domain (Optional)

#### If you have a custom domain:

1. **Add CNAME file to repository:**
   ```bash
   # Create CNAME file
   echo "www.yourdomain.com" > CNAME
   
   # Commit and push
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

2. **Configure DNS at your domain registrar:**
   - Add CNAME record: `www` → `yourusername.github.io`
   - Add A records for apex domain:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. **Update GitHub Pages settings:**
   - Go to Settings → Pages
   - Enter your custom domain
   - Check "Enforce HTTPS"

## Customization Before Launch

### Essential Updates

1. **Update Site Information in _config.yml:**
   ```yaml
   title: Your Store Name
   description: Your store description
   url: "https://yourusername.github.io"
   ```

2. **Update Contact Information:**
   - Search for "literaryhaven.com" and replace throughout
   - Update email addresses in all pages
   - Update phone numbers and addresses

3. **Add Your Books:**
   - Edit `js/books-data.js`
   - Add your book data
   - Update cover images

4. **Customize Colors:**
   - Edit CSS variables in `css/styles.css`
   - Update color scheme to match your brand

5. **Update Legal Pages:**
   - Customize `privacy.html` with your policies
   - Update `terms.html` with your terms
   - Add your business information

### Testing Checklist

Before going live, test:

- [ ] All navigation links work
- [ ] Book catalog displays correctly
- [ ] Search and filters function properly
- [ ] Cart adds/removes items
- [ ] Cart persists on page reload
- [ ] Checkout form validates
- [ ] All pages are mobile responsive
- [ ] Contact form displays properly
- [ ] All images load correctly
- [ ] No console errors in browser

## Making Updates After Launch

### Quick Updates via GitHub Website

1. Go to your repository on GitHub
2. Navigate to file you want to edit
3. Click pencil icon (Edit)
4. Make changes
5. Scroll down and commit changes
6. Changes will be live in 1-2 minutes

### Updates via Git

```bash
# Make your changes to files

# Stage changes
git add .

# Commit with descriptive message
git commit -m "Update book prices and add new titles"

# Push to GitHub
git push

# Wait 1-2 minutes for changes to deploy
```

## Setting Up Analytics

### Google Analytics

1. Create account at [analytics.google.com](https://analytics.google.com)
2. Get your tracking ID (GA4 Measurement ID)
3. Add to all HTML pages before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Setting Up Payment Processing

### Stripe Setup

1. **Create Stripe Account**
   - Go to [stripe.com](https://stripe.com)
   - Complete business verification

2. **Create Payment Links** (Easiest for static sites)
   - Go to Stripe Dashboard → Payment Links
   - Create link for each book or price point
   - Copy payment link URL

3. **Update Checkout**
   ```javascript
   // In checkout.js
   function handleStripePayment() {
       const items = cart.items;
       // Redirect to appropriate Stripe payment link
       window.location.href = 'https://buy.stripe.com/your-link';
   }
   ```

### PayPal Setup

1. **Create Business Account**
   - Sign up at [paypal.com/business](https://www.paypal.com/business)
   - Complete verification

2. **Get API Credentials**
   - Go to Developer Dashboard
   - Create app and get Client ID

3. **Add PayPal Buttons**
   - Follow integration guide in README.md
   - Test in sandbox mode first

## Troubleshooting

### Site Not Loading

**Problem:** 404 error when visiting site URL

**Solutions:**
- Verify `index.html` is in root directory
- Check GitHub Pages is enabled in Settings
- Wait 5-10 minutes after enabling Pages
- Clear browser cache

### Images Not Loading

**Problem:** Broken image icons

**Solutions:**
- Check image file paths are correct
- Verify images are committed to repository
- Use relative paths (e.g., `images/book.jpg` not `/images/book.jpg`)
- Check image file names match exactly (case-sensitive)

### Styles Not Applied

**Problem:** Site looks unstyled

**Solutions:**
- Verify `css/styles.css` is in repository
- Check CSS link in HTML: `<link rel="stylesheet" href="css/styles.css">`
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for errors

### Cart Not Working

**Problem:** Items don't stay in cart

**Solutions:**
- Check browser allows localStorage
- Test in different browser
- Open browser console and check for JavaScript errors
- Ensure all JavaScript files are loaded

## Security Best Practices

1. **Never commit sensitive data:**
   - API keys
   - Passwords
   - Customer information

2. **Use environment variables for secrets:**
   - Store in external services (Netlify, Vercel)
   - Never in client-side code for static sites

3. **Keep dependencies updated:**
   - Regularly check for updates
   - Test after updates

4. **Enable HTTPS:**
   - Always use "Enforce HTTPS" in GitHub Pages settings
   - Required for secure payments

## Performance Optimization

### Image Optimization
- Compress images before uploading
- Use appropriate image formats (WebP for modern browsers)
- Implement lazy loading for images

### Minification (Optional)
For faster loading, minify CSS and JavaScript:
- Use online tools or build scripts
- Keep unminified versions for development

### Caching
- GitHub Pages automatically handles caching
- Set appropriate cache headers if using custom domain with CDN

## Getting Help

### Resources
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Community Forum](https://github.community)
- [Stack Overflow](https://stackoverflow.com)

### Common Issues
- Check README.md for solutions
- Search GitHub Issues
- Ask in repository Discussions

## Launch Checklist

Before announcing your store:

- [ ] All content is finalized
- [ ] Payment processing is set up and tested
- [ ] Contact information is correct
- [ ] Legal pages are complete and accurate
- [ ] Analytics are configured
- [ ] Site tested on multiple devices
- [ ] All links work correctly
- [ ] SEO meta tags are updated
- [ ] Custom domain configured (if applicable)
- [ ] Backup of all content created

## Post-Launch

1. **Monitor Analytics**
   - Track visitor behavior
   - Identify popular books
   - Optimize based on data

2. **Collect Feedback**
   - Add feedback form
   - Monitor customer inquiries
   - Iterate based on user needs

3. **Regular Updates**
   - Add new books regularly
   - Update content seasonally
   - Keep policies current

4. **Marketing**
   - Share on social media
   - Consider email marketing
   - Engage with book communities

---

**Congratulations!** You're ready to launch your book store! 🎉

For additional support, refer to the main README.md or open an issue in the repository.
