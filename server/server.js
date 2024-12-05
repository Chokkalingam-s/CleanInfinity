const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); 
const Users = require('./models/Users'); 
const PingMe = require('./models/pingMe');
const Activity = require('./models/activity');
const Notification = require('./models/notify');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const sequelize = require('./models/db'); 
const { Op } = require('sequelize');


const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: "*",methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],  
}));

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload = multer({ storage });

const storageActivity = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploadsActivity';
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir); 
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueFilename = Date.now() + path.extname(file.originalname); +
    cb(null, uniqueFilename);
  },
});

const uploadActivity = multer({ storage: storageActivity });
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}
if (!fs.existsSync('uploadsActivity')) {
  fs.mkdirSync('uploadsActivity');
}

app.get('/', (req, res) => {
  res.send('Server is running...');
});

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
      password: hashedPassword,
      mappedMobileNumber: mobile,
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
    
    req.mobile = decoded.mobile; 
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

app.post('/pingme', authenticateToken, upload.array('images', 5), async (req, res) => {
  const { subject, description } = req.body;
  const imagePaths = req.files.map(file => file.path); 

  try {
    const user = await Users.findOne({ where: { mobileNumber: req.mobile } });
    if (!user) return res.status(404).send('User not found');

    await PingMe.create({
      name: user.name,
      phoneNumber: user.mobileNumber,
      state: user.state,
      district: user.district,
      ward: user.ward,
      subject,
      description,
      images: JSON.stringify(imagePaths), 
    });

    res.status(201).json({ message: 'Ping Me request stored successfully' });
  } catch (error) {
    console.error('Error storing Ping Me data:', error);
    res.status(500).send('Server error');
  }
});

app.get("/pingme", async (req, res) => {
  try {
    const requests = await PingMe.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(requests);
  } catch (error) {
    console.error("Error fetching PingMe data:", error);
    res.status(500).send("Server error");
  }
});

app.post('/activity', authenticateToken, uploadActivity.single('image'), async (req, res) => {
  const { description } = req.body;
  const imagePath = req.file ? req.file.path : null;

  try {
    const user = await Users.findOne({ where: { mobileNumber: req.mobile } });
    if (!user) return res.status(404).send('User not found');

    const newActivity = await Activity.create({
      name: user.name,
      state: user.state,
      district: user.district,
      ward: user.ward,
      description,
      image: imagePath,
      likes: 0,
    });

    res.status(201).json(newActivity);
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).send('Error creating activity');
  }
});
app.use('/uploadsActivity', express.static(path.join(__dirname, 'uploadsActivity')));

app.get('/activity', async (req, res) => {
  try {
    const activities = await Activity.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Server error');
  }
});


app.get('/api/notifications', async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/notifications', async (req, res) => {
  const { title, message } = req.body;
  const dateObj = new Date();
  const time = dateObj.toTimeString().split(' ')[0];
  const date = dateObj.toISOString().split('T')[0];
  const month = dateObj.toLocaleString('default', { month: 'long' });
  const year = dateObj.getFullYear();

  try {
    const newNotification = await Notification.create({ title, message, time, date, month, year });
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/latest-notification', async (req, res) => {
  try {
    const latestNotification = await Notification.findOne({
      order: [['id', 'DESC']], 
    });
    res.json(latestNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.delete('/activity/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await Activity.destroy({
      where: { id },
    });

    if (deletedRows === 0) {
      return res.status(404).send('Post not found');
    }

    res.status(200).send('Post deleted successfully');
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).send('Error deleting post');
  }
});

app.post("/adminLogin", (req, res) => {
  const { state, district, ward, password } = req.body;

  const stateInitial = state.charAt(0).toUpperCase();
  const districtInitial = district.charAt(0).toUpperCase();
  const expectedPassword = `CleanInfinity${stateInitial}${districtInitial}`;

  if (password === expectedPassword) {
    const token = jwt.sign(
      { state, district, ward },
      "your_secret_key", 
      { expiresIn: "1h" }
    );
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid password" });
  }
});

app.get("/api/wardDetails", async (req, res) => {
  const { state, district, ward } = req.query;

  try {
    const wardDetails = await Users.findAll({
      where: { state, district, ward },
    });

    if (!wardDetails) {
      return res.status(404).json({ message: "Ward details not found" });
    }

    res.json({ detailsOfWards: wardDetails.map(w => w.info) });
  } catch (error) {
    console.error("Error fetching ward details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/leaderboard", async (req, res) => {
  const { state, district, ward } = req.query;

  try {
    const users = await Users.findAll({
      where: { state, district, ward },
      attributes: ["name", "credits"],
      order: [["credits", "DESC"]],
    });

    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }
    const leaderboard = users.map(user => ({
      name: user.name,
      score: user.credits, 
    }));
    res.json({
      leaderboard:  leaderboard,
      totalUsers: users.length,
    });
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/state-progress", async (req, res) => {
  const { state } = req.query;

  try {
     const progressData = await Users.findAll({
      where: { state },
      attributes: [
        "district",
        "ward",
        [sequelize.fn("SUM", sequelize.col("credits")), "totalCredits"],
      ],
      group: ["district", "ward"],
      order: [["district", "ASC"], ["ward", "ASC"]],
    });

    if (!progressData.length) {
      return res.status(404).json({ message: "No data found for the state" });
    }

    const leaderboard = progressData.map(row => ({
      name: `${row.district}-${row.ward}`, 
      score: row.getDataValue("totalCredits"), 
    }));

    res.json({ leaderboard });
  } catch (error) {
    console.error("Error fetching state progress data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post('/process-nfc', async (req, res) => {
  const { nfcUid } = req.body;

  try {
    const existingUser = await Users.findOne({
      where: {
        [Op.or]: [
          { nfcDId: nfcUid },
          { nfcNDId: nfcUid }
        ]
      }
    });

    if (existingUser) {
      const now = new Date();
      let pointsUpdated = false;

      // Check if the NFC UID matches nfcDId
      if (existingUser.nfcDId === nfcUid) {
        if (!existingUser.lastNfcDUpdate || (now - existingUser.lastNfcDUpdate) >= 12 * 60 * 60 * 1000) {
          existingUser.nfcDPoints += 1;
          existingUser.credits += 1;
          existingUser.lastNfcDUpdate = now;
          pointsUpdated = true;
        }
      } 
      // Check if the NFC UID matches nfcNDId
      else if (existingUser.nfcNDId === nfcUid) {
        if (!existingUser.lastNfcNDUpdate || (now - existingUser.lastNfcNDUpdate) >= 12 * 60 * 60 * 1000) {
          existingUser.nfcNDPoints += 1;
          existingUser.credits += 1;
          existingUser.lastNfcNDUpdate = now;
          pointsUpdated = true;
        }
      }

      if (pointsUpdated) {
        await existingUser.save();
        return res.status(200).send('Points and credits updated successfully.');
      } else {
        return res.status(400).send('Points can only be updated once every 12 hours.');
      }
    } else {
      const latestUser = await Users.findOne({
        order: [['createdAt', 'DESC']]
      });

      if (latestUser) {
        if (!latestUser.nfcDId) {
          latestUser.nfcDId = nfcUid;
        } else if (!latestUser.nfcNDId) {
          latestUser.nfcNDId = nfcUid;
        } else {
          return res.status(400).send('No available fields to store the NFC UID.');
        }
        await latestUser.save();
        return res.status(201).send('NFC UID added successfully.');
      } else {
        return res.status(404).send('No users found to assign NFC UID.');
      }
    }
  } catch (error) {
    console.error('Error processing NFC UID:', error);
    res.status(500).send('Server error.');
  }
});


app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});