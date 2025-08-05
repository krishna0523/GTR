# Form Email Setup Guide

## Current Status
✅ Form submission code updated to send emails to office@gtrinfra.com
❌ **Action Required**: Complete form service setup

## Setup Options

### Option 1: Formspree (Recommended - Free & Easy)

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

### Option 2: Netlify Forms (If using Netlify hosting)

1. **Add form attributes to HTML forms**:
   ```html
   <form name="contact" method="POST" data-netlify="true">
   ```

2. **Update fetch URLs**:
   ```javascript
   const response = await fetch('/', {
     method: 'POST',
     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
     body: encode({ 'form-name': 'contact', ...formData })
   });
   ```

### Option 3: EmailJS (Client-side solution)

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

## Support

If you need help with setup, contact the development team or refer to:
- Formspree docs: https://help.formspree.io/
- Netlify forms: https://docs.netlify.com/forms/
- EmailJS docs: https://www.emailjs.com/docs/