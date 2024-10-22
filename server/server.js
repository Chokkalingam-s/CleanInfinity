const express = require('express');
const app = express();
const Users = require('./models/Users');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
