// Vercel Serverless Function for Careers Form
// To use this, install: npm install nodemailer multer

import nodemailer from 'nodemailer';
import multer from 'multer';

// Configure multer for file uploads
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      fullName,
      email,
      phone,
      position,
      experience,
      education,
      currentLocation,
      availability,
      expectedSalary,
      coverLetter,
      portfolio,
    } = req.body;

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'office@gtrinfra.com',
      subject: `Job Application: ${position} - ${fullName}`,
      replyTo: email,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Education:</strong> ${education}</p>
        <p><strong>Location:</strong> ${currentLocation}</p>
        <p><strong>Availability:</strong> ${availability}</p>
        <p><strong>Expected Salary:</strong> ${expectedSalary || 'Not specified'}</p>
        <p><strong>Portfolio:</strong> ${portfolio || 'Not provided'}</p>
        <p><strong>Cover Letter:</strong></p>
        <p>${coverLetter}</p>
      `,
      // Note: File attachment handling would need additional multipart form handling
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Application sent successfully' });
  } catch (error) {
    console.error('Error sending application:', error);
    res.status(500).json({ message: 'Error sending application' });
  }
}

// Required for Vercel to handle file uploads
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
};