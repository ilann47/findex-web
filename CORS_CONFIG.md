# Configuração CORS para Spring Boot

## Problema
O frontend está retornando erro de CORS:
```
Access to fetch at 'http://localhost:8080/user/role/me' from origin 'http://localhost:5175' has been blocked by CORS policy
```

## Solução - Spring Boot

### Opção 1: Configuração Global (Recomendada)

Adicione esta classe ao seu projeto Spring Boot:

```java
@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                    "http://localhost:5175",
                    "http://localhost:3000",
                    "http://localhost:5173"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false)
                .maxAge(3600);
    }
}
```

### Opção 2: Annotation no Controller

Se preferir configurar apenas no controller específico:

```java
@RestController
@CrossOrigin(origins = {
    "http://localhost:5175",
    "http://localhost:3000", 
    "http://localhost:5173"
})
public class UserController {
    
    @GetMapping("/user/role/me")
    public ResponseEntity<UserRoleResponse> getCurrentUserRole(
            HttpServletRequest request,
            @RequestHeader("Authorization") String authToken) {
        // Sua implementação aqui
    }
}
```

### Opção 3: Annotation apenas no método

```java
@GetMapping("/user/role/me")
@CrossOrigin(origins = {
    "http://localhost:5175",
    "http://localhost:3000",
    "http://localhost:5173"
})
public ResponseEntity<UserRoleResponse> getCurrentUserRole(
        HttpServletRequest request,
        @RequestHeader("Authorization") String authToken) {
    // Sua implementação aqui
}
```

## Configuração de Segurança

Se você estiver usando Spring Security, também adicione isso à sua configuração:

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            // ... outras configurações
            ;
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:5175",
            "http://localhost:3000",
            "http://localhost:5173"
        ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(false);
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

## Validação de Token

Para o endpoint `/user/role/me`, você precisa implementar a validação do token Google.

### Exemplo de implementação:

```java
@GetMapping("/user/role/me")
public ResponseEntity<UserRoleResponse> getCurrentUserRole(
        @RequestHeader("Authorization") String authToken,
        @RequestHeader(value = "X-User-Email", required = false) String userEmail) {
    
    try {
        // Remover "Bearer " do token
        String token = authToken.replace("Bearer ", "");
        
        // Validar token Google (ID Token ou Access Token)
        GoogleUser googleUser = validateGoogleToken(token);
        
        if (googleUser == null) {
            return ResponseEntity.status(401).build();
        }
        
        // Buscar role do usuário no seu banco de dados
        String userRole = userService.getUserRole(googleUser.getEmail());
        
        if (userRole == null) {
            // Usuário não encontrado - retornar 404 ou criar com role padrão
            return ResponseEntity.notFound().build();
        }
        
        UserRoleResponse response = new UserRoleResponse();
        response.setRole(userRole);
        
        return ResponseEntity.ok(response);
        
    } catch (Exception e) {
        log.error("Erro ao validar token: ", e);
        return ResponseEntity.status(401).build();
    }
}

private GoogleUser validateGoogleToken(String token) {
    // Se é um ID Token (JWT)
    if (token.startsWith("eyJ")) {
        return validateGoogleIdToken(token);
    } else {
        // Se é um Access Token
        return validateGoogleAccessToken(token);
    }
}
```

## Classes de Response

```java
public class UserRoleResponse {
    private String role;
    
    // getters e setters
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}

public class GoogleUser {
    private String email;
    private String name;
    private String id;
    
    // getters e setters
}
```

## Notas Importantes

1. **Produção**: Em produção, substitua `localhost:5175` pelo domínio real
2. **Segurança**: Nunca use `"*"` em `allowedOrigins` em produção
3. **Token Type**: O frontend agora envia tanto ID Token quanto Access Token - use o que for mais apropriado para sua validação
4. **Headers**: O frontend inclui `X-User-Email` e `X-Provider` para facilitar o processamento
