# AdaSampah Back-End API Documentation

## Overview

AdaSampah is a waste reporting platform. This backend provides RESTful APIs for user management, authentication, and waste report management. Authentication uses JWT stored in HTTP-only cookies for secure session handling.

---

## Base URL

```
https://adasampah-backend3-production.up.railway.app
```

---

## Authentication

- **Login** returns a JWT token in an HTTP-only cookie (`token`).
- Most endpoints require authentication via this cookie.
- Logout will blacklist the token and remove the cookie.

---

## User Endpoints

### Register

- **POST** `/user/register`
- **Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "fullName": "string",
    "role": "string" // optional, default: "user"
  }
  ```
- **Response:** User data (without password).

---

### Login

- **POST** `/user/login`
- **Body:**
  ```json
  {
    "username": "string", // or "email"
    "password": "string"
  }
  ```
- **Response:** User data + JWT token (in cookie).

---

### Logout

- **POST** `/user/logout`
- **Cookie:** `token` (required)
- **Response:** Success message.

---

### Get User by ID

- **GET** `/user/{id}`
- **Response:** User data (without password).

---

### Update User

- **PUT** `/user/{id}`
- **Auth:** Required
- **Payload:** `multipart/form-data` (for profile picture upload)
- **Fields:** `username`, `email`, `fullName`, `profileUrl` (file)
- **Response:** Updated user data.

---

### Delete User

- **DELETE** `/user/{id}`
- **Auth:** Required
- **Response:** Deleted user data.

---

### Refetch Authenticated User

- **GET** `/user/refetch`
- **Auth:** Required
- **Response:** Authenticated user data.

---

## Report Endpoints

### Get All Reports

- **GET** `/reports`
- **Response:** Array of all reports.

---

### Get All Reports (Paginated)

- **GET** `/reports/limit?page={page}&limit={limit}`
- **Query:** `page` (default: 1), `limit` (default: 9)
- **Response:** Paginated reports, total pages, current page.

---

### Get Report by ID

- **GET** `/reports/{reportId}`
- **Response:** Report data.

---

### Create Report

- **POST** `/reports`
- **Auth:** Required
- **Payload:** `multipart/form-data` (for photo upload)
- **Fields:**
  - `description` (string)
  - `lat`, `lon`, `latDetail`, `lonDetail` (number)
  - `regency`, `province`, `location`, `detailLocation` (string)
  - `photo` (file)
  - `status`, `saved` (optional, JSON array)
- **Response:** Created report ID.

---

### Edit Report Description

- **PUT** `/reports/{reportId}`
- **Auth:** Required
- **Body:**
  ```json
  { "description": "string" }
  ```
- **Response:** Updated report data.

---

### Update Report Status

- **PATCH** `/reports/{reportId}/status`
- **Body:**
  ```json
  { "statusDescription": "string" }
  ```
- **Response:** Updated report with new status.

---

### Delete Report

- **DELETE** `/reports/{reportId}`
- **Auth:** Required
- **Response:** Success message.

---

### Toggle Save Report by User

- **PATCH** `/reports/{reportId}/saved/{userId}`
- **Auth:** Required
- **Response:** Message indicating save/unsave.

---

### Get Saved Users for Report

- **GET** `/reports/{reportId}/saved`
- **Response:** Array of user IDs who saved the report.

---

### Get Reports by User

- **GET** `/reports/user/{userId}`
- **Auth:** Required
- **Response:** Array of reports created by the user.

---

## Error Handling

- All endpoints return JSON with `status` and `message`.
- HTTP status codes are used appropriately (e.g., 200, 400, 401, 404, 500).

---

## Notes

- All file uploads (profile picture, report photo) use `multipart/form-data`.
- JWT secret and other sensitive configs are managed via environment variables.
- CORS is enabled for allowed frontend origins.

---

## Missing Handlers or References?

If you add new features or handlers (e.g., password reset, admin endpoints), please provide the handler files so this documentation can be updated accordingly.

---

## Contact

For questions or contributions, please contact the AdaSampah development team.
