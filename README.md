# CallCenter

## Welcome to my Big-data-cloud project!

 In this project we designed a system that gets a stream of data stores and process it in typical architectures templates and uses common big data infrastructure for analyze in rapid and adaptive manner.

## Goal

 The goal of this project is to design a dashboard analitic system in big data perception which uses Mysql & NoSQL Databases, tools from Hadoop Ecosystem and microservices in typical architecture and implementing infrastructure challenges.

## Functional requirements
- Customer data (name, social security number, date of birth, address, sex, list of products to which he is a subscriber) will be kept in an operational database.
- The system will receive Center Call call data and take care of storing, processing and displaying it
- The data accumulated in the system following a call:
  Call time, caller city, caller sex, caller age, number of calls in the last month, product discussed, call subject
- The system will display in Dashboard Time-Real the number of calls currently waiting and the average waiting time in the last ten minutes using graphs
- The system will allow you to display in the table and graph the indices of the number of waiting calls and waiting times from the beginning of the day at an aggregation level of 5 minutes.
- The system will allow viewing of summary indices regarding the day (Table): number of joining calls, number
Complaint calls, number of disconnection requests.
- The call data will be saved for interrogation and analysis.
- The system will allow learning from the data and predicting the nature of an incoming call (joining, complaining, requesting disconnection) as soon as it is received.

## Non-Functional requirements
- An operational database can be implemented in any infrastructure and in any location
- The system will be developed in a service-oriented concept in the Services Micro approach.
- The system will be based on three subsystems, Kafka will serve as a Broker Message for integration Including.
- Three subsystems are:
  1. Data reception subsystem.
  2. Subsystem Dashboards and real-time data.
  3. Subsystem Stores all call data and creates a prediction model using
- I used Node.js / express, Kafka, Redis, MongoDB infrastructures to develop the solution.
- Subsystem B only remembers current date data (midnight to midnight) by Redis database
And resets at midnight or at the request of the user
- Subsystem C remembers all historical call data by MongoDB
- The organization of services in the Node.js environment will be based on the MVC format
- Subsystem C will make it possible to analyze the historical data using a machine learning algorithm and create
Call topic prediction model, using BigML.com services

![image](https://user-images.githubusercontent.com/57864630/170966467-3ef22fa6-89d4-4e0b-b7bb-dc6f5969f528.png)

<img width="949" alt="Screenshot 2022-04-26 040737" src="https://user-images.githubusercontent.com/57864630/170966638-b8fc2e3d-9e00-4fde-9345-5044d5df5035.png">

