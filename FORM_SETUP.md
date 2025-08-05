# Form Email Setup Guide for Vercel Hosting

## Current Status
✅ Form submission code updated to send emails to office@gtrinfra.com
✅ Optimized for Vercel hosting
❌ **Action Required**: Complete form service setup

## Setup Options for Vercel

### Option 1: Formspree (Recommended - Immediate Solution)

1. **Create Formspree Account**:
   - Go to https://formspree.io/
   - Sign up with office@gtrinfra.com email
   - Verify your email

2. **Create Form Endpoints**:
   - Create a form endpoint for Contact Form
   - Create a form endpoint for Careers Form
   - Copy the form IDs (they look like: `xpzkgqbo`)

3. **Update Form URLs**:
   Replace in both ContactSection.tsx and CareersSection.tsx:
   ```javascript
   // FROM:
   'https://formspree.io/f/office@gtrinfra.com'
   
   // TO:
   'https://formspree.io/f/YOUR_FORM_ID'
   ```

### Option 2: Vercel Serverless Functions (Advanced)

1. **Create API endpoints**:
   ```bash
   # Create api/contact.js and api/careers.js in your project
   ```

2. **Install dependencies**:
   ```bash
   npm install nodemailer
   ```

3. **Update form URLs to use your API**:
   ```javascript
   const response = await fetch('/api/contact', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formData)
   });
   ```

### Option 3: Web3Forms (Vercel-Optimized, Free)

1. **Get API Key**:
   - Go to https://web3forms.com/
   - Sign up and get your access key
   - No email verification needed

2. **Update form URLs**:
   ```javascript
   const response = await fetch('https://api.web3forms.com/submit', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       access_key: 'YOUR_ACCESS_KEY',
       email: 'office@gtrinfra.com',
       ...formData
     })
   });
   ```

### Option 4: EmailJS (Client-side solution)

1. **Install EmailJS**:
   ```bash
   npm install @emailjs/browser
   ```

2. **Setup EmailJS account and get keys**

3. **Update form submission logic**

## Current Implementation

The forms now include:
- ✅ Proper error handling
- ✅ Loading states
- ✅ Form validation
- ✅ File upload support (careers form)
- ✅ Custom email subjects
- ✅ Reply-to email setup

## Testing

After setup, test both forms:
1. Contact form with project inquiry
2. Careers form with resume upload

Submissions should appear in office@gtrinfra.com inbox.

## Vercel-Specific Recommendations

Since you're using Vercel hosting:

### Quick Start (5 minutes):
1. **Use Formspree** - Works immediately with Vercel, no configuration needed
2. **Alternative**: Web3Forms - Also works great with static deployments

### Production Setup:
1. **Formspree Pro** - For high volume (>50 submissions/month)
2. **Vercel Functions** - For complete control and custom logic

### Vercel Environment Variables

For any service requiring API keys, add them in Vercel dashboard:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add your API keys (e.g., `FORMSPREE_API_KEY`, `WEB3FORMS_ACCESS_KEY`)
3. Reference in your code: `process.env.FORMSPREE_API_KEY`

## Deployment Notes

✅ Current forms will work immediately after service setup
✅ No additional Vercel configuration needed
✅ Forms are optimized for static deployment
✅ CORS headers properly configured

## Support

If you need help with setup, contact the development team or refer to:
- Formspree docs: https://help.formspree.io/
- Web3Forms docs: https://docs.web3forms.com/
- Vercel Functions: https://vercel.com/docs/functions
- EmailJS docs: https://www.emailjs.com/docs/