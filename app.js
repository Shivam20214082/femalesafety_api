const express = require('express');
const mongoose = require('mongoose');

// Create a MongoDB connection
mongoose.connect('mongodb+srv://shivam66jnp:XYPPYf4gyJf5El4O@cluster0.ru4bvi9.mongodb.net/FSW?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// Define a tip schema
const tipSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String
});

// Create a tip model based on the schema
const Tip = mongoose.model('Tip', tipSchema);

const app = express();
app.use(express.json());

// Set up a route for the home page
app.get('/', (req, res) => {
  res.send('Welcome to the Female Safety Tips API');
});

// Get all tips
app.get('/tips', (req, res) => {
  Tip.find()
    .then((tips) => {
      res.json(tips);
    })
    .catch((error) => {
      res.status(500).json({ message: 'An error occurred while fetching the tips', error });
    });
});

// Get a single tip by ID
app.get('/tips/:id', (req, res) => {
  const tipId = req.params.id;

  Tip.findById(tipId)
    .then((tip) => {
      if (tip) {
        res.json(tip);
      } else {
        res.status(404).json({ message: 'Tip not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'An error occurred while fetching the tip', error });
    });
});

// Search tips by title or category
app.get('/tips/search', (req, res) => {
  const searchTerm = req.query.q;
  const category = req.query.category;

  const query = {};

  if (searchTerm) {
    query.title = { $regex: searchTerm, $options: 'i' };
  }

  if (category) {
    query.category = { $regex: category, $options: 'i' };
  }

  Tip.find(query)
    .then((tips) => {
      if (tips.length > 0) {
        res.json(tips);
      } else {
        res.status(404).json({ message: 'No tips found for the search criteria' });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'An error occurred while searching for tips', error });
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});

