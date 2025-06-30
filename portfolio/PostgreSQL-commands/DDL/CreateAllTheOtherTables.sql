-- stocks
-- CREATE TABLE stocks 
-- (
-- 	id SERIAL PRIMARY KEY,
-- 	symbol VARCHAR(10) UNIQUE NOT NULL,
-- 	name VARCHAR(100),
-- 	current_price NUMERIC(12, 4),
-- 	last_updated TIMESTAMP
-- );
-- portfolios
CREATE TABLE portfolios (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  stock_id INTEGER REFERENCES stocks(id),
  quantity NUMERIC(12, 4) NOT NULL,
  average_price NUMERIC(12, 4),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- transactions
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  stock_id INTEGER REFERENCES stocks(id),
  transaction_type VARCHAR(10) CHECK (transaction_type IN ('BUY', 'SELL')),
  quantity NUMERIC(12, 4) NOT NULL,
  price_per_share NUMERIC(12, 4) NOT NULL,
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);