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
    {
      id: 6,
      title: 'Use Two-Factor Authentication',
      description: 'Enable two-factor authentication for your online accounts to add an extra layer of security.',
      category: 'Digital Safety',
    },
    {
      id: 7,
      title: 'Stay Updated with Security Patches',
      description: 'Regularly update your software and devices to ensure you have the latest security patches and bug fixes.',
      category: 'Digital Safety',
    },
    {
      id: 8,
      title: 'Trustworthy Online Shopping',
      description: 'When shopping online, only use reputable websites and ensure the connection is secure (look for "https" in the URL).',
      category: 'Digital Safety',
    },
    {
      id: 9,
      title: 'Share Location with Trusted Individuals',
      description: 'Share your location only with trusted individuals and avoid broadcasting it on public platforms.',
      category: 'Digital Safety',
    },
    {
      id: 10,
      title: 'Be Mindful of Social Media Privacy',
      description: 'Review your social media privacy settings and be cautious about the information you share publicly.',
      category: 'Digital Safety',
    },
    {
      id: 11,
      title: 'Create Strong PINs',
      description: 'Choose strong and unique PINs for your ATM cards, debit cards, and other personal identification numbers.',
      category: 'Digital Safety',
    },
    {
      id: 12,
      title: 'Avoid Walking Alone at Night',
      description: 'Whenever possible, avoid walking alone at night and stick to well-lit and populated areas.',
      category: 'Physical Safety',
    },
    {
      id: 13,
      title: 'Inform Trusted Individuals of Your Plans',
      description: 'When going out alone or on a trip, inform trusted individuals about your plans and expected return time.',
      category: 'General',
    },
    {
      id: 14,
      title: 'Secure Your Home',
      description: 'Take necessary precautions to secure your home, such as installing sturdy locks and an alarm system.',
      category: 'Physical Safety',
    },
    {
      id: 15,
      title: 'Be Cautious of Drink Safety',
      description: 'When in social settings, keep an eye on your drink and never leave it unattended to avoid potential tampering.',
      category: 'General',
    },
    {
      id: 16,
      title: 'Practice Safe Online Shopping',
      description: 'When making online purchases, ensure the website is secure and use reputable payment methods.',
      category: 'Digital Safety',
    },
    {
      id: 17,
      title: 'Carry Pepper Spray or Personal Safety Devices',
      description: 'Consider carrying pepper spray or other personal safety devices for added protection.',
      category: 'Physical Safety',
    },
    {
      id: 18,
      title: 'Regularly Backup Your Important Data',
      description: 'Frequently backup your important files and data to protect against data loss or ransomware attacks.',
      category: 'Digital Safety',
    },
    {
      id: 19,
      title: 'Be Wary of Phone and Email Scams',
      description: 'Beware of phone calls and emails from unknown sources asking for personal information or money.',
      category: 'Digital Safety',
    },
    {
      id: 20,
      title: 'Install Security Cameras',
      description: 'Install security cameras in and around your home to deter potential intruders and provide evidence if needed.',
      category: 'Physical Safety',
    },
    {
      id: 21,
      title: 'Educate Yourself on Cybersecurity',
      description: 'Stay informed about cybersecurity best practices and be aware of common online threats.',
      category: 'Digital Safety',
    },
    {
      id: 22,
      title: 'Avoid Sharing Personal Information on Public Wi-Fi',
      description: 'When using public Wi-Fi networks, avoid accessing or sharing sensitive personal information.',
      category: 'Digital Safety',
    },
    {
      id: 23,
      title: 'Have Emergency Contacts on Speed Dial',
      description: 'Save important emergency contact numbers on your phone for quick access during emergencies.',
      category: 'General',
    },
    {
      id: 24,
      title: 'Carry a Whistle or Personal Alarm',
      description: 'Carry a whistle or personal alarm to attract attention and seek help in case of an emergency.',
      category: 'Physical Safety',
    },
    {
      id: 25,
      title: 'Stay Informed About Local Safety Resources',
      description: 'Familiarize yourself with local safety resources such as helplines, emergency services, and support organizations.',
      category: 'General',
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
