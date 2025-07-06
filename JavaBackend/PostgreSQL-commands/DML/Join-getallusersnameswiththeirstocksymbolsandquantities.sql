SELECT u.username, s.symbol, p.quantity
FROM portfolios p
JOIN users u 
ON p.user_id = u.id
JOIN stocks s
ON p.stock_id = s.id;