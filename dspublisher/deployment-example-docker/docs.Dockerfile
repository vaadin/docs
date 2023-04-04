FROM openjdk:17

COPY out/*.jar /usr/app/app.jar
CMD java -jar /usr/app/app.jar
