import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
console.log('aaaa', process.env.MONGODB);
const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;

export { db };
