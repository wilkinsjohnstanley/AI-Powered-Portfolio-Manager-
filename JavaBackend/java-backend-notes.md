These are my notes for my Java backend.
1. Install PostgreSQL and Java 21 
2. Generate Spring Boot Project

Go to https://start.spring.io/ and configure:

    Project: Maven

    Language: Java

    Spring Boot: 3.x

    Group: com.example

    Artifact: java-backend

    Name: java-backend

    Package Name: com.example.javabackend

    Packaging: Jar

    Java Version: 21

Add dependencies:

    ✅ Spring Web

    ✅ Spring JDBC

    ✅ PostgreSQL Driver

Then click Generate to download a ZIP. Extract it into the java-backend folder.

3. Set Up Database Connection

Edit src/main/resources/application.properties: