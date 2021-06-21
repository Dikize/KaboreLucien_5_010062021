const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config()
// import dotenv from 'dotenv';
// dotenv.config()

const cameraRoutes = require('./routes/camera');
const teddyRoutes = require('./routes/teddy');
const furnitureRoutes = require('./routes/furniture');

const app = express();

mongoose.connect(
  process.env.MONGODB, 
  { useNewUrlParser: true })
  .then(() => {
    console.log('Connecté avec succès à Mongodb Atlas!');
  })
  .catch((error) => {
    console.log('Impossible de se connecter à Mongodb Atlas!');
    console.error(error);
  });
  
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/cameras', cameraRoutes);
app.use('/api/teddies', teddyRoutes);
app.use('/api/furniture', furnitureRoutes);

module.exports = app;
