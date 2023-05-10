const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', './views');

mongoose.connect('mongodb://0.0.0.0:27017/musica', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected!');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

const cancionesSchema = new mongoose.Schema({
    image:String,
    name: String,
    duration: String,
    artist: String,
    year:String
  });
  
  const Song = mongoose.model('Song', cancionesSchema);

  app.get('/inicio', (req, res) => {
    Song.find().then((canciones) => {
      res.render('index.ejs', { data: canciones });
    }).catch((error) => {
      console.error('Error retrieving canciones:', error);
    });
  });

  app.get('/form', (req, res) => {
    res.render('form.ejs');
  });

  app.post('/guardar', (req, res) => {
    const imagen = req.body.image;
    const nombre = req.body.name;
    const duracion = req.body.duration;
    const artista = req.body.artist;
    const anio = req.body.year;

    const newSong = new Song({
      image:imagen,
      name: nombre,
      duration: duracion,
      artist: artista,
      year:anio
    });
    
    newSong.save().then(() => {
      console.log('New song created!');
    }).catch((error) => {
      console.error('Error creating song:', error);
    });

    res.render('/inicio');
  });


  Song.find().then((canciones) => {
    console.log('Todas las canciones:', canciones);
  }).catch((error) => {
    console.error('Error retrieving canciones:', error);
  });

  // Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Aplicación web dinámica ejecutándose en el puerto 3000');
});
