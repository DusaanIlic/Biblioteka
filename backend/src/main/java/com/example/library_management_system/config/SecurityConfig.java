package com.example.library_management_system.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(
                csrf -> csrf
                        .ignoringRequestMatchers("/User/**")
                        .ignoringRequestMatchers("/login")
                        .ignoringRequestMatchers("/Book/**"))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/User/**").permitAll()
                        .requestMatchers("/").permitAll()
                        .requestMatchers("/**").permitAll()
                        .requestMatchers("/login").permitAll()
                        .anyRequest().authenticated()
                );

        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
