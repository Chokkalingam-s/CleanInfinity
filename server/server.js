const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); 
const Users = require('./models/Users'); 
const cors = require('cors');

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.post('/signup', async (req, res) => {
  const { name, mobile, email, address, state, district, ward, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const nfcDId = mobile + '0';
    const nfcNDId = mobile + '1';

    const newUser = await Users.create({
      name,
      mobileNumber: mobile,
      mailId: email,
      address,
      state,
      district,
      ward,
      password: hashedPassword,
      mappedMobileNumber: mobile,
      nfcDId: nfcDId,
      nfcNDId: nfcNDId,
    });
    const token = jwt.sign({ mobile: newUser.mobileNumber, email: newUser.mailId }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error during signup:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).send('User with this email or mobile number already exists');
    } else {
      res.status(500).send(`Server error: ${error.message}`);
    }
  }
});



// Sign In API
app.post('/signin', async (req, res) => {
  const { mobile, password } = req.body;

  try {
    const user = await Users.findOne({ where: { mobileNumber: mobile } });

    if (!user) {
      return res.status(401).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ mobile: user.mobileNumber, email: user.mailId }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Authenticated successfully', token });
    } else {
      res.status(401).send('Incorrect password');
    }
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).send('Server error');
  }
});
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/send-otp', (req, res) => {
  const email = req.body.email;
  const otp = crypto.randomBytes(3).toString('hex').toUpperCase();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Welcome to CleanInfinity - Greener and Sustainable Environment Mission. Your OTP code is ${otp} . Kindly do not share it with others. Thank you! - Team CleanInfinity`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending OTP');
    }
    res.status(200).send({ otp });
  });
});
app.post('/verify-otp', (req, res) => {
  const { enteredOtp, generatedOtp } = req.body;
  if (enteredOtp.toUpperCase() === generatedOtp.toUpperCase()) {
    return res.status(200).send('OTP verified successfully');
  }
  res.status(400).send('OTP verification failed');
});

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).send('Access token is missing');

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) return res.status(403).send('Invalid token');
    
    req.mobile = decoded.mobile; // Add mobile number to the request object
    next();
  });
};


app.get('/get-profile', authenticateToken, async (req, res) => {
  try {
    const user = await Users.findOne({ where: { mobileNumber: req.mobile } });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json({
      id: user.id,
      name: user.name,
      mobileNumber: user.mobileNumber,
      mailId: user.mailId,
      address: user.address,
      state: user.state,
      district: user.district,
      ward: user.ward,
      mappedMobileNumber: user.mappedMobileNumber,
      nfcDId: user.nfcDId,
      nfcNDId: user.nfcNDId,
      credits: user.credits,
      nfcDPoints: user.nfcDPoints,
      nfcNDPoints: user.nfcNDPoints,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).send('Server error');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
