import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

export const connectDB = async () => {
try {const db = await mongoose.connect(uri);
console.log('base de datos conectada', db.connection.name);
}
 catch (error) {console.log('error al conectar con la base de datos', error.message);}}