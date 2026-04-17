import React, { useState } from 'react';
import './App.css';

function App() {
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const postToFacebook = async () => {
    if (!link || !description) {
      setMessage('Please enter both link and description');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5001/post/facebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link, description }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Posted to Facebook successfully!');
        setLink('');
        setDescription('');
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`❌ Network error: ${error.message}`);
    }

    setLoading(false);
  };

  const postToTwitter = async () => {
    if (!link || !description) {
      setMessage('Please enter both link and description');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5001/post/twitter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link, description }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Posted to Twitter successfully!');
        setLink('');
        setDescription('');
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`❌ Network error: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Social Media Poster</h1>
        <p>Post your content to Facebook and Twitter</p>
        
        <div className="form">
          <div className="input-group">
            <label htmlFor="link">Link:</label>
            <input
              type="url"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://example.com"
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your post description here..."
              rows="4"
              disabled={loading}
            />
          </div>

          <div className="buttons">
            <button 
              onClick={postToFacebook}
              disabled={loading}
              className="facebook-btn"
            >
              {loading ? 'Posting...' : 'Post to Facebook'}
            </button>
            
            <button 
              onClick={postToTwitter}
              disabled={loading}
              className="twitter-btn"
            >
              {loading ? 'Posting...' : 'Post to Twitter'}
            </button>
          </div>

          {message && (
            <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;