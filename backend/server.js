// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://mohammadraaz:js0R1WzeupZtwpHE@cluster0.9jttv89.mongodb.net/EcomApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// User model
const User = require('./models/User');
const Team = require('./models/Team');

//access static files
app.use(express.static(path.join(__dirname, '../frontend/build')))











// Routes
const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');

app.use('/api/users', userRoutes);
app.use('/api/team', teamRoutes);
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'../frontend/build/index.html'))
})

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
