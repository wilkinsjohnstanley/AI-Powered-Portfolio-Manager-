package com.example.portfolio.repository;
import com.example.portfolio.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class UserRepository {
    private final JdbcTemplate jdbc;

    public UserRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
    public List<User> findAll(){
        return jdbc.query("SELECT * FROM users", (rs, rowNum) -> {
           User user = new User();
           user.setId(rs.getInt("id"));
           user.setUsername(rs.getString("username"));
           user.setEmail(rs.getString(("email")));
           return user;
        });
    }
}
