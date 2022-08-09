// Declare variables
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const gameEntry = require('./models/game');
require('dotenv').config();

const app = express();

// Set middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// app.use(express.json())
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () => {
  console.log('Connected to database..');
});

app.get('/', async (request, response) => {
  try {
    gameEntry.find({}, (err, entries) => {
      response.render('index.ejs', {
        gameList: entries,
      });
    });
  } catch (err) {
    response.status(500).send({ message: err.message });
  }
});

app.post('/', async (request, response) => {
  const gameTitle = request.body.title;
  const newEntry = new gameEntry({
    title: request.body.title,
    status: request.body.status,
  });
  try {
    gameEntry.find({ title: gameTitle }, (err, data) => {
      if (err) {
        response.status(500).send({ message: err.message });
      }
      if (data.length > 0) {
        console.log('already exist');
        response.redirect('/');
        return;
      }
      newEntry.save();
      console.log(newEntry);
      response.redirect('/');
    });
  } catch (err) {
    response.status(500).send({ message: err.message });
  }
});

app.route('/update/:status/:id').get((request, response) => {
  const { id } = request.params;
  const { status } = request.params;
  gameEntry.findByIdAndUpdate(
    id,
    {
      status: status,
    },
    (err) => {
      if (err) return response.status(500).send(err);
      response.redirect('/');
    }
  );
});
// Edit game title
app
  .route('/edit/:id')
  .get((request, response) => {
    const { id } = request.params;
    gameEntry.find({}, (error, entries) => {
      response.render('edit.ejs', {
        gameList: entries,
        idGame: id,
      });
    });
  })
  .post((request, response) => {
    const { id } = request.params;
    gameEntry.findByIdAndUpdate(
      id,
      {
        title: request.body.title,
        status: request.body.status,
      },
      (err) => {
        if (err) return response.status(500).send(err);
        response.redirect('/');
      }
    );
  });

// Delete game entry
app.route('/remove/:id').get((request, response) => {
  const { id } = request.params;
  gameEntry.findByIdAndRemove(id, (err) => {
    if (err) return response.status(500).send(err);
    response.redirect('/');
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
