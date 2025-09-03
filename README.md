# Task Manager Application

This is a simple task manager application with a React frontend and a Go backend.

## Prerequisites

Before you begin, ensure you have the following installed:

*   [Go](https://golang.org/doc/install) (version 1.18 or higher)
*   [Node.js](https://nodejs.org/en/download/) (which includes npm)

## Backend Setup (Go API)

1.  **Navigate to the backend directory:**
    ```bash
    cd task-app/go-tasks-api
    ```

2.  **Install dependencies:**
    ```bash
    go mod tidy
    ```

3.  **Navigate to the frontend directory:**
    ```bash
    cd task-app
    ```

4.  **Install dependencies:**
    ```bash
    npm install
    ```
5.  **Run back and front:**
    ```bash
    npm run dev:all
    ```
    The application will be available at `http://localhost:5173` 

## How to Use

1.  Open your browser and go to the frontend URL.
2.  You can add new tasks using the input form.
3.  Mark tasks as complete by clicking the checkbox.
4.  Load more tasks using the "Load More" button.


# Improvment comments

1. For projects more complex I whould use clean architecture to hace an aplication modularized, for example: each module mort have their own components, hooks, services, adapters, etc.
2. Redux for manage the state of those modules.
3. Jest for unit testing. 
