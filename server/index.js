require('dotenv').config();
const app = require('./app');
const connectDB = require('./utils/db');

const PORT = process.env.SERVER ;

connectDB();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
