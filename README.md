# Quiz App

A web-based quiz application with gamification features built using vanilla JavaScript, HTML, and CSS.  
This project fetches quiz data from an external API via a Node.js backend proxy to avoid CORS issues, displays multiple-choice questions, implements a timer, tracks the score, and shows a results summary at the end.

## Features

- **Data Integration:**
  - Fetches quiz data from an external API using a Node.js proxy (`server.js`) to bypass CORS restrictions.
- **Quiz Functionality:**

  - Displays multiple-choice questions fetched from the API.
  - Implements a countdown timer (15 seconds per question).
  - Highlights correct and incorrect answers.
  - Tracks the score and displays the final result.
  - Provides a "Next" button to move to the following question.
  - Allows restarting the quiz.

- **User Interface:**
  - Clean, simple, and engaging design inspired by modern quiz applications.
  - Responsive design using HTML and CSS.

## Setup Instructions

### Prerequisites

- **Node.js and npm:**  
  Ensure that you have [Node.js](https://nodejs.org/) installed on your machine.

- **Live Server / Local Server:**  
  You can use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code or a simple Python HTTP server for serving the frontend files.

### 1. Clone or Download the Repository

Clone this repository or download the source code into a folder named `quiz-app`.

### 2. Setup and Run the Backend

1. Open a terminal in the `quiz-app` folder.
2. Initialize the Node.js project (if not already initialized):

   ```bash
   npm init -y
   ```

### 3. Install the required packages

npm install express cors node-fetch

### 4.Run the backend server

node server.js

# Run the Frontend

1. Open index.html in Visual Studio Code.
2. Right-click the file and select "Open with Live Server".

The application will open in your default browser.
