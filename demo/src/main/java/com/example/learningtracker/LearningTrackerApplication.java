# Database
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=learning_tracker;encrypt=true;trustServerCertificate=true
spring.datasource.username=lxx
spring.datasource.password=123456
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.SQLServer2012Dialect

# Security
spring.security.user.name=admin
spring.security.user.password=admin