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
- Backend is hosted on Vercel and these routes can be accessed here: [[Link]](https://zeotap-project-one.vercel.app/api/v1/)
- Full stack application is hosted at vercel and can be accessed from here: [[Link]](https://zeotap-project-one-client.vercel.app/)

### Endpoints

- GET /rules - Get all rules with proper pagination and offset
- POST /rules - Create a new rule
- GET /rules/:id - Get a rule by id
- PUT /rules/:id - Update a rule by id
- DELETE /rules/:id - Delete a rule by id
- POST /evaluate - Evaluate a rule
- POST /combine - Combine multiple rules

# Application 2 : Weather Monitoring Application
This project monitors weather conditions for six cities, allowing users to set notifications for specific weather thresholds. The system aggregates historical data to efficiently manage and store weather data, while ensuring users are notified promptly about critical conditions.
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

- A total of **three cron jobs** have been scheduled to automate the following tasks: 
    - **Weather Data Fetching**: Fetches weather data every 15 minutes.
    - **Daily Rollups**: Summarizes daily weather data at every hour.
    - **Alert Monitoring**: Checks for alerts every 15 minutes.

---

### Key Highlights:

- **Sliding Window**: Efficient data retention and aggregation for real-time insights.
- **Daily Aggregates**: Summarized daily insights with minimal storage usage.
- **Real-Time Alerts**: Configurable alerts based on user-defined weather conditions.

### Design Decisions:

#### **Tech Stack :**
- **Backend: Node.js, Express.js, MongoDB**
    - **MongoDB** for storing weather data with city-wise aggregation.
    - ****Express.js** for API routing and handling requests.
    - ****Node.js** for server side execution.
    - Why ****MERN**? Single language across stack for faster development and ease of integration.
- **Frontend: React.js, TailwindCSS, DaisyUI**
    - **React.js** for dynamic UI rendering.
    - **TailwindCSS** for responsive and clean UI design.
    - Why React? Component-based architecture for reusability and maintainability.
- **Cron Jobs: node-cron**
    - **node-cron** for scheduling tasks like data fetching, rollups, and alert monitoring.
    - Why node-cron? **Lightweight** and **easy-to-use** library for task scheduling.
    - It's alternative can be a cloud-based scheduler like AWS CloudWatch.
- **Data Storage Strategy:**    
    - **Sliding Window Technique**: Used to maintain a manageable dataset size while storing high frequency data.
    - This approach helped us to **reduce** the amount of data stored while still providing **real-time insights** and **increased performance**.
    - Why this design?
        - **Efficiency**: Storing raw data for future calculations while using a sliding window to retain only relevant historical data reduces overall storage costs.
        - **Flexibility**: The schema allows easy querying of both real-time and historical data for analysis and alerting.

- **MongoDB Schema** 
    - Designed to store both raw data and daily **aggregated summaries** for **efficient querying**.
    - **City-wise** data storage for easy retrieval and aggregation.
    - Built **two extensive schemas**, one of **user** and second for **weather** data.

- **Alerting System**: 
    - Implemented to notify users about **critical** weather conditions.
    - **Configurable alerts** based on user-defined thresholds.
    - Utilized **Google's SMTP server** for sending email alerts.

- **Error Handling**:
    - **Custom error handling** for better user experience.
    - **Validation** of user inputs to prevent incorrect data entry.
    - **Error logging** for debugging and monitoring. (Morgan Library is used for logging)

- **API Design**:
    - **RESTful API** design for easy integration with frontend.
    - **CRUD operations** for managing weather data and user alerts.
    - **API endpoints** for fetching weather data, setting alerts, and managing user preferences.

- **Authentication and Authorization**:
    - **JWT-based authentication** for secure user access.
    - **Middleware** for verifying user roles and permissions.
    - V2 of the application can include **OAuth** for third-party authentication.

### **Challenges Faced**:
- Managing **high-frequency** weather data **efficiently** without exceeding storage limits.
- Designing the **aggregation** mechanism without altering raw data required for future computations. **(Utilized sliding window technique)**
- Ensuring smooth user experience with **real-time alerts**, **daily rollups**, **dynamic notifictions** and **real time data fetching**.

## Setup Instructions
1. Clone the repository and navigate to the project folder.
```shell 
git clone https://github.com/Kartik8Dwivedi/projects
cd projects
```