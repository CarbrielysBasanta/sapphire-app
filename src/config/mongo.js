import mongoose from "mongoose";

export async function initMongo() {
  mongoose.set('strictQuery', false);
  return mongoose.connect(process.env.DB_URI, {})
  .then(() => {
    console.log('Sapphire DB initialized');
  })
  .catch((err) => {
    console.log('Error starting database');
    throw err
  })
}

export async function closeMongo() {
  return mongoose.disconnect();
}

;