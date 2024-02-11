package com.example.jueguito.services;


import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.MacAlgorithm;
import jakarta.enterprise.context.ApplicationScoped;

import javax.crypto.SecretKey;
import java.security.SecureRandom;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@ApplicationScoped
public class TokenService {

    private static final String secretkey = "ClaveSecreta123";
    private final long expiration = 86400000L;

    private final Set<String> tokenValido = new HashSet<>();

    private final Set<String> tokenInvalido = new HashSet<>();

    public boolean isTokenValid(String token){
        return tokenValido.contains(token);
    }
    public void invalidateToken(String token){
        tokenValido.remove(token);
        tokenInvalido.add(token);
    }
    public void addToken(String token){
        tokenValido.add(token);
    }
    public boolean isTokenInvalid(String token){
        return tokenInvalido.contains(token);
    }
    public String generateToken(String username){
        byte[] keyBytes = new byte[32];
        new SecureRandom().nextBytes(keyBytes);
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith( Keys.hmacShaKeyFor(keyBytes))
                .compact();
    }

    public boolean isTokenExpired(String token){
        try {
            Jwts.parser()
                    .verifyWith(io.jsonwebtoken.security.Keys.hmacShaKeyFor(secretkey.getBytes()))
                    .build()
                    .parseSignedClaims(token);
            return false; // El token es válido
        } catch (ExpiredJwtException e) {
            return true; // El token ha expirado
        } catch (Exception e) {
            return true; // El token no es válido
        }
    }


}
