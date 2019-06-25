console.log('Server-side code running');

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

// serve files from the public directory
app.use(express.static('public'));
let db;
const url =  'mongodb://localhost:27017/myDatabase';
MongoClient.connect(url, (err, database) => {
  if(err) {
    return console.log(err);
  }
  console.log("Connected to Database.");
  
  db = database;
});
// start the express web server listening on 8080
app.listen(8080, () => {
  console.log('listening on 8080.');
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/clicked', (req, res) => {
    const click = {clickTime: new Date()};
    console.log(click);
    console.log(db);
  
    db.collection('clicks').save(click, (err, result) => {
      if (err) {
        return console.log(err);
      }
      console.log('click added to db');
      res.sendStatus(201);
    });
  });

  app.get('/clicks', (req, res) => {

    db.collection('clicks').find().toArray((err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
  });
