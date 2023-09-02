# Skillify

Welcome to the Course Selling App repository! This is a web application built using the MERN stack that allows administrators to manage courses and users to purchase courses. The app utilizes JWT for authentication, Recoil for state management, Axios for API communication, and Material-UI (Mui) for styling.

## Table of Contents

- [Screenshots](#screenshots)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#contact)

## Screenshots

![Screenshot 1](https://i.ibb.co/RYP4dtD/Screenshot-2023-09-02-at-4-07-54-PM.png)
![Screenshot 2](https://i.ibb.co/vH2XYdD/Screenshot-2023-09-02-at-4-09-47-PM.png)
![Screenshot 3](https://i.ibb.co/Q7w0MMV/Screenshot-2023-09-02-at-4-10-15-PM.png)
![Screenshot 4](https://i.ibb.co/Jt9LL1q/Screenshot-2023-09-02-at-4-08-50-PM.png)

## Features

- **Admin Features:**
  - Admin authentication using JWT.
  - Admin registration and login.
  - Admins can create, edit, and manage courses.
  - Course uploading by admins.

- **User Features:**
  - User authentication and registration.
  - Users can browse and purchase courses.
  - User dashboard to manage purchased courses.
  - Video streaming for courses.

## Technologies Used

- **Frontend:**
  - React.js for building the user interface.
  - Material-UI (Mui) for styling components.
  - Recoil for state management.

- **Backend:**
  - Node.js and Express for server-side logic.
  - MongoDB for the database.
  - JSON Web Tokens (JWT) for authentication.

## Installation

1. Clone the repository:

```sh
git clone https://github.com/nipun-mehndiratta/Skillify.git
```
2. Navigate to the project directory:

```sh
cd course_selling_app
```
3. Install backend dependencies:

```sh
cd server && npm install
```
4. Install frontend dependencies:

```sh
cd admin-client && npm install
```
5. Make sure to update the MongoDB connection details in the `server/index.js` file.

6. Start the backend server:

In the server directory, run: node index.js
   
7. Start the Frontend:

In the admin-client directory, run: npm run dev
In the user-client directory, run: npm run dev

## Usage

**Admin Registration/Login:**

1. Navigate to the admin login/register page.
2. Follow the prompts to register or log in as an admin.

**Admin Dashboard:**

1. Once logged in as an admin, access the admin dashboard.
2. Manage existing courses and upload new courses.

**User Features:**

1. User registration and login.
2. Browse and purchase available courses.
3. Manage purchased courses.
4. Course streaming.

**Course Uploading (Admin Feature):**

Admins can upload new courses through the admin dashboard.

## Contributing

Contributions are welcome! To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m "Add some feature"`
4. Push the changes to your fork: `git push origin feature-name`
5. Create a pull request detailing your changes.

## Contact

If you have any questions or suggestions, feel free to contact me at nipun2000.m@gmail.com.
