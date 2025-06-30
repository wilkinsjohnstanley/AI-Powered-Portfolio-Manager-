SELECT u.username || ' ' || t.transaction_type || ' ' || t.quantity || ' shares of ' || s.symbol || ' at $' || t.price_per_share AS transaction_summary
FROM transactions t
JOIN users u 
ON t.user_id = u.id
JOIN stocks s
ON t.stock_id = s.id;