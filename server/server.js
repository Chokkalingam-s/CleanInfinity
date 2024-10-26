const express = require('express');
const bcrypt = require('bcrypt'); 
const Users = require('./models/Users'); 
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Sign Up API
app.post('/signup', async (req, res) => {
  const { name, mobile, email, address, state, district, ward, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
      name,
      mobileNumber: mobile,
      mailId: email,
      address,
      state,
      district,
      ward,
      password: hashedPassword, // Store hashed password
    });

    res.status(201).send('User registered successfully');
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
    // Find the user by mobile number
    const user = await Users.findOne({ where: { mobileNumber: mobile } });

    if (!user) {
      return res.status(401).send('User not found');
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.status(200).send('Authenticated successfully');
    } else {
      res.status(401).send('Incorrect password');
    }
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
