-- DML - Inserting data
-- SELECT * FROM USERS
-- INSERT INTO users (username, email, password)
-- VALUES
-- ('alice123', 'alice@example.com', 'hashed_password_1'),
--   ('bob456', 'bob@example.com', 'hashed_password_2'),
--   ('charlie789', 'charlie@example.com', 'hashed_password_3');

-- SELECT * FROM stocks;
--   INSERT INTO stocks (symbol, name, current_price, last_updated)
-- VALUES
--   ('AAPL', 'Apple Inc.', 185.32, NOW()),
--   ('GOOGL', 'Alphabet Inc.', 2732.12, NOW()),
--   ('TSLA', 'Tesla Inc.', 710.44, NOW());
-- SELECT * FROM portfolios
  -- Alice owns 10 shares of AAPL
-- INSERT INTO portfolios (user_id, stock_id, quantity, average_price)
-- VALUES
--   (1, 1, 10, 180.00),
--   (1, 2, 5, 2700.00),
--   (2, 3, 7, 695.00);

SELECT * FROM transactions
-- Alice bought AAPL
-- INSERT INTO transactions (user_id, stock_id, transaction_type, quantity, price_per_share)
-- VALUES
--   (1, 1, 'BUY', 10, 180.00),
--   (1, 2, 'BUY', 5, 2700.00),
--   (2, 3, 'BUY', 7, 695.00),
--   (2, 3, 'SELL', 2, 720.00),
--   (3, 1, 'BUY', 3, 182.50);

