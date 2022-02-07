import mongoose from 'mongoose';

const URI = process.env.MONGODB_URL;

mongoose.connect(`${URI}`, (error) => {
  if (error) throw error;
  console.log('Mongodb connection');
});
