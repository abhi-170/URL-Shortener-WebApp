import React, { useState } from 'react';
import axios from 'axios';
import './UrlShortener.css';

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleShorten = async () => {
    if (!longUrl.trim()) return;
    setLoading(true);
    setError('');
    setShortUrl('');

    try {
      const response = await axios.post('https://trimnet.onrender.com/api/shorten',{url:longUrl});
      const data=response.data;
      const shortUrl=data.shortURL;
      if (shortUrl) {
        setShortUrl(shortUrl);
      } else {
        setError('Failed to generate short URL.');
      }
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('Copied!');
  };

  return (
    <div className="url-container">
      <h1>URL Shortener</h1>
      <input
        type="text"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Enter long URL"
      />
      <button onClick={handleShorten} disabled={loading}>
        {loading ? 'Shortening...' : 'Shorten URL'}
      </button>

      {shortUrl && (
        <div className="result">
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
          <button onClick={copyToClipboard}>Copy</button>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default UrlShortener;
