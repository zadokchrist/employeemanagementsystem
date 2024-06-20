# Employee Management System

## Overview

This project is a web application designed for managing employees, including their details and salary information. It consists of both a backend API built with .NET Core and a frontend UI developed using React.

## Setup Instructions

### Prerequisites

Before proceeding, ensure you have the following installed:

- Node.js (version 12.x or higher)
- .NET 6 SDK or higher
- Visual Studio Code or Visual Studio 2022
- MySQL or another compatible database server

### Backend (API using .NET Core)

1. **Clone the Repository**

   ```bash
   git clone https://github.com/zadokchrist/employeemanagementsystem.git
   cd employeemanagementsystem


2. **Configure Database**

   - Open `appsettings.json` and update the `ConnectionStrings:DefaultConnection` with your MySQL server connection details.

3. **Run Migrations**

   - Open a terminal in Visual Studio Code or use Package Manager Console in Visual Studio.
   - Execute the following commands to apply migrations:

     ```bash
     dotnet ef database update
     ```

4. **Run the Backend API**

   - Start the backend API by running the following command:

     ```bash
     dotnet run
     ```

   - The API should now be running on `http://localhost:5245`.

### Frontend (React)

1. **Navigate to Frontend Directory**

   ```bash
   cd employee-management-front
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure API Endpoint**

   - Open `src/api/api.js` and ensure that `baseURL` is set to your backend API URL:

     ```javascript
     import axios from 'axios';

     const api = axios.create({
       baseURL: 'http://localhost:5245/api', // Update with your backend API URL
       timeout: 5000,
       headers: {
         'Content-Type': 'application/json',
       },
     });

     export default api;
     ```

4. **Run the Frontend**

   ```bash
   npm start
   ```

   - The frontend development server should start and open your default browser with the address `http://localhost:3000`.

## Testing

### Backend

- **Unit Tests**

  - Navigate to `EmployeeManagementApi.Tests` directory.
  - Run the following command to execute backend tests:

    ```bash
    dotnet test
    ```

### Frontend

- **Unit Tests**

  - In the `employee-management-frontend` directory, run:

    ```bash
    npm test
    ```

  - Follow the prompts to run all tests.

## Additional Notes

- **Deployment:**
  - For deployment, ensure backend and frontend configurations (`baseURL` in frontend) are updated according to your production environment.
  - Consider containerization with Docker and orchestration with Kubernetes for scaling and management.

- **Contributions:**
  - Contributions and feedback are welcome via pull requests and issues on GitHub.

## Authors

- **Your Name**: [Link to your profile/portfolio]

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

These instructions provide a step-by-step guide to setting up both the backend API and the frontend UI, including dependencies, configurations, and running tests. Adjust paths, URLs, and commands based on your specific project structure and environment setup.


Video of how the system works : https://www.loom.com/share/85e9d92a5d27475b976d0c6db834f93d?sid=b62a4ae8-4f54-4da8-bfea-ad4a9fc2991b


