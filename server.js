const express = require('express');
const cors = require('cors');
const axios = require('axios');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Facebook posting endpoint
app.post('/post/facebook', async (req, res) => {
  try {
    const { link, description } = req.body;
    
    if (!link || !description) {
      return res.status(400).json({ error: 'Link and description are required' });
    }

    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    if (!accessToken || accessToken === 'your_facebook_access_token_here') {
      return res.status(500).json({ 
        error: 'Facebook access token not configured',
        details: 'Please set up Facebook Developer account and get access token',
        instructions: 'Go to developers.facebook.com → Create App → Get Access Token'
      });
    }

    const message = `${description}\n\n${link}`;
    
    const response = await axios.post(
      `https://graph.facebook.com/me/feed?access_token=${accessToken}`,
      {
        message: message
      }
    );

    res.json({ 
      success: true, 
      message: 'Posted to Facebook successfully!',
      postId: response.data.id 
    });

  } catch (error) {
    console.error('Facebook API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to post to Facebook',
      details: error.response?.data?.error?.message || error.message
    });
  }
});

// Twitter posting endpoint - demo mode
app.post('/post/twitter', async (req, res) => {
  const { link, description } = req.body;
  
  if (!link || !description) {
    return res.status(400).json({ error: 'Link and description are required' });
  }

  // Demo mode - simulate successful posting
  console.log('Demo Twitter Post:', { link, description });
  
  res.json({ 
    success: true, 
    message: 'Demo: Would post to Twitter successfully! (Real API needs proper setup)',
    demo: true
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});