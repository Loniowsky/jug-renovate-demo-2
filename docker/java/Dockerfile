FROM maven:3.8.3-openjdk-16@sha256:b58df6797f4fe354ce8d4bac8aea68f459fef12f7bb527c4dbb1d337d438f80b AS build
COPY src /src
COPY pom.xml /pom.xml
ARG REVISION=0.0.1
RUN  mvn --no-transfer-progress -B package --file pom.xml -Drevision=${REVISION}

FROM openjdk:16-jdk@sha256:bb68f084c2000c8532b1675ca7034f3922f4aa10e9c7126d29551c0ffd6dee8f
COPY --from=build /target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]