package com.example.jueguito.services;

import com.example.jueguito.dao.UsuarioDAO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.bouncycastle.crypto.generators.Argon2BytesGenerator;
import org.bouncycastle.crypto.params.Argon2Parameters;

import java.security.SecureRandom;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;


@ApplicationScoped
public class PasswordVerificationServices {

    @Inject
    UsuarioDAO usuarioDAO;

    private static final int ITERATIONS = 10;

    private static final int KEY_SIZE = 64;


    public Map<String, byte[]> hashingPassword (String password) {
        byte[] salt = getSalt();
        byte[] hash = getHash(password, salt);
        Map<String, byte[]> map = new HashMap<>();
        map.put("hash", hash);
        map.put("salt", salt);
        return map;
    }

    private byte[] getHash(String password, byte[] salt) {
        Argon2Parameters.Builder builder = new Argon2Parameters.Builder(Argon2Parameters.ARGON2_id)
                .withVersion(Argon2Parameters.ARGON2_VERSION_13)
                .withIterations(ITERATIONS)
                .withMemoryPowOfTwo(14)
                .withParallelism(4)
                .withSalt(salt);
        Argon2BytesGenerator generator = new Argon2BytesGenerator();
        generator.init(builder.build());
        byte[] hash = new byte[KEY_SIZE];
        generator.generateBytes(password.toCharArray(), hash);
        return hash;
    }

    private byte[] getSalt(){
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }

    public boolean verificatePassword(String password, byte[] salt, byte[] hash) {
        byte[] newHash = getHash(password, salt);
        boolean result = Arrays.equals(newHash, hash);
        return result;
    }

    public Map<String, byte[]> getHashPasswordAndSalt(String login) {
        return usuarioDAO.getHashSalt(login);
    }

}
