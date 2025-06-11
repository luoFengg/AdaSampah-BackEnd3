# AdaSampah Back-End API Documentation

## Overview
AdaSampah is a RESTful API for waste reporting and user management, built with Node.js, Hapi.js, and MongoDB. This documentation covers all available endpoints, request/response formats, authentication, and error handling.

---

## Authentication
- **JWT-based authentication** is used. Obtain a token via `/user/login` and send it as a cookie named `token` for protected endpoints.
- Some endpoints require authentication (see each endpoint's `Auth` column).

---

## User Endpoints

| Method | Endpoint           | Description                | Auth Required | Body / Params |
|--------|--------------------|----------------------------|---------------|---------------|
| POST   | /user/register     | Register a new user        | No            | username, email, password, fullName, role |
| POST   | /user/login        | Login and get JWT token    | No            | username/email, password |
| POST   | /user/logout       | Logout and blacklist token | Yes (cookie)  | -             |
| GET    | /user/{id}         | Get user by ID             | No            | -             |
| PUT    | /user/{id}         | Update user profile        | Yes           | username, email, fullName, profileUrl (file upload allowed) |
| DELETE | /user/{id}         | Delete user by ID          | Yes           | -             |
| GET    | /user/refetch      | Get current user (from JWT)| Yes           | -             |

---

## Report Endpoints

| Method | Endpoint                                 | Description                                 | Auth Required | Body / Params |
|--------|------------------------------------------|---------------------------------------------|---------------|---------------|
| GET    | /                                       | Health check (Hello, World!)                | No            | -             |
| GET    | /reports                                | Get all reports                             | No            | -             |
| GET    | /reports/limit?page=&limit=             | Get paginated reports                       | No            | Query: page, limit |
| GET    | /reports/{reportId}                     | Get report by ID                            | No            | -             |
| POST   | /reports                                | Create a new report (with photo upload)     | Yes           | description, lat, lon, latDetail, lonDetail, regency, province, location, detailLocation, photo (file) |
| PUT    | /reports/{reportId}                     | Edit report description                     | Yes           | description    |
| PATCH  | /reports/{reportId}/status              | Update report status                        | No            | statusDescription |
| DELETE | /reports/{reportId}                     | Delete report by ID                         | Yes           | -             |
| PATCH  | /reports/{reportId}/saved/{userId}      | Toggle save/unsave report for user          | Yes           | -             |
| GET    | /reports/{reportId}/saved               | Get list of user IDs who saved the report   | No            | -             |
| GET    | /reports/user/{userId}                  | Get all reports by user                     | Yes           | -             |

---

## Request & Response Examples

### Register User
**POST /user/register**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "yourpassword",
  "fullName": "John Doe",
  "role": "user"
}
```

### Login User
**POST /user/login**
```json
{
  "username": "johndoe",
  "password": "yourpassword"
}
```
**Response:**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "token": "<jwt-token>",
    "userId": "user-xxxx",
    "username": "johndoe",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "user",
    "profileUrl": "..."
  }
}
```

### Create Report
**POST /reports** (multipart/form-data, requires authentication)
- Fields: description, lat, lon, latDetail, lonDetail, regency, province, location, detailLocation, photo (file)

---

## Error Handling
- All error responses use the following format:
```json
{
  "status": "fail",
  "message": "Error message here"
}
```

---

## Notes
- For endpoints requiring authentication, send the JWT token as a cookie named `token`.
- File uploads (profile photo, report photo) use `multipart/form-data`.
- Pagination for `/reports/limit` uses query params: `page` (default 1), `limit` (default 9).

---

## Contact
For further questions or bug reports, please contact the AdaSampah development team.
