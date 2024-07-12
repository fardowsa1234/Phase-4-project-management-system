# Phase-4-project-management-system
# Project Management System

This project management system is built using React.js for the frontend and Flask for the backend. It provides a comprehensive solution for managing users, tasks, projects, and memberships.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)


## Features

- User management: Add, view, and manage users.
- Task management: Create, view, and manage tasks.
- Project management: Create, view, and manage projects.
- Membership management: Manage project memberships.
- Attractive UI with Tailwind CSS and Bootstrap.

## Installation

### Backend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/fardowsa1234/Phase-4-project-management-system.git
    cd Phase-4-project-management-system
    ```

2. Navigate to the `server` directory:
    ```sh
    cd server
    ```

3. Create a virtual environment:
    ```sh
    python3 -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

4. Install the required dependencies:
    ```sh
    pip install -r requirements.txt
    ```

5. Run the Flask application:
    ```sh
    flask run
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:
    ```sh
    cd ../frontend
    ```

2. Install the required dependencies:
    ```sh
    npm install
    ```

3. Start the React development server:
    ```sh
    npm start
    ```

### Running Both Frontend and Backend Concurrently

1. Navigate to the root directory of the project:
    ```sh
    cd ..
    ```

2. Use `concurrently` to run both frontend and backend:
    ```sh
    npm install -g concurrently
    concurrently "npm start --prefix server" "npm start --prefix frontend"
    ```

## Usage

- Open your web browser and navigate to `http://localhost:3000` to view the application.
- Use the navigation bar to access different sections of the application:
  - **Users**: View and manage users.
  - **Tasks**: View and manage tasks.
  - **Projects**: View and manage projects.
  - **Memberships**: Manage project memberships.
  - **Add User**: Add new users to the system.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b my-new-feature
    ```
3. Make your changes and commit them:
    ```sh
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```sh
    git push origin my-new-feature
    ```
5. Create a new pull request.

