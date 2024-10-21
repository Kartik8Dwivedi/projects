# Project Description

## Overview

This project consists of two separate applications:

2. [Real-time Data Processing System for Weather Monitoring with Rollups and Aggregates](#application-1--weather-monitoring-application)
1. [Rule Engine with AST (Abstract Syntax Tree)](#application-2--rule-engine-with-ast)


# Application 1 : Weather Monitoring Application
- This project monitors weather conditions for **six cities** (**problem statement constraint**), allowing users to set **notifications** for specific weather **thresholds**. The system **aggregates** historical data to efficiently manage and store weather data, while ensuring users are notified promptly about **critical conditions**.
- This project is **end to end deployed and hosted** on **vercel's** platform, the fullstack application can be accessed from here: [**[Link]**](https://zeotap-project-two-client.vercel.app/)
- The backend is hosted on vercel and can be accessed from here: [**[Link]**](https://zeotap-project-two.vercel.app/api/v1)

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

### 6. **User Management**
- **User Registration**: Allows users to register with their email and password.
- **User Authentication**: JWT-based authentication for secure access.
- **User Preferences**: Set alerts based on temperature thresholds.

### 7. **Kelvin to Celsius Conversion**
- Converts temperature from Kelvin to Celsius for better readability.
- **Utilizes** the **formula**: `Celsius = Kelvin - 273.15`.

---

### Key Highlights:

- **Sliding Window**: Efficient data retention and aggregation for real-time insights.
- **Daily Aggregates**: Summarized daily insights with minimal storage usage.
- **Real-Time Alerts**: Configurable alerts based on user-defined weather conditions.

## Setup Instructions
- Note: The **environment variables** are *deliberately pushed to the github repository* for the ease of setup and testing. In **production**, these should be stored in a .env file and added to the .gitignore file.

1. Clone the repository and navigate to the project folder.
```shell 
git clone https://github.com/Kartik8Dwivedi/projects
cd application-two
```

2. Install dependencies for Backend
```shell
cd server
npm install
```

3. Start the backend server
```shell
npm run dev
```
Now the server is up and running on port 3030. 

4. Now open another fresh terminala and let's start the fontend.
```shell
cd application-two
cd client
```
5. Installing dependencies for Frontend
```shell
npm install
```
6. Start the frontend server
```shell
npm run dev
```
Now the frontend server is up and running. Open the browser and navigate to http://localhost:5173 to view the application.

## **Design Decisions:**

#### **Tech Stack :**
- **Backend: Node.js, Express.js, MongoDB**
    - **MongoDB** for storing weather data with city-wise aggregation.
    - **Express.js** for API routing and handling requests.
    - **Node.js** for server side execution.
    - Why **MERN**? Single language across stack for faster development and ease of integration.
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



## **Future Advancements**
- We had a **major constraint** that we were focussing majorly upon the **six metro cities** of India, we can expand our application to include more cities.
- **OAuth Integration**: Implement OAuth for secure third-party authentication.
- **User Preferences**: Allow users to set preferences for notifications and alerts.
- **Data Visualization**: Implement charts and graphs for better data representation. We have used **TailwindCSS** for UI, we can use **D3.js** for data visualization.
- **Geolocation Integration**: Use geolocation to fetch weather data based on user location.
- **Historical Data Analysis**: Implement historical data analysis for trend forecasting.
- **Machine Learning**: Implement ML models for weather prediction and anomaly detection.



# Application 2 : Rule Engine with AST

### Key Features

-	Defined a **specific data structure** to represent the **AST**.
-	Proper **schema design** for the rule management system.
-	Implemented a **parser** to convert the rule string into an AST.
-	Proper **validation of rules**.
-	**Error handling** for invalid rules.
-	**Modification of rules (CRUD)** under rule management dashboard
-	**Modular** and **efficient** codebase
-	**Dynamic Rule Creation:** Users can define rules using a simple syntax that can be **parsed into Abstract Syntax Trees**, allowing for complex logical operations.
-	**Real-time Evaluation:** The system evaluates the defined rules against **user-provided attributes** in real-time, providing immediate feedback on eligibility or compliance.
-	**Modular Architecture:** The project uses a modular approach with separate components for rule creation, evaluation, and the user interface, making it easier to maintain and extend.
-	**API-Driven Backend:** The backend is structured around RESTful APIs, allowing for easy integration with other services or front-end applications.
-	**User-Friendly Interface:** The front end uses React with Tailwind CSS and DaisyUI, providing a modern, responsive, and intuitive user interface for rule management and evaluation.
-	**Custom Validation Middleware:** Middleware functions validate input data for rules and attributes, ensuring that only valid data is processed.
-	**Combination of Rules:** Users can combine multiple rules into a single evaluation context, allowing for more complex logic and greater flexibility.

- Backend is hosted on **Vercel** and these routes can be accessed here: [[Link]](https://zeotap-project-one.vercel.app/api/v1/)
- Full stack application is hosted at **Vercel** and can be accessed from here: [[Link]](https://zeotap-project-one-redeploy.vercel.app/)

### Endpoints

- GET /rules - Get all rules with proper pagination and offset
- POST /rules - Create a new rule
- GET /rules/:id - Get a rule by id
- PUT /rules/:id - Update a rule by id
- DELETE /rules/:id - Delete a rule by id
- POST /evaluate - Evaluate a rule
- POST /combine - Combine multiple rules

## Setup Instructions
- Note: The **environment variables** are *deliberately pushed to the github repository* for the ease of setup and testing. In **production**, these should be stored in a .env file and added to the .gitignore file.

1. Clone the repository and navigate to the project folder.
```shell
git clone https://github.com/Kartik8Dwivedi/projects
cd projects
cd application-one
```

2. Install dependencies for Backend
```shell
cd server
npm install
```

3. Start the backend server
```shell
npm run dev
```
Now the server is up and running on port 3030.

4. Now open another fresh terminal and let's start the frontend.
```shell
cd application-one
cd client
```
5. Installing dependencies for Frontend
- Note: In the `.env` file, change the `VITE_BACKEND_URI`, it is set to the deployed backend server, comment it, and uncomment the very next line in `.env` file which will allow the frontend to consume api's from the localhost server backend
```shell
npm install
```
6. Start the frontend server
```shell
npm run dev
```
Now the frontend server is up and running. Open the browser and navigate to http://localhost:5173/ to view the application.

