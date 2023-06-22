const express = require('express');
const app = express();

// Sample data
const tips = [
  {
    id: 1,
    title: 'Trust Your Instincts',
    description: 'Always trust your instincts. If something feels off or uncomfortable, remove yourself from the situation.',
    category: 'General',
  },
  {
    id: 2,
    title: 'Stay Aware of Your Surroundings',
    description: 'Be mindful of your surroundings at all times. Avoid distractions and stay alert to potential risks.',
    category: 'General',
  },
  {
    id: 3,
    title: 'Use Strong and Unique Passwords',
    description: 'Create strong and unique passwords for your online accounts to prevent unauthorized access.',
    category: 'Digital Safety',
  },
  {
    id: 4,
    title: 'Keep Your Personal Information Secure',
    description: 'Be cautious about sharing your personal information online or with strangers. Protect your identity and privacy.',
    category: 'Digital Safety',
  },
  {
    id: 5,
    title: 'Learn Self-Defense Techniques',
    description: 'Consider learning self-defense techniques to empower yourself and increase your confidence in personal safety.',
    category: 'Physical Safety',
  },
  // Add more tips here
];

// Set up a route for the home page
app.get('/', (req, res) => {
  res.send('Welcome to the Female Safety Tips API');
});

app.get('/tips', (req, res) => {
  res.json(tips);
});

app.get('/tips/:id', (req, res) => {
  const tipId = parseInt(req.params.id);
  const tip = tips.find((tip) => tip.id === tipId);

  if (tip) {
    res.json(tip);
  } else {
    res.status(404).json({ message: 'Tip not found' });
  }
});

app.get('/tips/search', (req, res) => {
  const searchTerm = req.query.q; // Get the search term from the query parameter
  const category = req.query.category; // Get the category from the query parameter

  let filteredTips = tips;

  if (searchTerm) {
    filteredTips = filteredTips.filter((tip) =>
      tip.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (category) {
    filteredTips = filteredTips.filter(
      (tip) => tip.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (filteredTips.length > 0) {
    res.json(filteredTips);
  } else {
    res.status(404).json({ message: 'No tips found for the search criteria' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
