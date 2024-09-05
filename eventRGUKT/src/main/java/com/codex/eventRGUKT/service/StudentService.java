package com.codex.eventRGUKT.service;

import com.codex.eventRGUKT.model.Student;
import com.codex.eventRGUKT.VerificationToken;
import com.codex.eventRGUKT.repo.StudentRepository;
import com.codex.eventRGUKT.VerificationTokenRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    public Student createStudent(Student student, String baseUrl) {
        Optional<Student> existingStudent = studentRepository.findByEmail(student.getEmail());
        if (existingStudent.isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        student.setPassword(passwordEncoder.encode(student.getPassword()));
        Student savedStudent = studentRepository.save(student);

        String token = generateVerificationToken(savedStudent);
        String verificationUrl = baseUrl + "/student/verify?token=" + token;
        sendVerificationEmail(savedStudent, verificationUrl);

        return savedStudent;
    }

    private String generateVerificationToken(Student student) {
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken(token, student);
        tokenRepository.save(verificationToken);
        return token;
    }

    private void sendVerificationEmail(Student student, String url) {
        String subject = "Email Verification";
        String senderName = "Event RGUKT Service";
        String mailContent = "<p>Hi " + student.getFirstname() + ",</p>"
                + "<p>Please click the link below to verify your email:</p>"
                + "<a href=\"" + url + "\">Verify your email</a>"
                + "<p>Thank you,<br>The Event RGUKT Team</p>";

        try {
            sendEmail(student.getEmail(), subject, mailContent, senderName);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    private void sendEmail(String recipientEmail, String subject, String content, String senderName)
            throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("sangupunithkumar123@gmail.com", senderName);
        helper.setTo(recipientEmail);
        helper.setSubject(subject);
        helper.setText(content, true);

        mailSender.send(message);
    }

    public String verifyToken(String token) {
        Optional<VerificationToken> verificationToken = tokenRepository.findByToken(token);
        if (verificationToken.isPresent()) {
            VerificationToken tokenEntity = verificationToken.get();

            if (tokenEntity.getExpiryDate().before(new java.util.Date())) {
                return "Token expired";
            }

            Student student = tokenEntity.getStudent();
            student.setEnabled(true);
            studentRepository.save(student);

            return "Email verified successfully";
        } else {
            return "Invalid token";
        }
    }

    public String login(String email, String password) {
        Optional<Student> studentOptional = studentRepository.findByEmail(email);

        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();

            if(!student.isEnabled()){
                return "Verify Your Email";
            }

            if (passwordEncoder.matches(password, student.getPassword())) {
                return student.getRole();
            } else {
                return "Password is incorrect";
            }
        } else {
            return "Email not registered";
        }
    }

    // New method to request a password update
    public boolean updatePasswordRequest(String email) {
        Optional<Student> studentOptional = studentRepository.findByEmail(email);
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();

            // Generate token and send reset email
            String token = generateVerificationToken(student);
            String resetUrl = "http://localhost:8080/student/verify-reset-password?token=" + token;
            sendResetPasswordEmail(student, resetUrl);
            return true;
        } else {
            return false;
        }
    }

    private void sendResetPasswordEmail(Student student, String url) {
        String subject = "Reset Your Password";
        String senderName = "Event RGUKT Service";
        String mailContent = "<p>Hi " + student.getFirstname() + ",</p>"
                + "<p>Please click the link below to reset your password:</p>"
                + "<a href=\"" + url + "\">Reset your password</a>"
                + "<p>Thank you,<br>The Event RGUKT Team</p>";

        try {
            sendEmail(student.getEmail(), subject, mailContent, senderName);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    // New method to verify the token and update the password
    public boolean verifyTokenAndUpdatePassword(String token, String newPassword) {
        Optional<VerificationToken> verificationToken = tokenRepository.findByToken(token);
        if (verificationToken.isPresent()) {
            VerificationToken tokenEntity = verificationToken.get();

            if (tokenEntity.getExpiryDate().before(new java.util.Date())) {
                return false;
            }

            Student student = tokenEntity.getStudent();
            student.setPassword(passwordEncoder.encode(newPassword));
            studentRepository.save(student);
            return true;
        } else {
            return false;
        }
    }

//    public boolean updatePassword(String email, String newPassword) {
//        Optional<Student> studentOptional = studentRepository.findByEmail(email);
//        if (studentOptional.isPresent()) {
//            Student student = studentOptional.get();
//
//            student.setPassword(passwordEncoder.encode(newPassword));
//            studentRepository.save(student);
//            return true;
//        } else {
//            return false;
//        }
//    }
}













//package com.codex.eventRGUKT.service;
//
//import com.codex.eventRGUKT.LoginResponseS;
//import com.codex.eventRGUKT.model.Student;
//import com.codex.eventRGUKT.VerificationToken;
//import com.codex.eventRGUKT.repo.StudentRepository;
//import com.codex.eventRGUKT.VerificationTokenRepository;
//import jakarta.mail.MessagingException;
//import jakarta.mail.internet.MimeMessage;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessageHelper;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.io.UnsupportedEncodingException;
//import java.util.Optional;
//import java.util.UUID;
//
//@Service
//public class StudentService {
//
//    @Autowired
//    private StudentRepository studentRepository;
//
//    @Autowired
//    private VerificationTokenRepository tokenRepository;
//
//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;
//
//    @Autowired
//    private JavaMailSender mailSender;
//
//    public Student createStudent(Student student, String baseUrl) {
//        Optional<Student> existingStudent = studentRepository.findByEmail(student.getEmail());
//        if (existingStudent.isPresent()) {
//            throw new IllegalArgumentException("Email already exists");
//        }
//
//        student.setPassword(passwordEncoder.encode(student.getPassword()));
//        Student savedStudent = studentRepository.save(student);
//
//        String token = generateVerificationToken(savedStudent);
//        String verificationUrl = baseUrl + "/student/verify?token=" + token;
//        sendVerificationEmail(savedStudent, verificationUrl);
//
//        return savedStudent;
//    }
//
//    private String generateVerificationToken(Student student) {
//        String token = UUID.randomUUID().toString();
//        VerificationToken verificationToken = new VerificationToken(token, student);
//        tokenRepository.save(verificationToken);
//        return token;
//    }
//
//    private void sendVerificationEmail(Student student, String url) {
//        String subject = "Email Verification";
//        String senderName = "Event RGUKT Service";
//        String mailContent = "<p>Hi " + student.getFirstname() + ",</p>"
//                + "<p>Please click the link below to verify your email:</p>"
//                + "<a href=\"" + url + "\">Verify your email</a>"
//                + "<p>Thank you,<br>The Event RGUKT Team</p>";
//
//        try {
//            sendEmail(student.getEmail(), subject, mailContent, senderName);
//        } catch (MessagingException | UnsupportedEncodingException e) {
//            throw new RuntimeException("Failed to send email", e);
//        }
//    }
//
//    private void sendEmail(String recipientEmail, String subject, String content, String senderName)
//            throws MessagingException, UnsupportedEncodingException {
//        MimeMessage message = mailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message);
//
//        helper.setFrom("sangupunithkumar123@gmail.com", senderName);
//        helper.setTo(recipientEmail);
//        helper.setSubject(subject);
//        helper.setText(content, true);
//
//        mailSender.send(message);
//    }
//
//    public String verifyToken(String token) {
//        Optional<VerificationToken> verificationToken = tokenRepository.findByToken(token);
//        if (verificationToken.isPresent()) {
//            VerificationToken tokenEntity = verificationToken.get();
//
//            if (tokenEntity.getExpiryDate().before(new java.util.Date())) {
//                return "Token expired";
//            }
//
//            Student student = tokenEntity.getStudent();
//            student.setEnabled(true);
//            studentRepository.save(student);
//
//            return "Email verified successfully";
//        } else {
//            return "Invalid token";
//        }
//    }
//
//    public String login(String email, String password) {
//        // Retrieve student by email
//        Optional<Student> studentOptional = studentRepository.findByEmail(email);
//
//        if (studentOptional.isPresent()) {
//            Student student = studentOptional.get();
//
//            if(!student.isEnabled()){
//                return "Verify Your Email";
//            }
//            // Check if password matches
//            if (passwordEncoder.matches(password, student.getPassword())) {
//                // Return role based on student type
//                return student.getRole();
//            } else {
//                return "Password is incorrect";
//            }
//        } else {
//            return "Email not registered";
//        }
//    }
//
//    public boolean updatePassword(String email, String newPassword) {
//        // Retrieve student by email
//        Optional<Student> studentOptional = studentRepository.findByEmail(email);
//        if (studentOptional.isPresent()) {
//            Student student = studentOptional.get();
//
//            // Encrypt new password and update
//            student.setPassword(passwordEncoder.encode(newPassword));
//            studentRepository.save(student);
//            return true;
//        } else {
//            return false;
//        }
//    }
//
//
//}
//
//
//
