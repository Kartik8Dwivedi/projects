# Project Description

## Overview

This project consists of two separate applications:

1. [Rule Engine with AST (Abstract Syntax Tree)](#rule-engine-with-ast)
2. [Real-time Data Processing System for Weather Monitoring with Rollups and Aggregates](#weather-monitoring-application)

# Application 1 : Rule Engine with AST

### Key Features

- Defined a specific data structure to represent the AST.
- Proper schema design for the rule management system.
- Implemented a parser to convert the rule string into an AST.
- Proper validation of rules.
- Error handling for invalid rules.
- Modification of rules under rule management dashboard
- Modular and efficient codebase

### Endpoints

- GET /rules - Get all rules with proper pagination and offset
- POST /rules - Create a new rule
- GET /rules/:id - Get a rule by id
- PUT /rules/:id - Update a rule by id
- DELETE /rules/:id - Delete a rule by id
- POST /evaluate - Evaluate a rule
- POST /combine - Combine multiple rules
- Backend is hosted on Vercel and these routes can be accessed here: [[Link]](https://zeotap-project-one.vercel.app/api/v1/)
- Full stack application is hosted at vercel and can be accessed from here: [[Link]](https://zeotap-project-one-client.vercel.app/)

# Application 2 : Weather Monitoring Application

### Key Features

### 1. **Real-Time Weather Fetching**

- Retrieves weather data every 15 minutes for Delhi, Mumbai, Chennai, Bangalore, Kolkata, and Hyderabad.
- Data points include temperature, humidity, wind speed, visibility, and weather condition.

### 2. **Sliding Window Data Storage**

- **Optimized Storage**: Maintains only one record per city, storing recent weather updates in an array.
- **Efficient Aggregation**: Data for the last 3 hours is stored, allowing quick aggregation and reducing storage needs.

### 3. **Daily Summarization**

- **Rollups**: Calculates average, max, and min temperatures, as well as the dominant weather condition for each day.
- Uses **sliding window** for faster aggregation.

### 4. **Alerting System**

- **User-Configurable Alerts**: Trigger alerts based on temperature thresholds (e.g., >35°C for two consecutive updates).
- Real-time alert monitoring.

### 5. **Cron Job Automation**

- **15-Minute Interval Updates**: Automatically fetches and updates weather data every 15 minutes using a cron job.
- Data fetch starts immediately when the server launches.

---

### Key Highlights:

- **Sliding Window**: Efficient data retention and aggregation for real-time insights.
- **Daily Aggregates**: Summarized daily insights with minimal storage usage.
- **Real-Time Alerts**: Configurable alerts based on user-defined weather conditions.
