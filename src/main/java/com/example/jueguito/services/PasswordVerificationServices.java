package com.example.jueguito.services;

import com.example.jueguito.dao.UsuarioDAO;
import com.example.jueguito.entities.Usuario;
import jakarta.inject.Inject;
import org.bouncycastle.crypto.generators.Argon2BytesGenerator;
import org.bouncycastle.crypto.params.Argon2Parameters;

import java.security.SecureRandom;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;


public class PasswordVerificationServices {

    @Inject
    UsuarioDAO usuarioDAO;

    public static PasswordVerificationServices instace;

    private static final int ITERATIONS = 350000;

    private static final int KEY_SIZE = 64;

    private PasswordVerificationServices () {}

    public static synchronized PasswordVerificationServices getInstace() {
        if (instace == null) {
            instace = new PasswordVerificationServices();
        }
        return instace;
    }

    public Map<String, byte[]> hashingPassword (String password) {
        byte[] salt = getSalt();
        byte[] hash = getHash(password, salt);
        Map<String, byte[]> map = new HashMap<>();
        map.put("hash", hash);
        map.put("salt", salt);
        return map;
    }

    private byte[] getHash(String password, byte[] salt) {
        Argon2Parameters argon2Parameters = new Argon2Parameters.Builder(Argon2Parameters.ARGON2_id)
                .withIterations(ITERATIONS)
                .withSalt(salt)
                .withParallelism(2)
                .withMemoryAsKB(65536)
                .build();
        Argon2BytesGenerator argon2BytesGenerator = new Argon2BytesGenerator();
        argon2BytesGenerator.init(argon2Parameters);
        byte [] hash = new byte[KEY_SIZE];
        argon2BytesGenerator.generateBytes(password.toCharArray(), hash);

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
        return Arrays.equals(newHash, hash);
    }

    public Map<String, byte[]> getHashPasswordAndSalt(String login) {
        return usuarioDAO.getHashSalt(login);
    }

}
