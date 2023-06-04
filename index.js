import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log('Connected to the database.');
    app.listen(PORT, () => {
      console.log(`App running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
