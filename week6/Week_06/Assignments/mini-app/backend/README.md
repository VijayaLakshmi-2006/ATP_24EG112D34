# Employee Management REST API (Backend)

This is a Node.js and Express backend built to manage Employee records using a MongoDB database. It provides a complete set of CRUD (Create, Read, Update, Delete) endpoints for interacting with employee data.

## Features

* **Node.js + Express**: Fast and lightweight web server.
* **MongoDB + Mongoose**: NoSQL database connection and robust object modeling.
* **ES Modules**: Modern JavaScript syntax (`import`/`export`).
* **Environment Configuration**: Secure environment setups with `dotenv`.
* **CORS Enabled**: Ready to accept requests from frontend applications.

## Prerequisites

1. **[Node.js](https://nodejs.org/)**: Ensure Node.js is installed on your local machine.
2. **[MongoDB](https://www.mongodb.com/)**: You need a running instance of MongoDB (either locally at `mongodb://127.0.0.1:27017` or via MongoDB Atlas).

## Getting Started

### 1. Installation

Clone or download the project and install all the necessary dependencies:

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a root `.env` file inside the `backend` directory. Define your port and MongoDB connection sting:

```env
PORT=5000
DB_URL=mongodb://127.0.0.1:27017/backendE
```

### 3. Running the Server

Start the development server:

```bash
node server.js
```
*If everything is configured correctly, your terminal will display:*
`database connected`
`server is running on port 5000`

---

## Employee Data Schema

Every employee document stored in the database follows this structure:

| Field | Type | Validation |
| :--- | :--- | :--- |
| `name` | String | Required (Min: 5 characters, Max: 20 characters) |
| `email` | String | Required |
| `designation` | String | Required |
| `mobile` | String | Required |
| `companyName`| String | Required |

---

## REST API Endpoints

The API handles Requests and Responses primarily in `JSON` format.

### 1. Create a New Employee
* **Method**: `POST`
* **URL**: `/employees/create`
* **Body** (JSON):
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "designation": "Software Engineer",
      "mobile": "1234567890",
      "companyName": "TechCorp"
    }
    ```
* **Success Response**: `201 Created`

### 2. Get All Employees
* **Method**: `GET`
* **URL**: `/employees/`
* **Success Response**: `200 OK` (Returns an array of all employee objects)

### 3. Update an Employee
* **Method**: `PUT`
* **URL**: `/employees/:id` *(Replace `:id` with the actual MongoDB `_id` of the employee)*
* **Body** (JSON): Include whichever fields you wish to update.
    ```json
    {
       "designation": "Senior Software Engineer"
    }
    ```
* **Success Response**: `200 OK`

### 4. Delete an Employee
* **Method**: `DELETE`
* **URL**: `/employees/:id` *(Replace `:id` with the actual MongoDB `_id` of the employee)*
* **Success Response**: `200 OK`
