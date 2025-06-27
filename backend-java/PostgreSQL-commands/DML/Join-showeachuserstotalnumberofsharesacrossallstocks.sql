SELECT u.username, SUM(p.quantity) AS total_shares
FROM portfolios p
JOIN users u 
ON p.user_id = u.id
GROUP BY u.username;