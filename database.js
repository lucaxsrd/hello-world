require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const mongoose = require('mongoose');

const MONGODB_URI = `mongodb+srv://${dbUser}:${dbPassword}@clustermini.8o9abxk.mongodb.net/test?retryWrites=true&w=majority&appName=Clustermini`;

async function connectDB() {
    try {
         console.log(MONGODB_URI); 
         await mongoose.connect(MONGODB_URI);
         console.log('Conectado ao MongoDB.');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
    }
}

module.exports = { connectDB };
