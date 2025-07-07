// components/NewsFeed.js
import React from 'react';
import './NewsFeed.css'; // Optional: for styling

const mockArticles = [
  {
    title: "Alphabet's AI Push Could Shake Up Tech Sector",
    url: "https://example.com/article1",
    source: "CNBC",
    image: "https://via.placeholder.com/80",
    publishedAt: "2025-07-07T16:00:00Z"
  },
  {
    title: "Google Unveils New LLM at Developer Conference",
    url: "https://example.com/article2",
    source: "Reuters",
    image: "https://via.placeholder.com/80",
    publishedAt: "2025-07-07T14:30:00Z"
  },
  {
    title: "Why Investors Are Bullish on GOOG",
    url: "https://example.com/article3",
    source: "Bloomberg",
    image: "https://via.placeholder.com/80",
    publishedAt: "2025-07-07T13:00:00Z"
  },
];

function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins} mins ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs} hours ago`;
  return `${Math.floor(diffHrs / 24)} days ago`;
}

function NewsFeed({ stockSymbol = "GOOG" }) {
  return (
    <div className="news-feed">
      <h3>Recent News: {stockSymbol}</h3>
      <ul>
        {mockArticles.map((article, idx) => (
          <li key={idx} className="news-item">
            <img src={article.image} alt="thumbnail" />
            <div className="news-details">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
              <div className="news-meta">
                <span>{article.source}</span>
                <span>•</span>
                <span>{timeAgo(article.publishedAt)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsFeed;
