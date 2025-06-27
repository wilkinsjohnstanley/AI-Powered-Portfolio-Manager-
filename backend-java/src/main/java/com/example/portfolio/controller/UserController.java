package com.example.portfolio.controller;
import com.example.portfolio.model.User;
import com.example.portfolio.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserRepository repo;
    public UserController(UserRepository repo){
        this.repo = repo;
    }
    @GetMapping
    public List<User> getAllUsers(){
        return repo.findAll();
    }
}
