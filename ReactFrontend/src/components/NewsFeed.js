import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './NewsFeed.css';
const NewsFeed = ({stockSymbol = "GOOG "}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
const apiKey = process.env.REACT_APP_NEWSAPI_KEY;

  useEffect(()=>{
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://newsapi.org/v2/everything?q=${stockSymbol}&pageSize=6&sortBy=publishedAt&language=en&apiKey=${apiKey}`
        );
        setArticles(res.data.articles);
      } catch (err){
        console.error("Error fetching news: ", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [stockSymbol]);
    const timeAgo = (dateStr) => {
    const now = new Date();
    const past = new Date(dateStr);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs} hours ago`;
    return `${Math.floor(diffHrs / 24)} days ago`;
  };
  return (
    <div className="news-feed">
      <h3>Recent News: {stockSymbol}</h3>
      {loading ? (
        <p>Loading news...</p>
      ) : (
        <ul>
          {articles.map((article, idx) => (
            <li key={idx} className="news-item">
              <img src={article.urlToImage || 'https://via.placeholder.com/80'} alt="thumb" />
              <div className="news-details">
                <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                <div className="news-meta">
                  <span>{article.source.name}</span>
                  <span>•</span>
                  <span>{timeAgo(article.publishedAt)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsFeed;
