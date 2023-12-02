const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = 3000;

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Set up Nodemailer for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Set your email address
    pass: 'your-password'        // Set your email password
  }
});

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Define a route for handling form submissions
app.post('/process_certificate', upload.single('certificate'), (req, res) => {
  const { studentEmail } = req.body;

  // Check if the email is valid
  if (!/\S+@\S+\.\S+/.test(studentEmail)) {
    return res.status(400).send('Invalid email format');
  }

  const mailOptions = {
    from: 'your-email@gmail.com',   // Set your email address
    to: studentEmail,
    subject: 'Certificate',
    text: 'Congratulations! Your certificate is attached.',
    attachments: [
      {
        filename: 'certificate.pdf',
        path: 'uploads/' + req.file.filename
      }
    ]
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Error sending certificate');
    }

    console.log('Certificate sent:', info.response);
    res.send('Certificate sent successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});