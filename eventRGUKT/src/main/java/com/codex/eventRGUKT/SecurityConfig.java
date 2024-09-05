package com.codex.eventRGUKT;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // Disable CSRF for simplicity; adjust as needed
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/student","/faculty","/student/create", "/student/login", "/faculty/create", "/faculty/login","/event","/event/login","/event/create","/faculty/update-password","/event/update-password","/form","/form/register","/form/events","/form/futureevent","/form/pastevent","/volunteer/create","/student/verify","/student/requestupdatepassword","/student/verifyresetpassword","/volunteer/getvolunteer","/volunteer/assign/{id}","/volunteer/unassign/{id}").permitAll()
                                .anyRequest().authenticated()
                );

        return http.build();
    }
}
