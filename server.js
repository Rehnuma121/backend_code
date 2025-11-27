const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth/index.js');
const { sequelize } = require('./models/index.js');
const categoryRoutes = require('./routes/category/index.js'); // Import category routes
const heroBannerRoutes = require('./routes/heroBanner/index.js'); // Import hero banner routes
const promoSliderRoutes = require('./routes/promoSlider/index.js')
require('dotenv').config();
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://localhost:8080'
  ],
  methods: 'GET,POST,PUT,PATCH,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/', authRoutes); 
app.use('/api', categoryRoutes);  // Register category routes
app.use('/api', heroBannerRoutes); // Register hero banner routes
app.use('/api', promoSliderRoutes); // << ADD


// Sync database and start server
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Error syncing database:', err));

app.listen(PORT, () => {
  console.log(`Server is running`);
});
