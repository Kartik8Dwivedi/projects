# Project Description

## Overview

This project consists of two separate applications:

1. [Rule Engine with AST (Abstract Syntax Tree)](#rule-engine-with-ast)
2. [Real-time Data Processing System for Weather Monitoring with Rollups and Aggregates](#weather-monitoring-application)

## Application 1 : Rule Engine with AST

### Key Features

- Defined a specifi data structure to represent the AST.
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

## Weather Monitoring Application
