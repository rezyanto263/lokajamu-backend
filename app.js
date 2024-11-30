require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const userRoutes = require('./src/routes/userRoute');
app.use('/api/users', userRoutes);

const spiceRoutes = require('./src/routes/spiceRoute');
app.use('/api/spices', spiceRoutes);

db.getConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Database Error: ${err.message}`);
  });
