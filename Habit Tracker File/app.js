const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Habit = require('./models/habit');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/habit-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.get('/', async (req, res) => {
  const habits = await Habit.find();
  res.render('index', { habits });
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', async (req, res) => {
  const habit = new Habit({
    name: req.body.name,
    frequency: req.body.frequency
  });
  await habit.save();
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
