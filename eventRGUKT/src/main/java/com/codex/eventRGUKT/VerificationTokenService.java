package com.codex.eventRGUKT;

import com.codex.eventRGUKT.VerificationToken;
import com.codex.eventRGUKT.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VerificationTokenService {

    @Autowired
    private VerificationTokenRepository tokenRepository;

    public void saveVerificationTokenForUser(VerificationToken token) {
        tokenRepository.save(token);
    }

    public Optional<VerificationToken> getVerificationToken(String token) {
        return tokenRepository.findByToken(token);
    }

    public String validateToken(String token) {
        Optional<VerificationToken> verificationToken = tokenRepository.findByToken(token);
        if (verificationToken.isPresent()) {
            VerificationToken tokenEntity = verificationToken.get();

            if (tokenEntity.getExpiryDate().before(new java.util.Date())) {
                return "Token expired";
            }

            return "Valid token";
        } else {
            return "Invalid token";
        }
    }
}
