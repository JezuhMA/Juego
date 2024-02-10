package com.example.jueguito.services;


import io.jsonwebtoken.Jwts;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Date;

@ApplicationScoped
public class TokenService {

    private static final String secretkey = "ClaveSecreta123";
    private final long expiration = 86400000L;
    public String generateToken(String username){
        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(io.jsonwebtoken.security.Keys.hmacShaKeyFor(secretkey.getBytes()))
                .compact();
        return "Bearer " + username;
    }

}
